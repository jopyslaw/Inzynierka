import config from "./config";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { CronJob } from "cron";
import { activateAdvertismentsIfStartDateIsToday } from "./CRON/cronJobs";
import { sockets } from "./Sockets/sockets";
import swaggerDocs from "./service/swagger";
import { addAdminAccount } from "./service/createAdminAccount";
import createExpressServer from "./service/server";

const StartFunction = async () => {
  const server = createExpressServer();

  const app = server.app;
  const io = server.io;
  const httpServer = server.httpServer;

  try {
    await mongoose.connect(config.databaseUrl);
    console.log("Mongo connected");
    await addAdminAccount();
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
