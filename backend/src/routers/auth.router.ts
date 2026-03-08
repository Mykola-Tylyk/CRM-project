import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { AuthValidator } from "../validators/auth.validator";

const router = Router();

router.get(
    "/activate/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.validateId("id"),
    authController.generateActivateToken,
);

router.post(
    "/activate/:token",
    commonMiddleware.validateBody(AuthValidator.passwordBody),
    authController.activate,
);

router.get(
    "/recovery/:id",
    commonMiddleware.validateId("id"),
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    authController.generateRecoveryToken,
);

router.post(
    "/recovery/:token",
    commonMiddleware.validateBody(AuthValidator.passwordBody),
    authController.recovery,
);

router.post(
    "/sign-in",
    commonMiddleware.validateBody(AuthValidator.login),
    authController.sineIn,
);

router.post(
    "/refresh",
    authMiddleware.checkRefreshToken,
    authController.refresh,
);

router.post("/logout", authMiddleware.checkAccessToken, authController.logout);

router.get("/me", authMiddleware.checkAccessToken, authController.me);

export const authRouter = router;
