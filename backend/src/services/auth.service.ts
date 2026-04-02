import { config } from "../configs/config";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IAuth } from "../interfaces/auth.interface";
import { ITokenPair } from "../interfaces/token.interface";
import { IUserWithStats } from "../interfaces/user.interface";
import { tokenRepositories } from "../repositories/token.repositories";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
    public async activate(
        tokenActivate: string,
        password: string,
    ): Promise<IUserWithStats> {
        const { _id } = tokenService.verifyToken(
            tokenActivate,
            ActionTokenTypeEnum.ACTIVATE,
        );

        await userService.getById(_id);
        const hashedPassword = await passwordService.hashPassword(password);

        return await userService.activateUser(_id, {
            isActive: true,
            password: hashedPassword,
        });
    }

    public async passwordRecovery(
        tokenRecovery: string,
        password: string,
    ): Promise<IUserWithStats> {
        const { _id } = tokenService.verifyToken(
            tokenRecovery,
            ActionTokenTypeEnum.RECOVERY,
        );

        await userService.getById(_id);
        const hashedPassword = await passwordService.hashPassword(password);

        return await userService.passwordRecovery(_id, hashedPassword);
    }

    public async generateActionToken(
        userId: string,
        type: ActionTokenTypeEnum,
    ): Promise<string> {
        const user = await userService.getById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        if (user.isDeleted) {
            throw new ApiError("User is deleted", StatusCodesEnum.FORBIDDEN);
        }

        let url: string;
        switch (type) {
            case ActionTokenTypeEnum.ACTIVATE: {
                if (user.isActive) {
                    throw new ApiError(
                        "User is active",
                        StatusCodesEnum.BAD_REQUEST,
                    );
                }

                const activateToken = tokenService.generateActionToken(
                    { _id: userId },
                    ActionTokenTypeEnum.ACTIVATE,
                );

                url = `${config.FRONTEND_URL}/activate/${activateToken}`;
                break;
            }

            case ActionTokenTypeEnum.RECOVERY: {
                if (!user.isActive) {
                    throw new ApiError(
                        "User is not active",
                        StatusCodesEnum.BAD_REQUEST,
                    );
                }

                const recoveryToken = tokenService.generateActionToken(
                    { _id: userId },
                    ActionTokenTypeEnum.RECOVERY,
                );

                url = `${config.FRONTEND_URL}/recovery/${recoveryToken}`;
                break;
            }
            default:
                throw new ApiError(
                    "Invalid action token type",
                    StatusCodesEnum.BAD_REQUEST,
                );
        }

        return url;
    }

    public async sineIn({
        email,
        password,
    }: IAuth): Promise<{ user: IUserWithStats; tokens: ITokenPair }> {
        const userData = await userRepository.getByEmail(email);

        if (!userData) {
            throw new ApiError(
                "Email or password not valid",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }

        if (userData.isDeleted) {
            throw new ApiError("User deleted", StatusCodesEnum.FORBIDDEN);
        }

        if (!userData.isActive) {
            throw new ApiError(
                "User is not activated",
                StatusCodesEnum.FORBIDDEN,
            );
        }

        const isValidPassword = await passwordService.comparePassword(
            password,
            userData.password,
        );

        if (!isValidPassword) {
            throw new ApiError(
                "Email or password not valid",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }

        const tokens = await tokenService.generateAndSaveTokens(userData._id);
        const user = await userService.lastLogin(userData._id);

        return { user, tokens };
    }

    public async logout(userId: string) {
        await tokenRepositories.delete(userId);
    }

    public async refresh(_id: string): Promise<{ tokens: ITokenPair }> {
        const tokens = await tokenService.generateAndSaveTokens(_id);
        return { tokens };
    }
}

export const authService = new AuthService();
