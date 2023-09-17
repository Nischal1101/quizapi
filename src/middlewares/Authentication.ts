import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config";
const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.json({ msg: "NO authentication header found!" });
    }
    const token = header.split(" ")[1];
    let user;
    try {
      user = jwt.verify(token, SECRET!);
    } catch (error) {
      next("Invalid token");
    }
    if (!user) {
      return res.json({ msg: "User not authorized." });
    }
    next();
  } catch (error) {
    next(error + "hi");
  }
};
export default auth;
