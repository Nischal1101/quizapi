import express, { Request, Response, NextFunction } from "express";
import authRoutes from "./routes/AuthRoutes";
import userRoutes from "./routes/userRoutes";
import quizRoutes from "./routes/quizRoutes";
import examRoutes from "./routes/examRoutes";
import reportRoutes from "./routes/reportRoutes";

import { PORT } from "./config";
import db from "./database/db";
import error from "./middlewares/error";
import logger from "./config/logger";
import CustomErrorHandler from "./utils/CustomErrorHandler";

process.on("uncaughtException", (ex: Error) => {
  console.log("We got an uncaught exception");
  logger.log({
    level: "error",
    message: ex.message,
  });
  process.exit(1);
});
process.on("unhandledRejection", (ex: Error) => {
  console.log("We got an unhandled rejection");
  logger.log({
    level: "error",
    message: ex.message,
  });
  process.exit(1);
});
// throw new Error("Something failed during startup")
const port: number = Number(PORT);
const app = express();

app.use(express.json());
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/quiz", quizRoutes);
app.use("/exam", examRoutes);
app.use("/report", reportRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new CustomErrorHandler(404, `${req.originalUrl} doesn't exist.`);
  next(err);
});

db()
  .then(() => {
    app.listen(port, () => {
      logger.info(`Server is listening at address ${port}`);
    });
  })
  .catch((err) => {
    logger.error(err + "Database connection failed");
  });
app.use(error);
