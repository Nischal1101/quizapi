import express from "express";

import { getUser, updateUser } from "../controllers/userController";

const router = express();
router.route("/getuser").get(getUser);
router.route("/updateuser").put(updateUser);
export default router;
