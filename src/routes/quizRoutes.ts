import express from "express";
import {
  createQuiz,
  deleteQuiz,
  publishQuiz,
  updateQuiz,
  getQuiz,
} from "../controllers/quizController";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import auth from "../middlewares/Authentication";
const router = express.Router();

//create quiz
router.route("/").post(auth, asyncErrorHandler(createQuiz));

//get quiz
router.route("/:quizid").get(auth, asyncErrorHandler(getQuiz));

//update quiz
router.route("/:quizid").put(auth, asyncErrorHandler(updateQuiz));

//delete
router.route("/:quizid").delete(auth, asyncErrorHandler(deleteQuiz));

//publish
router.route("/publish/:quizid").patch(auth, asyncErrorHandler(publishQuiz));

export default router;
