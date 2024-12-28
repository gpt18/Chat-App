import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { SERVER_URL, SocketEvents } from "../constants/user.constants";

interface ISocketContext {
  socket: Socket | null;
  timeStamp: Date | null;
  socketOn: (event: SocketEvents, callback: (...args: any[]) => void) => void;
  newSocket: Socket;
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = (): ISocketContext => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [timeStamp, setTimeStamp] = useState<Date | null>(null);

  const newSocket = useMemo(() => {
    return io(SERVER_URL);
  }, []);

  useEffect(() => {
    setSocket(newSocket);

    setTimeStamp(new Date());

    newSocket.on(SocketEvents.CONNECT, () => {
      console.log("Socket connected at: ", new Date().toLocaleString());
    });

    return () => {
      newSocket.disconnect();
      console.log("Socket disconnected");
    };
  }, [newSocket]);

  const socketOn = (
    event: SocketEvents,
    callback: (...args: any[]) => void
  ) => {
    if (socket) {
      socket.on(event, callback);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, timeStamp, socketOn, newSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
