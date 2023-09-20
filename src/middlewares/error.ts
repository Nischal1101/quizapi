import { HttpError } from "http-errors";
import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

const error = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //logging error.
  logger.error(err.message);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    errors: [
      {
        type: err.name,
        msg: err.message,
        path: "",
        location: "",
      },
    ],
  });
};

export default error;
