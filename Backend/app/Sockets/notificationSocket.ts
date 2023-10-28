import { Server, Socket } from "socket.io";
import businessContainer from "../business/business.container";
import { ChangeStream } from "mongodb";
import notificationsDAO from "../DAO/notificationsDAO";

const notificationSocket = (io: Server) => {
  io.of("/notifications").on("connection", (socket: Socket) => {
    console.log("Socket", socket.id);
    const notificationChangeStream = notificationsDAO.model.collection.watch();

    notificationChangeStream.on("change", (change: any) => {
      if (change.operationType === "insert") {
        console.log("check", change);
        const notificationsNumberNotReaded = businessContainer
          .getNotificationManager()
          .getNotReadedNotifications(socket.handshake.query.userId);
        io.emit("newNotificationCounter", notificationsNumberNotReaded);
      }
    });
  });

  io.of("/notifications/data").on("connection", (socket: Socket) => {
    socket.emit("hello", "world");
    const notificationChangeStream = notificationsDAO.model.collection.watch();

    notificationChangeStream.on("change", async (change: any) => {
      if (change.operationType === "insert") {
        const notifications = businessContainer
          .getNotificationManager()
          .getNotifications(socket.handshake.query.userId);

        io.emit("newNotifications", notifications);
      }
    });
  });
};

export default notificationSocket;
