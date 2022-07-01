import express from "express";
import { loginController } from "../controllers/user.js";
import { userModel } from "../models/user.js";
const userRouter = express.Router();

userRouter.post("/login", loginController);

export default userRouter;
