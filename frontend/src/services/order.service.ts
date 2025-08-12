import axios from "axios";

import { IOrder } from "../interfaces/order.interface";

const axiosInstance = axios.create();

export const getAllOrders = async (): Promise<IOrder[]> => {
    const { data } = await axiosInstance.get("/api/orders");
    return data;
};
