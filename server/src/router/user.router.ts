import express from "express";
import usersController from "../controller/user.controller";
import userValidator from "../validator/user.validator";
import { authenticate } from "../middleware/auth.middleware";
import { authValidator } from "../validator/auth.validator";

const userRouter = express.Router();

userRouter.post("/", userValidator.register, usersController.register);

userRouter.post("/login", authValidator.login, usersController.login);
userRouter.post("/logout", authenticate, usersController.logout)


export default userRouter;