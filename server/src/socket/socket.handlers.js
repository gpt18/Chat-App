

export const SocketEvents = {
  CONNECT: "connect",
  WELCOME: "welcome",
  RECEIVE_MESSAGE: "rcv-msg",
  SEND_MESSAGE: "msg",
  DISCONNECT: "disconnect",
  GOODBYE: "goodbye",
  HELLO: "hello",
}

const socketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log('User Connected: ', socket.id);

    socket.broadcast.emit(SocketEvents.HELLO, { message: `New user joined`, sender: 'Admin', id: socket.id });

    socket.on(SocketEvents.SEND_MESSAGE, (data) => {
      console.log('Message: ', data);
      io.to(data.roomId).emit('rcv-msg', { message: data.message, sender: socket.id });
    });

    socket.on('disconnect', () => {
      console.log('User Disconnected: ', socket.id);
      socket.broadcast.emit("goodbye", { message: `User disconnected`, sender: 'Admin', id: socket.id });
    });
  });
};

export default socketHandlers;