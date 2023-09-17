import express from "express";

import { getUser, updateUser } from "../controllers/userController";
import auth from "../middlewares/Authentication";
const router = express();
router.route("/getuser/:userId").get(auth, getUser);
router.route("/updateuser/:userId").put(auth, updateUser);
export default router;
