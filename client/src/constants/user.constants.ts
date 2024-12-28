export const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

export enum SocketEvents {
    CONNECT = "connect",
    WELCOME = "welcome",
    RECEIVE_MESSAGE = "rcv-msg",
    SEND_MESSAGE = "msg",
    DISCONNECT = "disconnect",
    GOODBYE = "goodbye",
    HELLO = "hello",
}