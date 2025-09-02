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
