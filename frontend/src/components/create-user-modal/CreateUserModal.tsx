import "./CreateUserModal.css";

import { joiResolver } from "@hookform/resolvers/joi";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { userSliceActions } from "../../redux/slices/userSlice/userSlice";
import { UserCreateValidator } from "../../validators/user-create.validator";

type Props = {
    onClose: () => void;
    onSuccess: () => void;
};

type IUserForm = {
    email: string;
    firstname: string;
    surname: string;
};

const CreateUserModal: FC<Props> = ({ onClose, onSuccess }) => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, touchedFields },
        reset,
        setError,
    } = useForm<IUserForm>({
        mode: "all",
        resolver: joiResolver(UserCreateValidator.user),
    });

    const [query, setQuery] = useSearchParams({ page: "1" });

    const onSubmit = async ({ firstname, ...rest }: IUserForm) => {
        try {
            await dispatch(
                userSliceActions.createUser({
                    ...rest,
                    name: firstname,
                }),
            ).unwrap();

            reset();
            onSuccess();
            if (query.get("page") !== "1") {
                setQuery({ page: "1" });
            }
        } catch (err) {
            setError("email", {
                type: "server",
                message: String(err),
            });
        }
    };

    return (
        <div className={"modal_overlay__user_modal"} onClick={onClose}>
            <div
                className="modal_window__user_modal"
                onClick={(e) => e.stopPropagation()}
            >
                <form
                    className="create_user_form__user_modal"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label>
                        Email
                        <input
                            placeholder={"Email"}
                            {...register("email")}
                            className={`input_user_form__user_modal ${
                                touchedFields.email && errors.email
                                    ? "input_error_user_form__user_modal"
                                    : ""
                            }`}
                        />
                        {touchedFields.email && errors.email && (
                            <div className="error_user_form__user_modal">
                                {errors.email.message}
                            </div>
                        )}
                    </label>

                    <label>
                        Name
                        <input
                            placeholder={"Name"}
                            {...register("firstname")}
                            className={`input_user_form__user_modal ${
                                touchedFields.firstname && errors.firstname
                                    ? "input_error_user_form__user_modal"
                                    : ""
                            }`}
                        />
                        {touchedFields.firstname && errors.firstname && (
                            <div className="error_user_form__user_modal">
                                {errors.firstname.message}
                            </div>
                        )}
                    </label>

                    <label>
                        Surname
                        <input
                            placeholder={"Surname"}
                            {...register("surname")}
                            className={`input_user_form__user_modal ${
                                touchedFields.surname && errors.surname
                                    ? "input_error_user_form__user_modal"
                                    : ""
                            }`}
                        />
                        {touchedFields.surname && errors.surname && (
                            <div className="error_user_form__user_modal">
                                {errors.surname.message}
                            </div>
                        )}
                    </label>

                    <div className="div_button_user_form__user_modal">
                        <button
                            type="button"
                            className="button_user_form__user_modal"
                            onClick={onClose}
                        >
                            CANCEL
                        </button>
                        <button
                            type="submit"
                            className="button_user_form__user_modal"
                            disabled={!isValid}
                        >
                            CREATE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { CreateUserModal };
