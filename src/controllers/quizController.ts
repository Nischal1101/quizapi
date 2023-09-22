import { Response, Request, NextFunction } from "express";
import Quiz from "../models/quizModel";

interface ReturnResponse {
  status: "error" | "success";
  message: String;
  data: {};
}

export const createQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp: ReturnResponse;
  const { name, questions_list, answers } = req.body;
  const quiz = await Quiz.create({
    name,
    questions_list,
    answers,
    created_by: req.userId,
  });
  resp = {
    status: "success",
    message: "Quiz successfully created",
    data: quiz,
  };
  return res.status(201).json(resp);
};

export const getQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const updateQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const deleteQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const publishQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
