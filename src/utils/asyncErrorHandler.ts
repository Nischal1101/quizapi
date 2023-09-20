import { Request, Response, NextFunction } from "express";
const asyncErrorHandler = (handler: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      return next(err);
    }
  };
};

export default asyncErrorHandler;
