import "./Error.css";

import { useNavigate } from "react-router-dom";

const Error = ({ errorMessage }: { errorMessage: string }) => {
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate("/login");
    };
    return (
        <div className={"div_error_message__error"}>
            <div>
                <h1>Something went wrong</h1>
            </div>
            <div>
                <p>
                    <strong>Error message = {errorMessage}</strong>
                </p>
            </div>
            <div className={"div_wrapper_button_login__error"}>
                <button
                    className={"button_login__error"}
                    onClick={navigateToLogin}
                >
                    login
                </button>
            </div>
        </div>
    );
};

export { Error };
