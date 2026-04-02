import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import {
    IStatsGlobal,
    IStatsUser,
    IUser,
    IUserActivateDTO,
    IUserCreateDTO,
    IUserQuery,
    IUserWithStats,
} from "../interfaces/user.interface";
import { orderRepository } from "../repositories/order.repository";
import { tokenRepositories } from "../repositories/token.repositories";
import { userRepository } from "../repositories/user.repository";

class UserService {
    private async getGlobalStats(): Promise<IStatsGlobal> {
        const globalRaw = await orderRepository.getGlobalStats();

        const stats = this.emptyStatsGlobal();

        for (const item of globalRaw) {
            const status = item._id;
            const count = item.count;

            stats.total += count;

            switch (status) {
                case "in work":
                    stats.inWork = count;
                    break;
                case "new":
                case null:
                    stats.new += count;
                    break;
                case "agree":
                    stats.agree = count;
                    break;
                case "disagree":
                    stats.disagree = count;
                    break;
                case "dubbing":
                    stats.dubbing = count;
                    break;
            }
        }

        return stats;
    }

    private async getUsersStats(userIds: string[]) {
        const statsRaw = await orderRepository.getStatsByUsers(userIds);

        type IUserId = string;

        const map: Record<IUserId, IStatsUser> = {};

        for (const item of statsRaw) {
            const userId = item._id.user_id.toString();
            const status = item._id.status;
            const count = item.count;

            if (status === "new" || status === null) {
                continue;
            }

            if (!map[userId]) {
                map[userId] = this.emptyStatsUser();
            }

            map[userId].total += count;

            switch (status) {
                case "in work":
                    map[userId].inWork = count;
                    break;
                case "agree":
                    map[userId].agree = count;
                    break;
                case "disagree":
                    map[userId].disagree = count;
                    break;
                case "dubbing":
                    map[userId].dubbing = count;
                    break;
            }
        }

        return map;
    }

    private toUserWithStats(user: IUser, stats: IStatsUser): IUserWithStats {
        return {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            isActive: user.isActive,
            lastLogin: user.lastLogin,
            role: user.role,
            isDeleted: user.isDeleted,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            stats,
        };
    }

    private emptyStatsGlobal(): IStatsGlobal {
        return {
            total: 0,
            inWork: 0,
            new: 0,
            agree: 0,
            disagree: 0,
            dubbing: 0,
        };
    }

    private emptyStatsUser(): IStatsUser {
        return {
            total: 0,
            inWork: 0,
            agree: 0,
            disagree: 0,
            dubbing: 0,
        };
    }

    public async getAll(
        query: IUserQuery,
    ): Promise<IPaginatedResponse<IUserWithStats>> {
        const [users, totalItems] = await userRepository.getAll(query);

        const userIds = users.map((u) => u._id);

        const statsMap = await this.getUsersStats(userIds);
        const globalStats = await this.getGlobalStats();

        const data = users.map((user) =>
            this.toUserWithStats(
                user,
                statsMap[user._id.toString()] || this.emptyStatsGlobal(),
            ),
        );

        const totalPages = Math.ceil(totalItems / query.pageSize);

        return {
            totalItems,
            totalPages,
            prevPage: query.page > 1,
            nextPage: query.page < totalPages,
            globalStats,
            data,
        };
    }

    public async create(user: IUserCreateDTO): Promise<IUserWithStats> {
        await this.isEmailUnique(user.email);
        const data = await userRepository.create(user);

        if (!data) {
            throw new ApiError("User not created", StatusCodesEnum.BAD_REQUEST);
        }

        const statsMap = await this.getUsersStats([data._id]);
        const stats = statsMap[data._id] || this.emptyStatsUser();

        return this.toUserWithStats(data, stats);
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

    public async getById(userId: string): Promise<IUserWithStats> {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        const statsMap = await this.getUsersStats([user._id]);
        const stats = statsMap[user._id] || this.emptyStatsUser();

        return this.toUserWithStats(user, stats);
    }

    // public updateUserProfile(
    //     userId: string,
    //     updateDTO: IUserUpdateDTO,
    // ): Promise<IUser> {
    //     return userRepository.updateUserProfile(userId, updateDTO);
    // }

    public async lastLogin(userId: string): Promise<IUserWithStats> {
        const user = await userRepository.lastLogin(userId);

        const statsMap = await this.getUsersStats([user._id]);
        const stats = statsMap[user._id] || this.emptyStatsUser();

        return this.toUserWithStats(user, stats);
    }

    public async isActive(userId: string): Promise<boolean> {
        const user = await this.getById(userId);
        return user.isActive;
    }

    public async isDeleted(userId: string): Promise<boolean> {
        const user = await this.getById(userId);
        return user.isDeleted;
    }

    public async activateUser(
        userId: string,
        updateDTO: IUserActivateDTO,
    ): Promise<IUserWithStats> {
        const user = await userRepository.activateUser(userId, updateDTO);

        const statsMap = await this.getUsersStats([user._id]);
        const stats = statsMap[user._id] || this.emptyStatsUser();

        return this.toUserWithStats(user, stats);
    }

    public async passwordRecovery(
        userId: string,
        password: string,
    ): Promise<IUserWithStats> {
        const user = await userRepository.passwordRecovery(userId, password);

        const statsMap = await this.getUsersStats([user._id]);
        const stats = statsMap[user._id] || this.emptyStatsUser();

        return this.toUserWithStats(user, stats);
    }

    public async blockUser(userId: string): Promise<IUserWithStats> {
        const user = await this.getById(userId);

        const statsMap = await this.getUsersStats([user._id]);
        const stats = statsMap[user._id] || this.emptyStatsUser();

        if (user.role === "admin") {
            return user;
        }

        await tokenRepositories.delete(userId);
        const userData = await userRepository.blockUser(userId);

        return this.toUserWithStats(userData, stats);
    }

    public async unBlockUser(userId: string): Promise<IUserWithStats> {
        const user = await this.getById(userId);

        const statsMap = await this.getUsersStats([user._id]);
        const stats = statsMap[user._id] || this.emptyStatsUser();

        if (user.role === "admin") {
            return user;
        }

        const userData = await userRepository.unBlockUser(userId);

        return this.toUserWithStats(userData, stats);
    }
}

export const userService = new UserService();
