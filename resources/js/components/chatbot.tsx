import { useState } from "react";

export default function ChatBot() {
const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{user:string, bot:string}[]>([]);

 const sendMessage = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ message })
    });const data = await res.json();
    setChat([...chat, { user: message, bot: data.reply }]);
    setMessage("");
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg p-3 flex flex-col">
      <div className="flex-1 overflow-y-auto mb-2 max-h-60">
       {chat.map((c, i) => (
          <div key={i}>
            <b>You:</b> {c.user} <br />
            <b>Bot:</b> {c.bot}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-l px-2 py-1"
          placeholder="Ask something..."
        />
        <button
          onClick={sendMessage}
          className="bg-amber-500 text-white px-4 py-1 rounded-r"
          
        >
          Send
        </button>
      </div>
    </div>
  );
}
