import "./CommentsList.css";

import { FC, useEffect, useState } from "react";

import { IComment } from "../../../interfaces/comment.interface";
import { getByIdComments } from "../../../services/comment.service";
import { Comment } from "../comment/Comment";
import { FormAddComment } from "../formAddComment/FormAddComment";

type CommentsListProps = {
    selectedOrderId: string | null;
};

const CommentsList: FC<CommentsListProps> = ({ selectedOrderId }) => {
    const [comments, setComments] = useState<IComment | null>(null);
    const reloadComments = () => {
        if (selectedOrderId) {
            getByIdComments(selectedOrderId).then((value) =>
                setComments(value),
            );
        }
    };

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
                        .map((comment, index, array) => (
                            <div key={comments._id}>
                                <Comment
                                    comment={comment}
                                    createdAt={comments.createdAt}
                                />
                                {index < array.length - 1 && <hr />}
                            </div>
                        ))
                ) : (
                    <div>No comments</div>
                )}
            </div>
            <FormAddComment
                selectedOrderId={selectedOrderId}
                onSuccess={reloadComments}
            />
        </div>
    );
};

export { CommentsList };
