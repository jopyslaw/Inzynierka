import { Server, Socket } from "socket.io";
import businessContainer from "../business/business.container";
import notificationsDAO from "../DAO/notificationsDAO";
import messageDAO from "../DAO/messageDAO";

const messageSocket = (io: Server) => {
  io.of("/message").on("connection", (socket: Socket) => {
    const messageChangeStream = messageDAO.model.collection.watch();

    messageChangeStream.on("change", async (change: any) => {
      if (change.operationType === "insert") {
        const messageNumberNotReaded = await businessContainer
          .getMessageManager()
          .getNotReadedMessage(socket.handshake.query.userId);

        socket.emit("newMessageCounter", messageNumberNotReaded);
      }
    });
  });

  io.of("/message/data").on("connection", (socket: Socket) => {
    const messageChangeStream = messageDAO.model.collection.watch();

    console.log(
      "data i need",
      socket.handshake.query,
      socket.handshake.query.senderId,
      socket.handshake.query.reciverId
    );

    messageChangeStream.on("change", async (change: any) => {
      if (change.operationType === "insert") {
        const message = await businessContainer
          .getMessageManager()
          .getAllMessages(
            socket.handshake.query.senderId,
            socket.handshake.query.reciverId
          );

        socket.emit("newMessage", message);
      }
    });
  });
};

export default messageSocket;
