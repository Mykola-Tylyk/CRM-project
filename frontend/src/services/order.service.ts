import axios from "axios";

import { IOrder } from "../interfaces/order.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";

const axiosInstance = axios.create();

export const getAllOrders = async ({
    pageSize,
    page,
    order,
    name,
    surname,
    email,
    phone,
    age,
    course,
    course_format,
    course_type,
    status,
}: {
    pageSize: number;
    page: number;
    order?: string;
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    age?: number;
    course?: string;
    course_format?: string;
    course_type?: string;
    status?: string;
}): Promise<IPaginatedResponse<IOrder>> => {
    let url = `/api/orders?pageSize=${pageSize}&page=${page}`;

    if (order) {
        url += `&order=${order}`;
    }

    if (name) {
        url += `&searchName=${name}`;
    }

    if (surname) {
        url += `&searchSurname=${surname}`;
    }

    if (email) {
        url += `&searchEmail=${email}`;
    }

    if (phone) {
        url += `&searchPhone=${phone}`;
    }

    if (age) {
        url += `&searchAge=${age}`;
    }

    if (course) {
        url += `&searchCourse=${course}`;
    }

    if (course_format) {
        url += `&searchFormat=${course_format}`;
    }

    if (course_type) {
        url += `&searchType=${course_type}`;
    }

    if (status) {
        url += `&searchStatus=${status}`;
    }
    const { data } = await axiosInstance.get(url);
    return data;
};
