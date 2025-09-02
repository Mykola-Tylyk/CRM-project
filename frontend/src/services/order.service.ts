import axios from "axios";

import { IOrder } from "../interfaces/order.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";

const axiosInstance = axios.create();

export const getAllOrders = async ({
    pageSize,
    page,
}: {
    pageSize: number;
    page: number;
}): Promise<IPaginatedResponse<IOrder>> => {
    const { data } = await axiosInstance.get(
        "/api/orders" + "?pageSize=" + pageSize + "&page=" + page,
    );
    return data;
};
