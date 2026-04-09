import { Router } from "express";

import { commentController } from "../controllers/comment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { CommentValidator } from "../validators/comment.validator";

const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.validateQuery(CommentValidator.query),
    commentController.getAll,
);

router.post(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.validateBody(CommentValidator.create),
    commentController.create,
);

export const commentRouter = router;
