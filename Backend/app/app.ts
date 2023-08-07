import bodyParser from "body-parser";
import config from "./config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

const app = express();
app.use(express.static(__dirname + "/public"));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "2048kb" }));

app.use(express.static("public"));

app.use(cors());

mongoose.connect(config.databaseUrl, {}, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info("Connect with database estabilished");
  }
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.error(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(config.port, () => {
  console.info(`Server is running at ${config.port}`);
});
