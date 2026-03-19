import "./UsersList.css";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { userSliceActions } from "../../redux/slices/userSlice/userSlice";
import { Preloader } from "../preloader/Preloader";
import { User } from "./User";

type Props = {
    onCreateClick?: () => void;
};

const UsersList = ({ onCreateClick }: Props) => {
    const { users, loadState, trigger } = useAppSelector(
        (state) => state.userSlice,
    );
    const dispatch = useAppDispatch();

    const [query] = useSearchParams({ page: "1" });

    const pageSize = 5;
    const page = Number(query.get("page"));
    const isPageValid = Number.isInteger(page) && page > 0;
    const order = "-createdAt";

    const fetchUsers = () => {
        if (isPageValid) {
            dispatch(userSliceActions.loadUsers({ pageSize, page, order }));
        } else {
            dispatch(userSliceActions.setError("Invalid page parameter"));
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [dispatch, page, trigger]);

    if (!loadState) {
        return <Preloader />;
    }

    return (
        <div className={"div_wrapper__users_list"}>
            {onCreateClick && (
                <button
                    onClick={onCreateClick}
                    className={"button_create__users_list"}
                >
                    CREATE
                </button>
            )}
            {users.data.length !== 0 ? (
                users.data.map((user) => <User key={user._id} user={user} />)
            ) : (
                <div className={"div_no_users__users_list"}>No users</div>
            )}
        </div>
    );
};

export { UsersList };
