import { Response, Request, NextFunction } from "express";
import Quiz from "../models/quizModel";
import CustomErrorHandler from "../utils/CustomErrorHandler";
import Validate from "../utils/Validator";
import ReturnResponse from "../utils/Interface";

export const createQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp: ReturnResponse;
  const { error } = Validate(req.body);
  if (error) {
    return next(error);
  }
  const { name, questions_list, answers } = req.body;

  const doc = await Quiz.create({
    name,
    questions_list,
    answers,
    created_by: req.userId,
  });
  if (!doc) {
    const err = new CustomErrorHandler(404, "Quiz Not found!!");
    return next(err);
  }

  resp = {
    status: "success",
    message: "Quiz successfully created",
    data: {
      quizid: doc._id,
    },
  };
  return res.status(201).json(resp);
};

export const getQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp: ReturnResponse;
  const authorized = await Quiz.findOne({ created_by: req.userId });
  if (!authorized) {
    const err = new CustomErrorHandler(403, "user is not authorized");
    return next(err);
  }

  const doc = await Quiz.findById(req.params.quizid).select("-created_by");
  if (!doc) {
    const err = new CustomErrorHandler(404, "Quiz Not found!!");
    return next(err);
  }
  resp = {
    status: "success",
    message: "Successfully got quiz",
    data: doc,
  };
  res.status(200).json(resp);
};

export const updateQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp: ReturnResponse;
  const authorized = await Quiz.findOne({ created_by: req.userId });
  if (!authorized) {
    const err = new CustomErrorHandler(403, "user is not authorized");
    return next(err);
  }
  if (authorized.is_published) {
    const err = new CustomErrorHandler(
      405,
      "Updation not allowed for published quiz"
    );
    return next(err);
  }
  const { quizid } = req.params;
  const doc = await Quiz.findOneAndUpdate({ _id: quizid }, req.body, {
    new: true,
  });
  if (!doc) {
    const err = new CustomErrorHandler(404, "Quiz Not found!!");
    return next(err);
  }
  resp = {
    status: "success",
    message: "Quiz updated successfully",
    data: doc,
  };
  res.status(200).json(resp);
};

export const deleteQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp: ReturnResponse;
  const { quizid } = req.params;

  const authorized = await Quiz.findOne({ created_by: req.userId });
  if (!authorized) {
    const err = new CustomErrorHandler(403, "user is not authorized");
    return next(err);
  }
  if (authorized.is_published) {
    const err = new CustomErrorHandler(
      405,
      "Deletion not allowed for published quiz"
    );
    return next(err);
  }
  await Quiz.findByIdAndDelete(quizid);
  resp = {
    status: "success",
    message: "Quiz deleted successfully",
    data: {},
  };
  res.status(200).json(resp);
};

export const publishQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp: ReturnResponse;
  const authorized = await Quiz.findOne({ created_by: req.userId });
  if (!authorized) {
    const err = new CustomErrorHandler(403, "user is not authorized");
    return next(err);
  }
  const { quizid } = req.params;
  const doc = await Quiz.findById(quizid);
  if (!doc) {
    const err = new CustomErrorHandler(404, "Quiz Not found!!");
    return next(err);
  }
  doc.is_published = true;
  await doc.save();
  resp = {
    status: "success",
    message: "Quiz published successfully",
    data: {},
  };
  res.status(200).json(resp);
};
