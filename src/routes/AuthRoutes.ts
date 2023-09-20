import express from "express";
import { registerUser, loginUser } from "../controllers/authController";
import asyncErrorHandler from "../utils/asyncErrorHandler";
const router = express.Router();
router.route("/register").post(asyncErrorHandler(registerUser));
router.route("/login").post(asyncErrorHandler(loginUser));
export default router;
