import "./CommentsList.css";

import { FC, useEffect, useState } from "react";

import { IComment } from "../../interfaces/comment.interface";
import { getByIdComments } from "../../services/comment.service";
import { Comment } from "./Comment";

type CommentsListProps = {
    selectedOrderId: string | null;
};

const CommentsList: FC<CommentsListProps> = ({ selectedOrderId }) => {
    const [comments, setComments] = useState<IComment | null>(null);
    useEffect(() => {
        if (selectedOrderId) {
            getByIdComments(selectedOrderId).then((value) =>
                setComments(value),
            );
        }
    }, [selectedOrderId]);

    return (
        <div>
            <div className={"div_with_comments"}>
                {comments ? (
                    [...comments.comments]
                        .slice(-3)
                        .reverse()
                        .map((comment, index) => (
                            <Comment
                                key={index}
                                comment={comment}
                                createdAt={comments.createdAt}
                            />
                        ))
                ) : (
                    <div>No comments</div>
                )}
            </div>
            <form className={"form_comments_list"}>
                <input
                    type="text"
                    placeholder="Comment"
                    className={"input_comments_list"}
                />
                <button className={"button_comments_list"}>SUBMIT</button>
            </form>
        </div>
    );
};

export { CommentsList };
