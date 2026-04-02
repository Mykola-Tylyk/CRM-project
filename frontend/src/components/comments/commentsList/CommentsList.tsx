import "./CommentsList.css";

import { FC, useMemo } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../../../redux/hooks/useAppSelector";
import { orderSliceActions } from "../../../redux/slices/orderSlice/orderSlice";
import { Comment } from "../comment/Comment";
import { FormAddComment } from "../formAddComment/FormAddComment";

type CommentsListProps = {
    selectedOrderId: string | null;
    disabledForm: boolean;
};

const CommentsList: FC<CommentsListProps> = ({
    selectedOrderId,
    disabledForm,
}) => {
    const { orders } = useAppSelector((state) => state.orderSlice);
    const dispatch = useDispatch();
    // const [comments, setComments] = useState<IComment | null>(null);

    const reloadComments = () => {
        dispatch(orderSliceActions.setTrigger());
    };
    const selectedOrder = useMemo(() => {
        return orders.data.find((o) => o._id === selectedOrderId);
    }, [orders.data, selectedOrderId]);

    const comments = selectedOrder?.last_comments || [];

    return (
        <div className={"div_wrapper__comments_list"}>
            <div>
                <div className={"div_with_comments__comments_list"}>
                    {comments.length ? (
                        comments.map((comment, index, array) => (
                            <div key={comment._id}>
                                <Comment comment={comment} />
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
                    disabledForm={disabledForm}
                />
            </div>
            <div className={"div_wrapper_button__comments_list"}>
                <button
                    disabled={disabledForm}
                    className={"button__comments_list"}
                >
                    EDIT
                </button>
            </div>
        </div>
    );
};

export { CommentsList };
