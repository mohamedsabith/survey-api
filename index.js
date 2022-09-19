/* eslint-disable import/extensions */
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import chalk from "chalk";
import logger from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import dbConnection from "./config/connection.js";
import errorHandler from "./middlewares/errorMiddleware.js";

// Routes
import Routes from "./routes/routes.js";

// Database Connection
dbConnection();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many request from this IP",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(errorHandler);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);

app.use(logger("combined", { stream: accessLogStream }));

app.get("/", (req, res) => res.send("API IS WORKING"));
app.use("/api/v1/", Routes);

// Invalid Route
app.all("*", (req, res) => {
  res.status(404).json({
    status: "false",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

const { PORT } = process.env;

app.listen(PORT, (err) => {
  if (err) console.log(chalk.red(`Server failed to start Error : ${err}`));
  console.log(chalk.blue(`Server started at port : ${PORT}`));
});
