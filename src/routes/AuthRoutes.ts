import express from "express";
import { registerUser, loginUser } from "../controllers/authController";
import asyncMiddleware from "../middlewares/asyncMiddleware";
const router = express.Router();
router.route("/register").post(asyncMiddleware(registerUser));
router.route("/login").post(asyncMiddleware(loginUser));
export default router;
