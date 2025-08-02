import { StatusCodesEnum } from "../enums/status-codes.enum";
import { userService } from "../services/user.service";
class UserController {
    async getAll(req, res, next) {
        try {
            const data = await userService.getAll();
            res.status(StatusCodesEnum.OK).json(data);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const user = req.body;
            const data = await userService.create(user);
            res.status(StatusCodesEnum.CREATED).json(data);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const userId = req.params.id;
            const data = await userService.getById(userId);
            res.status(StatusCodesEnum.OK).json(data);
        }
        catch (e) {
            next(e);
        }
    }
}
export const userController = new UserController();
