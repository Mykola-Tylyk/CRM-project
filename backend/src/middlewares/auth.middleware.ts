import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { IRefreshToken } from "../interfaces/token.interface";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";

class AuthMiddleware {
    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const authorization = req.headers.authorization;

            if (!authorization) {
                throw new ApiError(
                    "No token provided",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }

            const accessToken = authorization.split(" ")[1];

            if (!accessToken) {
                throw new ApiError(
                    "No token provided",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }

            const verifyTokenPayload = tokenService.verifyToken(
                accessToken,
                TokenTypeEnum.ACCESS,
            );

            await tokenService.isTokenExists(accessToken, TokenTypeEnum.ACCESS);

            const isDeleted = await userService.isDeleted(
                verifyTokenPayload._id,
            );

            if (isDeleted) {
                throw new ApiError(
                    "User deleted",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }

            const isActive = await userService.isActive(verifyTokenPayload._id);

            if (!isActive) {
                throw new ApiError(
                    "User is not activated",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }

            res.locals.payload = verifyTokenPayload;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { refreshToken } = req.body as any as IRefreshToken;

            if (!refreshToken) {
                throw new ApiError(
                    "No refresh token provided",
                    StatusCodesEnum.FORBIDDEN,
                );
            }

            const verifyTokenPayload = tokenService.verifyToken(
                refreshToken,
                TokenTypeEnum.REFRESH,
            );

            if (!verifyTokenPayload) {
                throw new ApiError(
                    "Invalid refresh token provided",
                    StatusCodesEnum.FORBIDDEN,
                );
            }

            const user = await userService.getById(verifyTokenPayload._id);

            if (user.isDeleted) {
                throw new ApiError("User deleted", StatusCodesEnum.FORBIDDEN);
            }

            if (!user.isActive) {
                throw new ApiError(
                    "User is not activated",
                    StatusCodesEnum.FORBIDDEN,
                );
            }

            await tokenService.isTokenExists(
                refreshToken,
                TokenTypeEnum.REFRESH,
            );

            res.locals.payload = verifyTokenPayload;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
