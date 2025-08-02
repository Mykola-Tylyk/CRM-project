import { StatusCodesEnum } from "../enums/status-codes.enum";
import { orderService } from "../services/order.service";
class OrderController {
    async getAll(req, res, next) {
        try {
            const data = await orderService.getAll();
            res.status(StatusCodesEnum.OK).json(data);
        }
        catch (e) {
            next(e);
        }
    }
}
export const orderController = new OrderController();
