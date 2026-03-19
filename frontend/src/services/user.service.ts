import { urls } from "../constants/urls";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { IUser, IUserDTO } from "../interfaces/user.interface";
import { apiService } from "./api.service";

export const getAllUsers = async ({
    pageSize,
    page,
    order,
}: {
    pageSize: number;
    page: number;
    order?: string;
}): Promise<IPaginatedResponse<IUser>> => {
    let url = urls.users.base + "?pageSize=" + pageSize + "&page=" + page;

    if (order) {
        url += `&order=${order}`;
    }

    const { data } = await apiService.get(url);
    return data;
};

export const saveUser = async (user: IUserDTO): Promise<IUser> => {
    const { data } = await apiService.post(urls.users.base, user);
    return data;
};

export const blockUser = async (userId: string): Promise<IUser> => {
    const { data } = await apiService.patch(urls.users.block(userId));
    return data;
};

export const unBlockUser = async (userId: string): Promise<IUser> => {
    const { data } = await apiService.patch(urls.users.unblock(userId));
    return data;
};
