import axios from "axios";

import { IOrder } from "../interfaces/order.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";

const axiosInstance = axios.create();

export const getAllOrders = async ({
    pageSize,
    page,
    order,
}: {
    pageSize: number;
    page: number;
    order?: string;
}): Promise<IPaginatedResponse<IOrder>> => {
    let url = `/api/orders?pageSize=${pageSize}&page=${page}`;
    if (order) {
        url += `&order=${order}`;
    }
    const { data } = await axiosInstance.get(url);
    return data;
};
