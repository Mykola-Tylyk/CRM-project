import axios from "axios";

import { IComment } from "../interfaces/comment.interface";

const axiosInstance = axios.create();

export const getAllComments = async (): Promise<IComment[]> => {
    const { data } = await axiosInstance.get<IComment[]>("/api/comments");
    return data;
};

export const getByIdComments = async (orderId: string): Promise<IComment> => {
    const { data } = await axiosInstance.get<IComment>(
        "/api/comments/" + orderId,
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
    const { data } = await axiosInstance.post<IComment>("/api/comments", {
        comment: comment,
        orderId: orderId,
    });
    return data;
};
