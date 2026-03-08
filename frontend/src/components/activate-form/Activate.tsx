import "./Activate.css";

import { joiResolver } from "@hookform/resolvers/joi";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { IActionToken } from "../../interfaces/action-token.interface";
import { IActivateRecoveryFormProps } from "../../interfaces/activate-recovery-form-props.interface";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { authSliceActions } from "../../redux/slices/authSlice/authSlice";
import { LoginValidator } from "../../validators/login.validator";

const Activate: FC<IActionToken> = ({ type }) => {
    const [stateError, setStateError] = useState(false);
    const {
        handleSubmit,
        register,
        formState: { errors, isValid, touchedFields },
    } = useForm<IActivateRecoveryFormProps>({
        mode: "all",
        resolver: joiResolver(LoginValidator.validatePassword),
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const customHandler = async (formDataProps: IActivateRecoveryFormProps) => {
        try {
            if (!token) return;

            await dispatch(
                authSliceActions.activateOrRecovery({
                    token,
                    password: formDataProps.password,
                    type,
                }),
            ).unwrap();

            navigate("/login");
        } catch {
            setStateError(true);
        }
    };

    return (
        <div className={"form_activate__activate"}>
            <div className={"modal_window__activate"}>
                {!stateError ? (
                    <form
                        className={"create_activate_form__activate"}
                        onSubmit={handleSubmit(customHandler)}
                    >
                        <label>
                            Password
                            <input
                                type={`password`}
                                {...register("password")}
                                placeholder="Password"
                                className={`input_activate_form__activate ${
                                    touchedFields.password && errors.password
                                        ? "input_error_activate_form__activate"
                                        : ""
                                }`}
                            />
                            {touchedFields.password && errors.password && (
                                <div
                                    className={
                                        "error_password_activate_form__activate"
                                    }
                                >
                                    {errors.password.message}
                                </div>
                            )}
                        </label>
                        <label>
                            Confirm Password
                            <input
                                type={`password`}
                                {...register("confirmPassword")}
                                placeholder="Confirm Password"
                                className={`input_activate_form__activate ${
                                    touchedFields.confirmPassword &&
                                    errors.confirmPassword
                                        ? "input_error_activate_form__activate"
                                        : ""
                                }`}
                            />
                            {touchedFields.confirmPassword &&
                                errors.confirmPassword && (
                                    <div
                                        className={
                                            "error_password_activate_form__activate"
                                        }
                                    >
                                        {errors.confirmPassword.message}
                                    </div>
                                )}
                        </label>
                        <button
                            className={"button_activate_form__activate"}
                            disabled={!isValid}
                        >
                            ACTIVATE
                        </button>
                    </form>
                ) : (
                    <div className={"create_activate_form__activate"}>
                        <p>
                            The link is not valid, please contact the
                            administrator to solve the problem
                        </p>
                        <button
                            className={"button_activate_form__activate"}
                            onClick={() => navigate("/login")}
                        >
                            BACK TO LOGIN
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export { Activate };
