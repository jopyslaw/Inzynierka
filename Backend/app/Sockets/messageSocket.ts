import { Server, Socket } from "socket.io";
import businessContainer from "../business/business.container";
import notificationsDAO from "../DAO/notificationsDAO";
import messageDAO from "../DAO/messageDAO";

const notificationSocket = (io: Server) => {
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
    const notificationChangeStream = notificationsDAO.model.collection.watch();

    notificationChangeStream.on("change", async (change: any) => {
      if (change.operationType === "insert") {
        const message = await businessContainer
          .getMessageManager()
          .getMessage(socket.handshake.query.userId);

        socket.emit("newMessage", message);
      }
    });
  });
};

export default notificationSocket;