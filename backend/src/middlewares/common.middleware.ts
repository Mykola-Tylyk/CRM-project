import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";

class CommonMiddleware {
    public validateBody(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e) {
                next(
                    new ApiError(
                        e.details[0].message,
                        StatusCodesEnum.BAD_REQUEST,
                    ),
                );
            }
        };
    }
}

export const commonMiddleware = new CommonMiddleware();
