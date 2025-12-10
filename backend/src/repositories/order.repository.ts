import { FilterQuery } from "mongoose";

import { IOrder, IOrderQuery } from "../interfaces/order.interface";
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

        return Promise.all([
            Order.find(filterObject)
                .limit(query.pageSize)
                .skip(skip)
                .sort(query.order),
            Order.find(filterObject).countDocuments(),
        ]);
    }

    public getById(id: string): Promise<IOrder> {
        return Order.findById(id);
    }
}

export const orderRepository = new OrderRepository();
