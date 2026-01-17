import axios from "axios";

import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { IUser, IUserDTO } from "../interfaces/user.interface";

const axiosInstance = axios.create();

export const getAllUsers = async ({
    pageSize,
    page,
}: {
    pageSize: number;
    page: number;
}): Promise<IPaginatedResponse<IUser>> => {
    const { data } = await axiosInstance.get(
        "/api/users" + "?pageSize=" + pageSize + "&page=" + page,
    );
    return data;
};

export const saveUser = async (user: IUserDTO): Promise<IUser> => {
    const { data } = await axiosInstance.post("/api/users", user);
    return data;
};

export const blockUser = async (userId: string): Promise<IUser> => {
    const { data } = await axiosInstance.patch("/api/users/block/" + userId);
    return data;
};

export const unBlockUser = async (userId: string): Promise<IUser> => {
    const { data } = await axiosInstance.patch("/api/users/unblock/" + userId);
    return data;
};
