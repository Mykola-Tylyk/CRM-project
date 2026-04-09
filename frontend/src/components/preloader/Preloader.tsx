import "./Preloader.css";

import { FC } from "react";

type PreloaderProps = {
    mode: "global" | "local";
};

const Preloader: FC<PreloaderProps> = ({ mode }) => {
    return (
        <div className={`loader-wrapper-${mode}__preloader`}>
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
