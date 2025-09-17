import "./UsersList.css";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { userSliceActions } from "../../redux/slices/userSlice/userSlice";
import { CreateUserModal } from "../createUserModal/CreateUserModal";
import { Preloader } from "../preloader/Preloader";
import { User } from "./User";

const UsersList = () => {
    const { users, loadState } = useAppSelector((state) => state.userSlice);
    const dispatch = useAppDispatch();

    const [showModal, setShowModal] = useState(false);

    const [query] = useSearchParams({ page: "1" });

    const pageSize = 25;
    const page = Number(query.get("page"));
    const isPageValid = Number.isInteger(page) && page > 0;

    const fetchUsers = () => {
        if (isPageValid) {
            dispatch(userSliceActions.loadUsers({ pageSize, page }));
        } else {
            dispatch(userSliceActions.setError("Invalid page parameter"));
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [dispatch, page]);

    const handleUserCreated = () => {
        setShowModal(false);
        fetchUsers();
    };

    if (!loadState) {
        return <Preloader />;
    }

    return (
        <div className={"div_wrapper_users_list"}>
            <button
                onClick={() => setShowModal(true)}
                className={"button_create"}
            >
                CREATE
            </button>
            {users.data.length !== 0 ? (
                users.data.map((user) => <User key={user._id} user={user} />)
            ) : (
                <div>No users</div>
            )}

            {showModal && (
                <CreateUserModal
                    onClose={() => setShowModal(false)}
                    onSuccess={handleUserCreated}
                />
            )}
        </div>
    );
};

export { UsersList };
