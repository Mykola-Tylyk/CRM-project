import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.validateQuery(UserValidator.query),
    userController.getAll,
);

router.post(
    "/",
    commonMiddleware.validateBody(UserValidator.create),
    userController.create,
);

router.get("/:id", commonMiddleware.validateId("id"), userController.getById);

router.patch(
    "/block/:id",
    commonMiddleware.validateId("id"),
    userController.blockUser,
);

router.patch(
    "/unblock/:id",
    commonMiddleware.validateId("id"),
    userController.unBlockUser,
);

export const userRouter = router;
