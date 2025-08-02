import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { orderService } from "../services/order.service";

class OrderController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await orderService.getAll();
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const orderController = new OrderController();
