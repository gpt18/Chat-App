import { Search, Settings, Users } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useSocket } from "../../../providers/SocketContext";
import { useEffect, useState } from "react";
import { SocketEvents } from "../../../constants/user.constants";

const conversations = [
  {
    id: 1,
    name: "Sarah Wilson",
    lastMessage: "Thanks for the update!",
    time: "2m ago",
    unread: 2,
  },
  {
    id: 2,
    name: "Team Sync",
    lastMessage: "Meeting at 3 PM",
    time: "1h ago",
    unread: 0,
  },
  {
    id: 3,
    name: "John Davis",
    lastMessage: "Sounds good to me",
    time: "2h ago",
    unread: 0,
  },
  {
    id: 4,
    name: "Project Alpha",
    lastMessage: "New designs are ready",
    time: "1d ago",
    unread: 1,
  },
];

interface ChatSidebarProps {
  showSidebar: boolean;
}

export default function ChatSidebar({ showSidebar }: ChatSidebarProps) {
  const { socket, socketOn, newSocket } = useSocket();
  const [conversations, setConversations] = useState<
    {
      id: number;
      name: string;
      lastMessage: string;
      time: string;
      unread: number;
    }[]
  >([]);
  useEffect(() => {
    socketOn(SocketEvents.HELLO, (data) => {
      console.log("[Server] welcome: ", data);
      setConversations((prev) => [
        ...prev,
        {
          id: data?.id,
          name: data?.id,
          lastMessage: data?.message,
          time: new Date().toLocaleTimeString(),
          unread: 0,
        },
      ]);
    });
    socketOn(SocketEvents.GOODBYE, (data) => {
      console.log("[Server] goodbye: ", data);
      setConversations((prev) => prev.filter((chat) => chat.id !== data?.id));
    });
  }, [socketOn]);
  return (
    <div
      className={cn(
        "md:w-80 h-screen bg-white border-r border-gray-200 flex flex-col",
        showSidebar ? "flex-1" : "hidden md:block"
      )}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">Messages</h1>
            <p className="text-sm text-gray-500">{newSocket?.id}</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users size={20} className="text-blue-600" />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{chat.name}</h3>
                <span className="text-sm text-gray-500">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 truncate">
                  {chat.lastMessage}
                </p>
                {chat.unread > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
