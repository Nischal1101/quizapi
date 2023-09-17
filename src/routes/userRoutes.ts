import express from "express";
import {registerUser} from '../controllers/userController';
const router=express.Router()
router.route("/register").get(registerUser)
export default router;