import "./Preloader.css";

const Preloader = () => {
    return (
        <div className="loader-wrapper__preloader">
            <h2 className="text__preloader">Loading</h2>
            <div className="dots__preloader">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export { Preloader };
