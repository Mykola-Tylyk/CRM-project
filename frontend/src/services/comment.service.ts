import { urls } from "../constants/urls";
import { IComment, ICommentCreateDTO } from "../interfaces/comment.interface";
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

export const addComment = async (
    createDTO: ICommentCreateDTO,
): Promise<IComment> => {
    const { data } = await apiService.post<IComment>(
        urls.comments.base,
        createDTO,
    );
    return data;
};
