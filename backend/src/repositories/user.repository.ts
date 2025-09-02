import { IUser, IUserDTO, IUserQuery } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public getAll(query: IUserQuery): Promise<[IUser[], number]> {
        const skip = query.pageSize * (query.page - 1);
        return Promise.all([
            User.find().limit(query.pageSize).skip(skip),
            User.find().countDocuments(),
        ]);
    }

    public create(user: IUserDTO): Promise<IUser> {
        return User.create(user);
    }

    public getById(userId: string) {
        return User.findById(userId);
    }
}

export const userRepository = new UserRepository();
