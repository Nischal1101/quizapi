import { NextFunction, Request, Response } from "express";
import Exam from "../models/examModel";
import CustomErrorHandler from "../utils/CustomErrorHandler";

interface ReturnResponse {
  status: "error" | "success";
  message: String;
  data: {};
}

export const getReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp: ReturnResponse;
  const { reportid } = req.params;
  if (!reportid) {
    const reports = await Exam.find({ userId: req.userId });
    resp = {
      status: "success",
      message: "Successfully got all reports",
      data: reports,
    };
    return res.status(200).json(resp);
  }
  const doc = await Exam.findById(reportid);
  if (!doc) {
    const err = new CustomErrorHandler(404, "Report Not found!!");
    return next(err);
  }
  if (req.userId !== doc.userId!.toString()) {
    const err = new CustomErrorHandler(405, "User not Allowed !!");
    return next(err);
  }
  resp = {
    status: "success",
    message: "Successfully got report",
    data: doc,
  };
  return res.status(200).json(resp);
};
