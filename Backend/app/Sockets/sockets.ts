import { Server, Socket } from "socket.io";
import notificationSocket from "./notificationSocket";
import messageSocket from "./messageSocket";

export const sockets = (server: Server) => {
  notificationSocket(server);
  messageSocket(server);
};
