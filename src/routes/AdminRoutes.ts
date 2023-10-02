import express from "express";
import { adminLogin } from "../controllers/authController";
import asyncErrorHandler from "../utils/asyncErrorHandler";
const router = express.Router();

router.route("/login").post(asyncErrorHandler(adminLogin));
export default router;
