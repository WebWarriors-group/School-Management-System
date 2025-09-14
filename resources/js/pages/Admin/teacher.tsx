import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: '👩‍🏫 Teacher Management',
    href: '/dashboard',
  },
];

export default function AdminTeacherDashboard() {
  const [teacherCount, setTeacherCount] = useState<number | null>(null);
  const [requestCount, setRequestCount] = useState(0);
  const [leaveCount, setLeaveCount] = useState<number>(0);
  const [attendanceData, setAttendanceData] = useState([
    { name: 'Present', value: 0 },
    { name: 'Absent', value: 0 },
  ]);
  const [today, setToday] = useState('');

  const [messages, setMessages] = useState<any[]>([]);
  const [showMessages, setShowMessages] = useState(false);

  // Fetch counts and attendance summary
  useEffect(() => {
    fetch('/api/teacher-requests/count')
      .then((res) => res.json())
      .then((data) => setRequestCount(data.count || 0));

    fetch('/api/teacher-attendance-summary')
      .then((res) => res.json())
      .then((summary) => {
        setAttendanceData([
          { name: 'Present', value: summary.present },
          { name: 'Absent', value: summary.absent },
        ]);
        setToday(summary.date);
      });

    fetch('/admin/teacher/count')
      .then((res) => res.json())
      .then((data) => setTeacherCount(data.teacherCount));

    fetch('/api/teacher/today-leave-count')
      .then((res) => res.json())
      .then((data) => setLeaveCount(data.count))
      .catch(() => setLeaveCount(0));
  }, []);

  // Fetch messages when "Show Messages" is clicked
  const handleShowMessages = () => {
    fetch('/api/admin/messages', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setShowMessages(true);
      })
      .catch((err) => console.error(err));
  };

  // Send reply function
  const handleSendReply = (reply: string, teacherNIC: string | null, subject: string | null, form: HTMLFormElement) => {
    fetch('/api/admin/messages/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
      },
      credentials: 'include',
      body: JSON.stringify({
        receiver_id: teacherNIC,
        subject: `Re: ${subject || 'No Subject'}`,
        message: reply,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert('Reply sent!');
        form.reset();
      })
      .catch(() => alert('Failed to send reply'));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <header className="sticky top-15 w-full border-b z-50 p-4 shadow-sm bg-white">
        <div className="max-w-5xl mx-auto px-6 text-blue-600 md:text-lg">
          Teachers' Attendance, Leave Requests & Management Overview
        </div>
      </header>

      <div className="flex flex-col gap-10 px-8 py-10 bg-gray-200 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Attendance Summary */}
          <div className="bg-white border border-blue-100 shadow-md p-6 hover:shadow-lg transition flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-2">📋 Attendance Summary</h3>
            <p className="text-sm text-gray-500 mb-4">
              Date: <span className="font-semibold">{today}</span>
            </p>
            <div className="w-full h-60 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={attendanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                    <Cell fill="#2563EB" />
                    <Cell fill="#DC2626" />
                  </Pie>
                  <Tooltip formatter={(value) => `${value} Teachers`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Link href="/admin/teacher-attendance">
              <button className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Manage Attendance
              </button>
            </Link>
          </div>

          {/* Registered Teachers & Requests */}
          <div className="bg-white border border-slate-200 shadow-md p-6 hover:shadow-lg transition flex flex-col gap-8">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-4">👩‍🏫 Registered Teachers</h3>
              <div className="w-24 h-24 border-4 border-blue-500 text-blue-700 flex items-center justify-center text-4xl font-bold rounded-full">
                {teacherCount}
              </div>
              <Link href="/teacher-info" className="w-full mt-4">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  View Details
                </button>
              </Link>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h3 className="text-xl font-semibold flex justify-between items-center mb-4">
                📥 Teacher Requests
                {requestCount > 0 && (
                  <span className="px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded-full">
                    {requestCount}
                  </span>
                )}
              </h3>

              <div className="flex gap-4">
                <Link href="/teacher_requests" className="flex-1">
                  <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                    Add Requests
                  </button>
                </Link>
                <Link href="teacher-leave-requests" className="flex-1">
                  <button className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
                    Leave Requests
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Management Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Direct Communication */}
          <div className="bg-white border border-gray-300 shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">📧 Direct Communication</h3>
            <p className="text-gray-600 mb-4">Send announcements or personal messages to teachers.</p>

            <button
              onClick={handleShowMessages}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Show Messages
            </button>

            {/* Messages List */}
            {showMessages && (
              <div className="mt-6 max-h-80 overflow-y-auto border-t pt-4">
                <h4 className="text-lg font-semibold mb-2">📨 All Messages</h4>
                {messages.length === 0 ? (
                  <p className="text-gray-500 text-sm">No messages available</p>
                ) : (
                  <ul className="space-y-4">
                    {messages.map((msg, i) => (
                      <li key={i} className="p-3 bg-gray-50 border rounded-md">
                        <p className="font-semibold">{msg.subject}</p>
                        <p className="text-gray-600">{msg.message}</p>
                        <p className="text-xs text-gray-500 mb-2">
                          From: {msg.sender_type} | {new Date(msg.created_at).toLocaleString()}
                        </p>

                        {/* Reply Form */}
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.currentTarget;
                            const formData = new FormData(form);
                            const replyMessage = formData.get('reply') as string;

                            handleSendReply(replyMessage, msg.teacher_NIC || msg.receiver_id, msg.subject, form);
                          }}
                          className="mt-2 flex gap-2"
                        >
                          <input
                            type="text"
                            name="reply"
                            placeholder="Type reply..."
                            className="flex-1 border px-2 py-1 rounded-md text-sm"
                          />
                          <button
                            type="submit"
                            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
                          >
                            Reply
                          </button>
                        </form>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Announcements */}
          <div className="bg-white border border-gray-300 shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">📢 Announcements</h3>
            <p className="text-gray-600 mb-4">Post updates for all teachers.</p>
            <button className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
              Manage Announcements
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
