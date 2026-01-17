import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import {
    IUser,
    IUserActivateDTO,
    IUserCreateDTO,
    IUserQuery,
} from "../interfaces/user.interface";
import { tokenRepositories } from "../repositories/token.repositories";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public async getAll(query: IUserQuery): Promise<IPaginatedResponse<IUser>> {
        const [data, totalItems] = await userRepository.getAll(query);

        if (!data || data.length === 0) {
            throw new ApiError("Users not found", StatusCodesEnum.NOT_FOUND);
        }

        const totalPages = Math.ceil(totalItems / query.pageSize);

        return {
            totalItems,
            totalPages,
            prevPage: query.page > 1,
            nextPage: query.page < totalPages,
            data,
        };
    }

    public async create(user: IUserCreateDTO): Promise<IUser> {
        await this.isEmailUnique(user.email);
        const data = await userRepository.create(user);

        if (!data) {
            throw new ApiError("User not created", StatusCodesEnum.BAD_REQUEST);
        }

        return data;
    }

    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);

        if (user) {
            throw new ApiError(
                "User is already exists",
                StatusCodesEnum.BAD_REQUEST,
            );
        }
    }

    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return user;
    }

    // public updateUserProfile(
    //     userId: string,
    //     updateDTO: IUserUpdateDTO,
    // ): Promise<IUser> {
    //     return userRepository.updateUserProfile(userId, updateDTO);
    // }

    public lastLogin(userId: string): Promise<IUser> {
        return userRepository.lastLogin(userId);
    }

    public async isActive(userId: string): Promise<boolean> {
        const user = await this.getById(userId);
        return user.isActive;
    }

    public async isDeleted(userId: string): Promise<boolean> {
        const user = await this.getById(userId);
        return user.isDeleted;
    }

    public activateUser(
        userId: string,
        updateDTO: IUserActivateDTO,
    ): Promise<IUser> {
        return userRepository.activateUser(userId, updateDTO);
    }

    public passwordRecovery(userId: string, password: string): Promise<IUser> {
        return userRepository.passwordRecovery(userId, password);
    }

    public async blockUser(userId: string): Promise<IUser> {
        await tokenRepositories.delete(userId);
        return await userRepository.blockUser(userId);
    }

    public unBlockUser(userId: string): Promise<IUser> {
        return userRepository.unBlockUser(userId);
    }
}

export const userService = new UserService();
