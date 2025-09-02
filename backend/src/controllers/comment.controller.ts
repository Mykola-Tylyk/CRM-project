import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import {
    ICommentCreateDTO,
    ICommentQuery,
} from "../interfaces/comment.interface";
import { commentService } from "../services/comment.service";

class CommentController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as any as ICommentQuery;
            const data = await commentService.getAll(query);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getByOrderId(req: Request, res: Response, next: NextFunction) {
        try {
            const { order_id } = req.params;
            const data = await commentService.getByOrderId(order_id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as ICommentCreateDTO;
            const data = await commentService.create(body);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const commentController = new CommentController();
