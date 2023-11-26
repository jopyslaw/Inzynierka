import { Server, Socket } from "socket.io";
import businessContainer from "../business/business.container";
import notificationsDAO from "../DAO/notificationsDAO";

const notificationSocket = (io: Server) => {
  io.of("/notifications").on("connection", (socket: Socket) => {
    const notificationChangeStream = notificationsDAO.model.collection.watch();

    notificationChangeStream.on("change", async (change: any) => {
      if (
        change.operationType === "insert" ||
        change.operationType === "update"
      ) {
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
      if (
        change.operationType === "insert" ||
        change.operationType === "update"
      ) {
        const notifications = await businessContainer
          .getNotificationManager()
          .getNotificationsNotReaded(socket.handshake.query.userId);

        socket.emit("newNotifications", notifications);
      }
    });
  });
};

export default notificationSocket;
