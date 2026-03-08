import { FC } from "react";

import { Activate } from "../../components/activate-form/Activate";
import { IActionToken } from "../../interfaces/action-token.interface";

const ActivatePage: FC<IActionToken> = ({ type }) => {
    return (
        <div>
            <Activate type={type} />
        </div>
    );
};

export { ActivatePage };
