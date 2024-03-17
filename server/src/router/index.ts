import { Router } from "express";
import userRouter from "./user.router";
import dealershipRouter from "./dealer.router";

const router = Router();

router.use("/user", userRouter);

router.use("/dealership", dealershipRouter);

export default router;