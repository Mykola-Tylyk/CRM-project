import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IOrderQuery, IOrderUpdate } from "../interfaces/order.interface";
import { orderService } from "../services/order.service";

class OrderController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as any as IOrderQuery;
            const data = await orderService.getAll(query);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getAllForExport(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const query = req.query as any as IOrderQuery;
            const workbook = await orderService.getAllForExport(query);

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            );

            const date = new Date().toISOString().split("T")[0];

            res.setHeader(
                "Content-Disposition",
                `attachment; filename=orders_${date}.xlsx`,
            );

            await workbook.xlsx.write(res);
            res.status(StatusCodesEnum.OK).end();
        } catch (e) {
            next(e);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as any as IOrderUpdate;
            const data = await orderService.update({ data: body });
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const orderController = new OrderController();
