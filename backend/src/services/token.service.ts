import jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { IUserIdDTO } from "../interfaces/user.interface";
import { tokenRepositories } from "../repositories/token.repositories";

class TokenService {
    public generateActionToken(
        payload: IUserIdDTO,
        type: ActionTokenTypeEnum,
    ): string {
        let secret: string;
        let expiresIn: any;
        switch (type) {
            case ActionTokenTypeEnum.ACTIVATE:
                secret = config.JWT_ACTIVATE_SECRET;
                expiresIn = config.JWT_ACTIVATE_LIFETIME;
                break;
            case ActionTokenTypeEnum.RECOVERY:
                secret = config.JWT_RECOVERY_SECRET;
                expiresIn = config.JWT_RECOVERY_LIFETIME;
                break;
            default:
                throw new ApiError(
                    "Invalid action token type",
                    StatusCodesEnum.BAD_REQUEST,
                );
        }
        return jwt.sign(payload, secret, { expiresIn });
    }

    public verifyToken(
        token: string,
        type: ActionTokenTypeEnum | TokenTypeEnum,
    ): ITokenPayload {
        try {
            let secret: string;
            switch (type) {
                case ActionTokenTypeEnum.ACTIVATE:
                    secret = config.JWT_ACTIVATE_SECRET;
                    break;
                case ActionTokenTypeEnum.RECOVERY:
                    secret = config.JWT_RECOVERY_SECRET;
                    break;
                case TokenTypeEnum.ACCESS:
                    secret = config.JWT_ACCESS_SECRET;
                    break;
                case TokenTypeEnum.REFRESH:
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                default:
                    throw new ApiError(
                        "Invalid token type",
                        StatusCodesEnum.BAD_REQUEST,
                    );
            }
            return jwt.verify(token, secret) as ITokenPayload;
        } catch {
            throw new ApiError("Invalid token", StatusCodesEnum.UNAUTHORIZED);
        }
    }

    public async generateAndSaveTokens(userId: string): Promise<ITokenPair> {
        const accessToken = jwt.sign(
            { _id: userId },
            config.JWT_ACCESS_SECRET,
            {
                expiresIn: config.JWT_ACCESS_LIFETIME,
            },
        );
        const refreshToken = jwt.sign(
            { _id: userId },
            config.JWT_REFRESH_SECRET,
            {
                expiresIn: config.JWT_REFRESH_LIFETIME,
            },
        );
        const data = await tokenRepositories.upsertByUserId({
            accessToken,
            refreshToken,
            _userId: userId,
        });
        return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        };
    }

    public async isTokenExists(
        token: string,
        type: TokenTypeEnum,
    ): Promise<boolean> {
        const tokenDb = await tokenRepositories.findByParams({ [type]: token });
        if (!tokenDb) {
            throw new ApiError("Invalid token", StatusCodesEnum.FORBIDDEN);
        }

        return !!tokenDb;
    }
}

export const tokenService = new TokenService();
