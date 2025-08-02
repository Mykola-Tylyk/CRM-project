import { Router } from "express";
import { orderRouter } from "./order.router";
import { userRouter } from "./user.router";
const router = Router();
router.use("/users", userRouter);
router.use("/orders", orderRouter);
export const apiRouter = router;
