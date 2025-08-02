import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
class UserService {
    async getAll() {
        const users = await userRepository.getAll();
        if (!users) {
            throw new ApiError("Users not found", StatusCodesEnum.NOT_FOUND);
        }
        return users;
    }
    async create(user) {
        const data = await userRepository.create(user);
        if (!data) {
            throw new ApiError("User not created", StatusCodesEnum.BAD_REQUEST);
        }
        return data;
    }
    async getById(userId) {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }
        return user;
    }
}
export const userService = new UserService();
