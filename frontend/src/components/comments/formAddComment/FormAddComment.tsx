import "./FormAddComment.css";

import { joiResolver } from "@hookform/resolvers/joi";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch } from "../../../redux/hooks/useAppDispatch";
import { useAppSelector } from "../../../redux/hooks/useAppSelector";
import { commentSliceActions } from "../../../redux/slices/commentSlice/commentSlice";
import { CommentValidator } from "../../../validators/comment.validator";

type IFormData = {
    comment: string;
};

type IFormProps = {
    selectedOrderId: string | null;
    onSuccess: () => void;
    disabledForm: boolean;
};

const FormAddComment: FC<IFormProps> = ({
    selectedOrderId,
    onSuccess,
    disabledForm,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IFormData>({
        mode: "all",
        resolver: joiResolver(CommentValidator.create),
    });

    const { user } = useAppSelector((state) => state.authSlice);
    const dispatch = useAppDispatch();

    const [showError, setShowError] = useState(false);

    const handler = async (formData: IFormData) => {
        if (!selectedOrderId || !user) return;

        await dispatch(
            commentSliceActions.createComment({
                text: formData.comment,
                orderId: selectedOrderId,
                userId: user._id,
            }),
        );
        reset();
        onSuccess();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handler)}>
                <div className={"form_div__form_add_comment"}>
                    <input
                        type="text"
                        placeholder="Comment"
                        {...register("comment")}
                        className={`input__form_add_comment ${showError && errors.comment ? "input_error__form_add_comment" : ""}`}
                        onFocus={() => setShowError(true)}
                        onBlur={() => setShowError(false)}
                        readOnly={disabledForm}
                        tabIndex={disabledForm ? -1 : 0}
                    />
                    <button
                        disabled={!isValid || disabledForm}
                        className={"button__form_add_comment"}
                    >
                        SUBMIT
                    </button>
                </div>
                {showError && errors.comment && (
                    <div className={"form_div_errors__form_add_comment"}>
                        {errors.comment.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export { FormAddComment };
