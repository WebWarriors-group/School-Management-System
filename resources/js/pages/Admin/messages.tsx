import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

type Message = {
  sender_id: string;
  sender_type: string;
  receiver_id: string;
  receiver_type: string;
  subject?: string;
  message: string;
  created_at: string;
};

type Teacher = {
  name: string;
  teacher_NIC: string;
};

export default function AdminMessaging() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('/admin/messages').then(res => res.json()).then(data => setMessages(data));
    fetch('/admin/teachers').then(res => res.json()).then(data => setTeachers(data));
  }, []);

  const sendMessage = (e: React.FormEvent) => {
  e.preventDefault();
  if (!selectedTeacher || !text) return;

  router.post('/admin/messages/send', {
    receiver_id: selectedTeacher,  // teacher NIC entered
    subject,
    message: text
  }, {
    onSuccess: () => {
      setText('');
      setSubject('');
      setSelectedTeacher('');
      fetch('/admin/messages').then(res => res.json()).then(data => setMessages(data));
    }
  });
};


  return (
    <div className="bg-white p-4 shadow-md rounded">
      <div className="h-64 overflow-y-auto border p-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender_type === 'admin' ? 'text-right' : 'text-left'}`}>
            <strong>{msg.sender_type === 'admin' ? 'You' : msg.sender_id}</strong>: {msg.message}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="space-y-2">
  <input
    type="text"
    placeholder="Enter Teacher NIC"
    value={selectedTeacher}
    onChange={e => setSelectedTeacher(e.target.value)}
    className="w-full border rounded p-2"
    required
  />

  <input
    placeholder="Subject"
    value={subject}
    onChange={e => setSubject(e.target.value)}
    className="w-full border rounded p-2"
  />

  <textarea
    placeholder="Message"
    value={text}
    onChange={e => setText(e.target.value)}
    className="w-full border rounded p-2"
    required
  />

  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
    Send
  </button>
</form>

    </div>
  );
}
