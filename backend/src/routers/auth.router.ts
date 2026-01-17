import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { AuthValidator } from "../validators/auth.validator";

const router = Router();

router.get(
    "/activate/:id",
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
    authController.generateRecoveryToken,
);

router.post(
    "/recovery/:token",
    commonMiddleware.validateBody(AuthValidator.passwordBody),
    authController.recovery,
);

router.post(
    "/sine-in",
    commonMiddleware.validateBody(AuthValidator.login),
    authController.sineIn,
);

router.post(
    "/refresh",
    commonMiddleware.validateBody(AuthValidator.checkRefreshToken),
    authMiddleware.checkRefreshToken,
    authController.refresh,
);

router.post("/logout", authMiddleware.checkAccessToken, authController.logout);

export const authRouter = router;
