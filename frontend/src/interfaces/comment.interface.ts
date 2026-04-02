interface IComment {
    _id: string;
    text: string;
    user_name: string;
    user_surname: string;
    createdAt: Date;
}

interface ICommentCreateDTO {
    text: string;
    orderId: string;
    userId: string;
}

export type { IComment, ICommentCreateDTO };
