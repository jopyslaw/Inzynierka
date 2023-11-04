import { Server, Socket } from "socket.io";
import businessContainer from "../business/business.container";
import notificationsDAO from "../DAO/notificationsDAO";

const notificationSocket = (io: Server) => {
  io.of("/notifications").on("connection", (socket: Socket) => {
    const notificationChangeStream = notificationsDAO.model.collection.watch();

    notificationChangeStream.on("change", async (change: any) => {
      if (change.operationType === "insert") {
        const notificationsNumberNotReaded = await businessContainer
          .getNotificationManager()
          .getNotReadedNotifications(socket.handshake.query.userId);

        socket.emit("newNotificationCounter", notificationsNumberNotReaded);
      }
    });
  });

  io.of("/notifications/data").on("connection", (socket: Socket) => {
    const notificationChangeStream = notificationsDAO.model.collection.watch();

    notificationChangeStream.on("change", async (change: any) => {
      if (change.operationType === "insert") {
        const notifications = await businessContainer
          .getNotificationManager()
          .getNotifications(socket.handshake.query.userId);

        socket.emit("newNotifications", notifications);
      }
    });
  });
};

export default notificationSocket;