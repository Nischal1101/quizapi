import express from "express";
import { getReport } from "../controllers/reportController";
import auth from "../middlewares/Authentication";
import asyncErrorHandler from "../utils/asyncErrorHandler";

const router = express.Router();
router.route("/:reportid?").get(auth, asyncErrorHandler(getReport));

export default router;
