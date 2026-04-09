import "./CommentsModal.css";

import { FC, useEffect, useState } from "react";

import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { commentSliceActions } from "../../redux/slices/commentSlice/commentSlice";
import { orderSliceActions } from "../../redux/slices/orderSlice/orderSlice";
import { Comment } from "../comments/comment/Comment";
import { Pagination } from "../paginations/Pagination";
import { Preloader } from "../preloader/Preloader";

type CommentsModalProps = {
    onClose: () => void;
    selectedOrderId: string | null;
};

const CommentsModal: FC<CommentsModalProps> = ({
    onClose,
    selectedOrderId,
}) => {
    const [page, setPage] = useState<number>(1);
    const { orders } = useAppSelector((state) => state.orderSlice);
    const { commentsData, loadState } = useAppSelector(
        (state) => state.commentSlice,
    );
    const dispatch = useAppDispatch();

    const pageSize = 5;

    useEffect(() => {
        if (!selectedOrderId) return;

        const lastCommentInOrdersId = (orderId: string) => {
            const order = orders.data.find((order) => order._id === orderId);
            if (order) return order.last_comments?.[0]._id;
        };

        if (commentsData[selectedOrderId]?.[page]) {
            if (
                commentsData[selectedOrderId]?.[1].data?.[0]._id ===
                lastCommentInOrdersId(selectedOrderId)
            ) {
                return;
            } else {
                dispatch(
                    commentSliceActions.removeByOrderIdComments(
                        selectedOrderId,
                    ),
                );
            }
        }

        const fetchComments = async () => {
            return await dispatch(
                commentSliceActions.loadComments({
                    pageSize,
                    page,
                    orderId: selectedOrderId,
                }),
            ).unwrap();
        };

        fetchComments().then((value) => {
            if (page === 1) {
                if (
                    value.data.at(0)?._id ===
                    lastCommentInOrdersId(selectedOrderId)
                ) {
                    return;
                } else {
                    dispatch(orderSliceActions.setTrigger());
                }
            }
        });
    }, [selectedOrderId, page, dispatch]);

    return (
        <div className={"modal_overlay__comments_modal"} onClick={onClose}>
            <div
                className={"modal_window__comments_modal"}
                onClick={(e) => e.stopPropagation()}
            >
                {!loadState ? (
                    <Preloader mode={"local"} />
                ) : selectedOrderId &&
                  commentsData[selectedOrderId]?.[page]?.data.length !== 0 ? (
                    commentsData[selectedOrderId]?.[page]?.data.map(
                        (comment, index, array) => (
                            <div key={comment._id}>
                                <Comment comment={comment} />
                                {index < array.length - 1 && <hr />}
                            </div>
                        ),
                    )
                ) : (
                    <div>no comments</div>
                )}
                {!loadState ||
                    (selectedOrderId &&
                        commentsData[selectedOrderId]?.[page]?.totalPages >
                            1 && (
                            <Pagination
                                totalPages={
                                    commentsData[selectedOrderId]?.[page]
                                        ?.totalPages
                                }
                                page={page}
                                onPageChange={setPage}
                            />
                        ))}
            </div>
        </div>
    );
};

export { CommentsModal };
