import { User } from "../models/user.model";
class UserRepository {
    getAll() {
        return User.find();
    }
    create(user) {
        return User.create(user);
    }
    getById(userId) {
        return User.findById(userId);
    }
}
export const userRepository = new UserRepository();
