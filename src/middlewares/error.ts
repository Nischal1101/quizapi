// import { HttpError } from "http-errors";
import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import { NODE_PROD } from "../config";
import CustomErrorHandler from "../utils/CustomErrorHandler";

const node_prod: boolean = NODE_PROD === "true";
console.log(node_prod);

const error = (
  err: CustomErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //logging error.
  logger.error(err.message);

  const statusCode: number = err.statusCode || 500;
  if (statusCode < 500) {
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
  } else {
    res.status(statusCode).json({
      errors: [
        {
          type: err.name,
          msg: node_prod ? "Internal Server error" : err.message,
          path: "",
          location: "",
        },
      ],
    });
  }
};

export default error;
