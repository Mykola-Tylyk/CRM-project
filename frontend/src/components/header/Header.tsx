import "./Header.css";

const Header = () => {
    return (
        <div className={"header_div"}>
            <div className={"header_logo"}>
                <h3>Logo</h3>
            </div>
            <div className={"header_buttons_div"}>
                <p>admin</p>
                <button className={"header_button"}>
                    <img src="/img/Admin.png" alt="Admin" />
                </button>
                <button className={"header_button"}>
                    <img src="/img/LogOut.png" alt="LogOut" />
                </button>
            </div>
        </div>
    );
};

export { Header };
