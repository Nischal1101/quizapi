import express from "express";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { attemptExam, submitExam } from "../controllers/examController";
import auth from "../middlewares/Authentication";

const router = express.Router();

router.route("/:examid").get(auth, asyncErrorHandler(attemptExam));
router.route("/submit").post(auth, asyncErrorHandler(submitExam));

export default router;
