import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { routes } from "../REST/routes";

const createExpressServer = () => {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:4200"],
    },
  });
  app.use(express.static(__dirname + "/public"));

  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ limit: "2048kb" }));

  app.use(express.static("public"));

  app.use(cors());

  routes(app);

  return { app, httpServer, io };
};

export default createExpressServer;
