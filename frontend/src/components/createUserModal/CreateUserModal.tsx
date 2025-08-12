import "./CreateUserModal.css";

import { FC, useState } from "react";

import { saveUser } from "../../services/user.service";

type Props = {
    onClose: () => void;
    onSuccess: () => void;
};

const CreateUserModal: FC<Props> = ({ onClose, onSuccess }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const handleSubmit = async () => {
        try {
            await saveUser({
                email,
                name,
                surname,
            });

            onSuccess();
        } catch (e) {
            console.error("Error creating user:", e);
        }
    };

    return (
        <div className={"modal_window"}>
            <form className={"create_user_form"}>
                <div>
                    <label>
                        Email
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={"input_user_form"}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Name
                        <input
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={"input_user_form"}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Surname
                        <input
                            placeholder="Surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            className={"input_user_form"}
                        />
                    </label>
                </div>
                <div className={"div_button_user_form"}>
                    <button className={"button_user_form"} onClick={onClose}>
                        CANCEL
                    </button>
                    <button
                        className={"button_user_form"}
                        onClick={handleSubmit}
                    >
                        CREATE
                    </button>
                </div>
            </form>
        </div>
    );
};

export { CreateUserModal };
