import "./Comment.css";

import { FC } from "react";

import { IComment } from "../../../interfaces/comment.interface";

type CommentProps = {
    comment: IComment;
};

const Comment: FC<CommentProps> = (comment) => {
    return (
        <div>
            <div className={"div_for_comment_row__comment"}>
                <div
                    className={"comment_text__comment"}
                    title={comment.comment.text}
                >
                    {comment.comment.text}
                </div>
                <div className={"div_wrapper_info__comments_list"}>
                    <div>{comment.comment.user_name}</div>
                    <div>{comment.comment.user_surname}</div>
                    <div>
                        {new Date(comment.comment.createdAt).toLocaleDateString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                            },
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Comment };
