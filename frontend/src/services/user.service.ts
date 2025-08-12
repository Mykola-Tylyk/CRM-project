import axios from "axios";

import { IUser, IUserDTO } from "../interfaces/user.interface";

const axiosInstance = axios.create();

export const getAllUsers = async (): Promise<IUser[]> => {
    const { data } = await axiosInstance.get<IUser[]>("/api/users");
    return data;
};

export const saveUser = async (user: IUserDTO): Promise<IUser> => {
    const { data } = await axiosInstance.post("/api/users", user);
    return data;
};
