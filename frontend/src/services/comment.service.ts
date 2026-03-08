import { urls } from "../constants/urls";
import { IComment } from "../interfaces/comment.interface";
import { apiService } from "./api.service";

export const getAllComments = async (): Promise<IComment[]> => {
    const { data } = await apiService.get<IComment[]>(urls.comments.base);
    return data;
};

export const getByIdComments = async (orderId: string): Promise<IComment> => {
    const { data } = await apiService.get<IComment>(
        urls.comments.byId(orderId),
    );
    return data;
};

export const addComment = async ({
    comment,
    orderId: orderId,
}: {
    comment: string;
    orderId: string;
}): Promise<IComment> => {
    const { data } = await apiService.post<IComment>(urls.comments.base, {
        comment: comment,
        orderId: orderId,
    });
    return data;
};
