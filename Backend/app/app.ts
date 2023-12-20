import bodyParser from "body-parser";
import config from "./config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { Express, Request, Response } from "express";
import { routes } from "./REST/routes";
import { CronJob } from "cron";
import { activateAdvertismentsIfStartDateIsToday } from "./CRON/cronJobs";
import { Server } from "socket.io";
import { createServer } from "http";
import { sockets } from "./Sockets/sockets";
import swaggerDocs from "./service/swagger";

const StartFunction = async () => {
  const app: Express = express();
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

  try {
    await mongoose.connect(config.databaseUrl);
    console.log("Mongo connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.error(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  });

  routes(app);
  sockets(io);

  const changeActivationOfAdvertismentsCRONJob = new CronJob(
    "30 00 * * *",
    activateAdvertismentsIfStartDateIsToday,
    null,
    true
  );

  swaggerDocs(app, config.port as number);

  app.get("/*", (req: Request, res: Response) => {
    res.sendFile(__dirname + "/public/index.html");
  });

  httpServer.listen(config.port, () => {
    console.info(`Server is running at ${config.port}`);
  });
};

StartFunction();
