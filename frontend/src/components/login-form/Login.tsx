import "./Login.css";

import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { IFormLoginProps } from "../../interfaces/login-form-props.interface";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { authSliceActions } from "../../redux/slices/authSlice/authSlice";
import { LoginValidator } from "../../validators/login.validator";

const Login = () => {
    const {
        handleSubmit,
        register,
        setError,
        formState: { errors, isValid, touchedFields },
    } = useForm<IFormLoginProps>({
        mode: "all",
        resolver: joiResolver(LoginValidator.login),
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const customHandler = async (formDataProps: IFormLoginProps) => {
        try {
            await dispatch(authSliceActions.login(formDataProps)).unwrap();

            navigate("/orders");
        } catch (e) {
            setError("root", {
                type: "server",
                message: String(e) || "Server Error",
            });
        }
    };

    return (
        <div className={"form_activate__login"}>
            <div className={"modal_window__login"}>
                <form
                    className={"create_activate_form__login"}
                    onSubmit={handleSubmit(customHandler)}
                >
                    <label>
                        Email
                        <input
                            type={`text`}
                            {...register("email")}
                            placeholder="Email"
                            className={`input_activate_form__login ${
                                touchedFields.email && errors.email
                                    ? "input_error_activate_form__login"
                                    : ""
                            }`}
                        />
                        {touchedFields.email && errors.email && (
                            <div
                                className={
                                    "error_password_activate_form__login"
                                }
                            >
                                {errors.email.message}
                            </div>
                        )}
                    </label>
                    <label>
                        Password
                        <input
                            type={`password`}
                            {...register("password")}
                            placeholder="Password"
                            className={`input_activate_form__login ${
                                touchedFields.password && errors.password
                                    ? "input_error_activate_form__login"
                                    : ""
                            }`}
                        />
                        {touchedFields.password && errors.password && (
                            <div
                                className={
                                    "error_password_activate_form__login"
                                }
                            >
                                {errors.password.message}
                            </div>
                        )}
                    </label>
                    {errors.root && (
                        <div className={"errors_activate_form__login"}>
                            {errors.root.message}
                        </div>
                    )}
                    <button
                        className={"button_activate_form__login"}
                        disabled={!isValid}
                    >
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    );
};

export { Login };
