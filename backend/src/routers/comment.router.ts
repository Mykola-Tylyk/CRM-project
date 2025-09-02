import { Router } from "express";

import { commentController } from "../controllers/comment.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { CommentValidator } from "../validators/comment.validator";

const router = Router();

router.get(
    "/",
    commonMiddleware.validateQuery(CommentValidator.query),
    commentController.getAll,
);

router.get(
    "/:order_id",
    commonMiddleware.validateId("order_id"),
    commentController.getByOrderId,
);

router.post(
    "/",
    commonMiddleware.validateBody(CommentValidator.create),
    commentController.create,
);

export const commentRouter = router;
