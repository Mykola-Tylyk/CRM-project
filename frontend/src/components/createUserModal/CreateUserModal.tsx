import { FC, useState } from "react";
import { saveUser } from "../../services/user.service";

type Props = {
    onClose: () => void;
    onSuccess: () => void;
};

const CreateUserModal: FC<Props> = ({ onClose, onSuccess }) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState<number | "">("");

    const handleSubmit = async () => {
        try {
            await saveUser({
                name,
                surname,
                age: Number(age),
            });

            onSuccess();
        } catch (e) {
            console.error("Error creating user:", e);
        }
    };

    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "10px",
                minWidth: "300px"
            }}>
                <h3>Create New User</h3>
                <div>
                    <input
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={{ margin: "10px 0", width: "100%" }}
                    />
                    <input
                        placeholder="Surname"
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                        style={{ margin: "10px 0", width: "100%" }}
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={e => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                        style={{ margin: "10px 0", width: "100%" }}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export { CreateUserModal };
