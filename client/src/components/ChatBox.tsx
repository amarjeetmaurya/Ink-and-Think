import { useState, type KeyboardEvent } from "react";
import socket from "../socket/socket.js";
import { useEffect } from "react";

interface ChatMessage {
  text: string;
  sender: string;
  time: string; // ISO string
}

const ChatBox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    console.log("first");
    if (!input.trim()) return;
    socket.emit("send-message", {
      text: input,
      sender: socket.id,
      time: new Date().toISOString(),
    });
    setInput("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    socket.on("receive-message", (message: ChatMessage) => {
      console.log(message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);
  return (
    <div className="w-full flex items-center justify-center">
      <div className="border border-gray-400 rounded-md w-full max-w-sm md:max-w-lg h-150 m-2">
        <div className="text-center border-b border-gray-400 p-2">ChatBox</div>
        <div>
          <div className="flex-1 overflow-y-auto p-2 h-130">
            {messages.map((msg, index) => (
              <div key={index} className="bg-gray-800 rounded p-2 my-2">
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex border-t border-gray-400">
            <input
              className="flex-1 p-2 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              className="bg-blue-500 text-white px-4"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
