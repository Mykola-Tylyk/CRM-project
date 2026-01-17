import { NextFunction, Request, Response } from "express";

import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IAuth } from "../interfaces/auth.interface";
import { IUserPasswordDTO } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
    public async generateActivateToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const userId = req.params.id;
            const data = await authService.generateActionToken(
                userId,
                ActionTokenTypeEnum.ACTIVATE,
            );
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenActivate = req.params.token;
            const { password } = req.body as any as IUserPasswordDTO;
            const data = await authService.activate(tokenActivate, password);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async generateRecoveryToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const userId = req.params.id;
            const data = await authService.generateActionToken(
                userId,
                ActionTokenTypeEnum.RECOVERY,
            );
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async recovery(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenRecovery = req.params.token;
            const { password } = req.body as any as IUserPasswordDTO;
            const data = await authService.passwordRecovery(
                tokenRecovery,
                password,
            );
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async sineIn(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body as any as IAuth;
            const data = await authService.sineIn({ email, password });
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id } = res.locals.payload;
            const data = await authService.logout(_id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id } = res.locals.payload;
            const data = await authService.refresh(_id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
