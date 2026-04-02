import { FilterQuery, Types } from "mongoose";

import {
    IOrder,
    IOrderQuery,
    IOrderUpdate,
} from "../interfaces/order.interface";
import { Order } from "../models/order.model";

class OrderRepository {
    public getAll(query: IOrderQuery): Promise<[IOrder[], number]> {
        const skip = query.pageSize * (query.page - 1);

        const filterObject: FilterQuery<IOrder> = {};

        if (query.searchName) {
            filterObject.name = { $regex: query.searchName, $options: "i" };
        }

        if (query.searchSurname) {
            filterObject.surname = {
                $regex: query.searchSurname,
                $options: "i",
            };
        }

        if (query.searchEmail) {
            filterObject.email = {
                $regex: query.searchEmail,
                $options: "i",
            };
        }

        if (query.searchPhone) {
            filterObject.phone = {
                $regex: query.searchPhone,
                $options: "i",
            };
        }

        if (query.searchAge) {
            filterObject.age = Number(query.searchAge);
        }

        if (query.searchCourse) {
            filterObject.course = {
                $regex: query.searchCourse,
                $options: "i",
            };
        }

        if (query.searchFormat) {
            filterObject.course_format = {
                $regex: query.searchFormat,
                $options: "i",
            };
        }

        if (query.searchType) {
            filterObject.course_type = {
                $regex: query.searchType,
                $options: "i",
            };
        }

        if (query.searchStatus) {
            filterObject.status = {
                $regex: query.searchStatus,
                $options: "i",
            };
        }

        if (query.searchGroup) {
            filterObject.group = {
                $regex: query.searchGroup,
                $options: "i",
            };
        }

        if (query.searchMy) {
            filterObject.user_id = new Types.ObjectId(query.searchMy);
        }

        if (query.searchStartDate || query.searchEndDate) {
            filterObject.created_at = {
                ...(query.searchStartDate && {
                    $gte: new Date(query.searchStartDate),
                }),
                ...(query.searchEndDate && {
                    $lte: (() => {
                        const end = new Date(query.searchEndDate);
                        end.setHours(23, 59, 59, 999);
                        return end;
                    })(),
                }),
            };
        }

        return Promise.all([
            Order.find(filterObject)
                .limit(query.pageSize)
                .skip(skip)
                .sort(query.order),
            Order.find(filterObject).countDocuments(),
        ]);
    }

    public getStatsByUsers(
        userIds: string[],
    ): Promise<
        { _id: { user_id: string; status: string | null }; count: number }[]
    > {
        return Order.aggregate([
            {
                $match: {
                    user_id: {
                        $in: userIds.map((id) => new Types.ObjectId(id)),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        user_id: "$user_id",
                        status: "$status",
                    },
                    count: { $sum: 1 },
                },
            },
        ]);
    }

    public getGlobalStats(): Promise<{ _id: string | null; count: number }[]> {
        return Order.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);
    }

    public getById(id: string): Promise<IOrder> {
        return Order.findById(id);
    }

    public update(orderId: string, data: IOrderUpdate): Promise<IOrder> {
        delete data._id;
        return Order.findByIdAndUpdate(orderId, { $set: data }, { new: true });
    }
}

export const orderRepository = new OrderRepository();
