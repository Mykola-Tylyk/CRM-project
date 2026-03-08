import { Router } from "express";

import { orderController } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { OrderValidator } from "../validators/order.validator";

const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.validateQuery(OrderValidator.query),
    orderController.getAll,
);

export const orderRouter = router;
