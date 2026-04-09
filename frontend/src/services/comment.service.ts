import { urls } from "../constants/urls";
import { IComment, ICommentCreateDTO } from "../interfaces/comment.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { apiService } from "./api.service";

export const getAllCommentsByOrderId = async ({
    pageSize,
    page,
    orderId,
}: {
    pageSize: number;
    page: number;
    orderId: string;
}): Promise<IPaginatedResponse<IComment>> => {
    let url =
        urls.comments.base +
        "?pageSize=" +
        pageSize +
        "&page=" +
        page +
        "&orderId=" +
        orderId;
    const { data } = await apiService.get<IPaginatedResponse<IComment>>(url);
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
