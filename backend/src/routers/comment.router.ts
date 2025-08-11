import { Router } from "express";

import { commentController } from "../controllers/comment.controller";

const router = Router();

router.get("/", commentController.getAll);

router.get("/:order_id", commentController.getByOrderId);

router.post("/", commentController.create);

export const commentRouter = router;
