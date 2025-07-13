import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Socket connected");
    });

    socket.on("message", (msg: { sender: string; text: string }) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = { sender: "You", text: newMessage };
    setMessages((prev) => [...prev, msg]);
    socket.emit("message", msg); // 🔄 serverga jo‘natamiz
    setNewMessage("");
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            <b>{m.sender}:</b> {m.text}
          </div>
        ))}
      </div>
      <div className="p-4 flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="input input-bordered flex-1"
          placeholder="Yozing..."
        />
        <button onClick={handleSendMessage} className="btn btn-primary">
          Yuborish
        </button>
      </div>
    </div>
  );
}
