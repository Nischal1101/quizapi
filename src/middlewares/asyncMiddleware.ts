import { Request, Response, NextFunction } from "express";
const asyncMiddleware = (handler: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (err) {
      return next(err);
    }
  };
};

export default asyncMiddleware;
