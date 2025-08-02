import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IUser, IUserDTO } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public async getAll(): Promise<IUser[]> {
        const users = await userRepository.getAll();

        if (!users) {
            throw new ApiError("Users not found", StatusCodesEnum.NOT_FOUND);
        }

        return users;
    }

    public async create(user: IUserDTO): Promise<IUser> {
        const data = await userRepository.create(user);

        if (!data) {
            throw new ApiError("User not created", StatusCodesEnum.BAD_REQUEST);
        }

        return data;
    }

    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return user;
    }
}

export const userService = new UserService();
