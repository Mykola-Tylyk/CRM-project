import "./FormAddComment.css";

import { joiResolver } from "@hookform/resolvers/joi";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { addComment } from "../../../services/comment.service";
import { CommentValidator } from "../../../validators/comment.validator";

type IFormData = {
    comment: string;
};

type IFormProps = {
    selectedOrderId: string | null;
    onSuccess: () => void;
};

const FormAddComment: FC<IFormProps> = ({ selectedOrderId, onSuccess }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IFormData>({
        mode: "all",
        resolver: joiResolver(CommentValidator.create),
    });

    const [showError, setShowError] = useState(false);

    const handler = async (formData: IFormData) => {
        if (!selectedOrderId) return;

        await addComment({
            comment: formData.comment,
            orderId: selectedOrderId,
        });
        reset();
        onSuccess();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handler)}>
                <div className={"form_div_comments_list"}>
                    <input
                        type="text"
                        placeholder="Comment"
                        {...register("comment")}
                        className={`input_comments_list ${showError && errors.comment ? "input_error_comments_list" : ""}`}
                        onFocus={() => setShowError(true)}
                        onBlur={() => setShowError(false)}
                    />
                    <button
                        disabled={!isValid}
                        className={"button_comments_list"}
                    >
                        SUBMIT
                    </button>
                </div>
                {showError && errors.comment && (
                    <div className={"form_div_errors_comments_list"}>
                        {errors.comment.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export { FormAddComment };
