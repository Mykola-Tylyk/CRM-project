import { Router } from "express";

import { commentRouter } from "./comment.router";
import { orderRouter } from "./order.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/comments", commentRouter);

export const apiRouter = router;
