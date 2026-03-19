import ExcelJS from "exceljs";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import {
    IOrder,
    IOrderQuery,
    IOrderUpdate,
} from "../interfaces/order.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { Order } from "../models/order.model";
import { orderRepository } from "../repositories/order.repository";
import { userService } from "./user.service";

class OrderService {
    public async getAll(
        query: IOrderQuery,
    ): Promise<IPaginatedResponse<IOrder>> {
        const [data, totalItems] = await orderRepository.getAll(query);

        const groups = await Order.distinct("group", { group: { $ne: null } });

        const totalPages = Math.ceil(totalItems / query.pageSize);

        return {
            totalItems,
            totalPages,
            prevPage: query.page > 1,
            nextPage: query.page < totalPages,
            data,
            groups,
        };
    }

    public async getAllForExport(
        query: IOrderQuery,
    ): Promise<ExcelJS.Workbook> {
        const [data] = await orderRepository.getAll(query);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Orders");

        worksheet.columns = [
            { header: "_id", key: "_id", width: 33 },
            { header: "name", key: "name", width: 20 },
            { header: "surname", key: "surname", width: 20 },
            { header: "email", key: "email", width: 20 },
            { header: "phone", key: "phone", width: 20 },
            { header: "age", key: "age", width: 5 },
            { header: "course", key: "course", width: 8 },
            { header: "course_format", key: "course_format", width: 17 },
            { header: "course_type", key: "course_type", width: 16 },
            { header: "status", key: "status", width: 14 },
            { header: "sum", key: "sum", width: 14 },
            { header: "already_paid", key: "already_paid", width: 15 },
            { header: "group", key: "group", width: 16 },
            { header: "created_at", key: "created_at", width: 16 },
            { header: "manager", key: "user_name", width: 20 },
        ];

        data.forEach((order) => {
            worksheet.addRow(order);
        });

        const headerRow = worksheet.getRow(1);

        headerRow.height = 24;

        headerRow.eachCell((cell) => {
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF2E7D32" },
            };

            cell.font = {
                color: { argb: "FFFFFFFF" },
                bold: true,
                size: 14,
            };

            cell.alignment = {
                horizontal: "center",
                vertical: "middle",
            };
        });

        worksheet.eachRow((row, rowNumber) => {
            row.eachCell({ includeEmpty: true }, (cell) => {
                cell.value = cell.value ?? "";

                if (rowNumber > 1) {
                    cell.font = {
                        size: 14,
                    };
                }

                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };
            });

            if (rowNumber > 1 && rowNumber % 2 === 0) {
                row.eachCell((cell) => {
                    cell.fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "FFF5F5F5" },
                    };
                });
            }
        });

        worksheet.views = [{ state: "frozen", ySplit: 1 }];

        return workbook;
    }

    public async update(data: IOrderUpdate): Promise<IOrder> {
        const orderId = data._id;

        if (data.user_id) {
            const { name } = await userService.getById(data.user_id);
            data.user_name = name;
        }

        const order = await orderRepository.update(orderId, data);

        if (!order) {
            throw new ApiError("Order not found", StatusCodesEnum.NOT_FOUND);
        }

        return order;
    }
}

export const orderService = new OrderService();
