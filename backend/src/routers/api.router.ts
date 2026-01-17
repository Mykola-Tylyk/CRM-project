import { Router } from "express";

import { authRouter } from "./auth.router";
import { commentRouter } from "./comment.router";
import { orderRouter } from "./order.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/comments", commentRouter);
router.use("/auth", authRouter);

export const apiRouter = router;
