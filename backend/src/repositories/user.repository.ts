import {
    IUser,
    IUserActivateDTO,
    IUserCreateDTO,
    IUserQuery,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public getAll(query: IUserQuery): Promise<[IUser[], number]> {
        const skip = query.pageSize * (query.page - 1);
        return Promise.all([
            User.find().limit(query.pageSize).skip(skip).sort(query.order),
            User.find().countDocuments(),
        ]);
    }

    public create(user: IUserCreateDTO): Promise<IUser> {
        return User.create(user);
    }

    public getById(userId: string): Promise<IUser> {
        return User.findById(userId);
    }

    public getByEmail(email: string): Promise<IUser> {
        return User.findOne({ email });
    }

    // public updateUserProfile(
    //     userId: string,
    //     updateDTO: IUserUpdateDTO,
    // ): Promise<IUser> {
    //     return User.findByIdAndUpdate(userId, updateDTO, { new: true });
    // }

    public lastLogin(userId: string): Promise<IUser> {
        return User.findByIdAndUpdate(
            userId,
            { lastLogin: new Date() },
            { new: true },
        );
    }

    public activateUser(
        userId: string,
        updateDTO: IUserActivateDTO,
    ): Promise<IUser> {
        return User.findByIdAndUpdate(userId, updateDTO, { new: true });
    }

    public passwordRecovery(userId: string, password: string): Promise<IUser> {
        return User.findByIdAndUpdate(
            userId,
            { password: password },
            { new: true },
        );
    }

    public blockUser(userId: string): Promise<IUser> {
        return User.findByIdAndUpdate(
            userId,
            { isActive: false },
            { new: true },
        );
    }
    public unBlockUser(userId: string): Promise<IUser> {
        return User.findByIdAndUpdate(
            userId,
            { isActive: true },
            { new: true },
        );
    }
}

export const userRepository = new UserRepository();
