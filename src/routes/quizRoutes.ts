import express from "express";
const router = express.Router();

//create quiz
router.route("/").post();

//get quiz
router.route("/:quizid").get();

//update quiz
router.route("/").put();

//delete
router.route("/:quizid").delete();

//publish
router.route("/:quizid").patch();

export default router;
