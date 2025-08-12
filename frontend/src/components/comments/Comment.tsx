import "./Comment.css";

import { FC } from "react";

type CommentProps = {
    comment: string;
    createdAt: Date;
};

const Comment: FC<CommentProps> = ({ comment, createdAt }) => {
    return (
        <div>
            <div className={"div_for_comment_row"}>
                <div>{comment}</div>
                <div>
                    {new Date(createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                    })}
                </div>
            </div>
            <hr />
        </div>
    );
};

export { Comment };
