import express from "express";
import * as userController from '../controllers/user';
const router=express.Router()
router.route("/register").get(userController.registerUser)
export default router;