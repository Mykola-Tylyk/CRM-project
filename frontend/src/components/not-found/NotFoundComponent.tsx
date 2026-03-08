import "./NotFoundComponent.css";

import { useNavigate } from "react-router-dom";

const NotFoundComponent = () => {
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate("/login");
    };
    return (
        <div className="div_message__not_found">
            <div>
                <h1>404 Not Found</h1>
            </div>
            <div className={"div_wrapper_button_login__not_found"}>
                <button
                    className={"button_login__not_found"}
                    onClick={navigateToLogin}
                >
                    login
                </button>
            </div>
        </div>
    );
};

export { NotFoundComponent };
