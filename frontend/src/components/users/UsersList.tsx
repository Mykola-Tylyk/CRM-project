import { useEffect, useState } from "react";
import { IUser } from "../../interfaces/user.interface";
import { CreateUserModal } from "../createUserModal/CreateUserModal";
import { User } from "./User";
import { getAllUsers } from "../../services/user.service";
import "./UsersList.css";

const UsersList = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [showModal, setShowModal] = useState(false);
    const fetchUsers = () => {
        getAllUsers().then(data => setUsers(data));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserCreated = () => {
        setShowModal(false);
        fetchUsers();
    };

    return (
        <div className={"div_wrapper_users_list"}>
            <button
                onClick={() => setShowModal(true)}
                className={"button_create"}
            >
                CREATE
            </button>
            {
                users ?
                    (
                        [...users]
                            .reverse()
                            .map(user => <User user={user} />)
                    ): (<div>No users</div>)
            }

            {showModal && (
                <CreateUserModal onClose={() => setShowModal(false)} onSuccess={handleUserCreated} />
            )}
        </div>
    );
};

export { UsersList };
