import { useState } from "react";
import ChatArea from "./components/ChatArea";
import ChatSidebar from "./components/ChatSidebar";

export function ChatRoom() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <div className="flex bg-gray-50">
      <ChatSidebar showSidebar={showSidebar} />
      <ChatArea setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
    </div>
  );
}
