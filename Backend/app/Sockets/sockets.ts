import { Server, Socket } from "socket.io";
import notificationSocket from "./notificationSocket";

export const sockets = (server: Server) => {
  notificationSocket(server);
};
