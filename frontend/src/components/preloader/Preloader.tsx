import "./Preloader.css";

const Preloader = () => {
    return (
        <div className="loader-wrapper">
            <h2 className="text">Loading</h2>
            <div className="dots">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export { Preloader };
