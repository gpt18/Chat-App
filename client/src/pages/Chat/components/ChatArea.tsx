import { useState } from "react";
import { Send, Paperclip, Smile, ArrowLeft } from "lucide-react";
import { cn } from "../../../lib/utils";

const messages = [
  { id: 1, text: "Hey there! How are you?", sender: "them", time: "10:00 AM" },
  {
    id: 2,
    text: "I'm doing great, thanks! How about you?",
    sender: "me",
    time: "10:02 AM",
  },
  {
    id: 3,
    text: "Pretty good! Just working on the new project.",
    sender: "them",
    time: "10:03 AM",
  },
  {
    id: 4,
    text: "That sounds interesting! Need any help?",
    sender: "me",
    time: "10:05 AM",
  },
];

interface ChatAreaProps {
  setShowSidebar: (showSidebar: boolean) => void;
  showSidebar: boolean;
}

export default function ChatArea({
  setShowSidebar,
  showSidebar,
}: ChatAreaProps) {
  const [newMessage, setNewMessage] = useState("");

  return (
    <div
      className={cn(
        "flex-1 flex flex-col h-screen",
        showSidebar ? "hidden md:block md:flex-1" : "md:flex-1 flex"
      )}
    >
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center">
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setShowSidebar(true)}
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="font-semibold text-blue-600">SW</span>
          </div>
          <div className="ml-4">
            <h2 className="font-semibold">Sarah Wilson</h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p>{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === "me" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Paperclip size={20} className="text-gray-600" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Smile size={20} className="text-gray-600" />
          </button>
          <button className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full">
            <Send size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
