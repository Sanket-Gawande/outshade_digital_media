import express from "express";
import { loginController ,  signupController , forgotPass ,updateUser, verifyToken, updatePass} from "../controllers/user.js";
import { userModel } from "../models/user.js";
const userRouter = express.Router();

userRouter.post("/login", loginController);
userRouter.post("/signup", signupController);
userRouter.post("/forgotpass", forgotPass);
userRouter.post("/update",updateUser );
userRouter.post("/forgot/verify", verifyToken);
userRouter.post("/password/update", updatePass);

export default userRouter;
