import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "./components/ui/button";
import { ChatRoom } from "./pages/Chat/ChatRoom";
import { SocketProvider } from "./providers/SocketContext";

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

function App1() {
  const socket = useMemo(() => {
    return io(SERVER_URL);
  }, []);

  const [socketId, setSocketId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log("Sending message: ", message);
    socket.emit("msg", { message, roomId });
    setMessage("");
  };

  const handleInputChange = (e) => {
    if (e.target.name === "room") setRoomId(e.target.value);
    if (e.target.name === "message") setMessage(e.target.value);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("[App] connect: Connected to server");
      socket.id && setSocketId(socket.id);
    });

    socket.on("welcome", (data) => {
      console.log("[Server] welcome: ", data);
    });

    socket.on("rcv-msg", (data) => {
      console.log("[Server] rcv-msg: ", data);
      setMessages((prev) => [...prev, data?.message]);
      if (data?.sender) setRoomId(data?.sender);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <>
      <ChatRoom />
      <main className="hidden flex-col items-center justify-center min-h-screen space-y-20">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Private Chat Room
        </h1>
        <p className="text-lg text-center">
          Your socket ID is: <code>{socketId}</code>
        </p>
        <form onSubmit={handleSendMessage}>
          <div className="flex flex-col space-y-4">
            <input
              name="room"
              type="text"
              placeholder="Room ID"
              value={roomId}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <input
              name="message"
              type="text"
              placeholder="Your Message"
              value={message}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <Button type="submit">Send</Button>
          </div>
        </form>
        <div>
          <h2 className="font-bold">Messages</h2>
          <ul className="space-y-2">
            {messages.map((msg, idx) => (
              <li key={idx} className="rounded-md bg-blue-500 text-white p-2">
                {msg}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <>
      <SocketProvider>
        <ChatRoom />
      </SocketProvider>
    </>
  );
}

export default App;
