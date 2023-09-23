import { NextFunction, Request, Response } from "express";
import CustomErrorHandler from "../utils/CustomErrorHandler";

import Quiz from "../models/quizModel";
import Exam from "../models/examModel";

interface ReturnResponse {
  status: "error" | "success";
  message: String;
  data: {};
}

export const attemptExam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp: ReturnResponse;
  const { examid } = req.params;
  const doc = await Quiz.findById(examid, { answers: 0 });
  if (!doc) {
    const err = new CustomErrorHandler(404, "NOT Found!!");
    return next(err);
  }
  if (!doc.is_published) {
    const err = new CustomErrorHandler(
      405,
      "Not allowed to attempt unpublished quiz!!"
    );
    return next(err);
  }
  resp = {
    status: "success",
    message: "Successfully got questions",
    data: doc,
  };
  return res.status(201).json(resp);
};
export const submitExam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp: ReturnResponse;
  const { quizid, attempted_question } = req.body;

  const doc = await Quiz.findById(quizid, { answers: 1, is_published: 1 });
  if (!doc) {
    const err = new CustomErrorHandler(404, "NOT Found!!");
    return next(err);
  }
  if (!doc.is_published) {
    const err = new CustomErrorHandler(
      405,
      "Not allowed to submit unpublished quiz!!"
    );
    return next(err);
  }

  let score = 0;
  const answers = doc.answers;
  const all_questions = Object.keys(answers);
  const total = all_questions.length;
  const userId = req.userId;

  for (let i = 0; i < total; i++) {
    let question_number = all_questions[i];
    if (answers[question_number] == attempted_question[question_number]) {
      score++;
    }
  }

  const report = await Exam.create({ total, score, quizid, userId });
  resp = {
    status: "success",
    message: "Successfully got answers",
    data: { total, score, reportId: report._id },
  };
  return res.status(201).json(resp);
};
