import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.validateQuery(UserValidator.query),
    userController.getAll,
);

router.post(
    "/",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.validateBody(UserValidator.create),
    userController.create,
);

router.get(
    "/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.validateId("id"),
    userController.getById,
);

router.patch(
    "/block/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.validateId("id"),
    userController.blockUser,
);

router.patch(
    "/unblock/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.validateId("id"),
    userController.unBlockUser,
);

export const userRouter = router;
