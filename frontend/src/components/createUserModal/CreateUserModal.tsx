import "./CreateUserModal.css";

import { joiResolver } from "@hookform/resolvers/joi";
import { AxiosError } from "axios";
import { FC } from "react";
import { useForm } from "react-hook-form";

import { saveUser } from "../../services/user.service";
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

    const onSubmit = async ({ firstname, ...rest }: IUserForm) => {
        try {
            await saveUser({
                ...rest,
                name: firstname,
            });

            reset();
            onSuccess();
        } catch (err) {
            if (err instanceof AxiosError && err.response?.status === 400) {
                setError("email", {
                    type: "server",
                    message:
                        err.response.data?.message ??
                        "User with this email already exists",
                });
                return;
            }

            throw err;
        }
    };

    return (
        <div className={"modal_overlay"} onClick={onClose}>
            <div className="modal_window" onClick={(e) => e.stopPropagation()}>
                <form
                    className="create_user_form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label>
                        Email
                        <input
                            placeholder={"Email"}
                            {...register("email")}
                            className={`input_user_form ${
                                touchedFields.email && errors.email
                                    ? "input_error_user_form"
                                    : ""
                            }`}
                        />
                        {touchedFields.email && errors.email && (
                            <div className="error_user_form">
                                {errors.email.message}
                            </div>
                        )}
                    </label>

                    <label>
                        Name
                        <input
                            placeholder={"Name"}
                            {...register("firstname")}
                            className={`input_user_form ${
                                touchedFields.firstname && errors.firstname
                                    ? "input_error_user_form"
                                    : ""
                            }`}
                        />
                        {touchedFields.firstname && errors.firstname && (
                            <div className="error_user_form">
                                {errors.firstname.message}
                            </div>
                        )}
                    </label>

                    <label>
                        Surname
                        <input
                            placeholder={"Surname"}
                            {...register("surname")}
                            className={`input_user_form ${
                                touchedFields.surname && errors.surname
                                    ? "input_error_user_form"
                                    : ""
                            }`}
                        />
                        {touchedFields.surname && errors.surname && (
                            <div className="error_user_form">
                                {errors.surname.message}
                            </div>
                        )}
                    </label>

                    <div className="div_button_user_form">
                        <button
                            type="button"
                            className="button_user_form"
                            onClick={onClose}
                        >
                            CANCEL
                        </button>
                        <button
                            type="submit"
                            className="button_user_form"
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
