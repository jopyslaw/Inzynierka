import bodyParser from "body-parser";
import config from "./config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { Express, Request, Response } from "express";
import { routes } from "./REST/routes";
import { CronJob } from "cron";
import { activateAdvertismentsIfStartDateIsToday } from "./cronJobs";

const app: Express = express();
app.use(express.static(__dirname + "/public"));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "2048kb" }));

app.use(express.static("public"));

app.use(cors());

const changeActivationOfAdvertismentsCRONJob = new CronJob(
  "* * * * *",
  activateAdvertismentsIfStartDateIsToday,
  null,
  true
);

try {
  mongoose.connect(config.databaseUrl);
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

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(config.port, () => {
  console.info(`Server is running at ${config.port}`);
});
