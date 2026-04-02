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

    const [query, setQuery] = useSearchParams({ page: "1" });

    const pageSize = 5;
    const page = Number(query.get("page"));
    const isPageValid = Number.isInteger(page) && page > 0;
    const order = "-createdAt";

    const fetchUsers = () => {
        if (isPageValid) {
            dispatch(userSliceActions.loadUsers({ pageSize, page, order }));
        } else {
            // dispatch(userSliceActions.setError("Invalid page parameter"));
            setQuery({ page: "1" });
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [dispatch, page, trigger]);

    if (!loadState) {
        return <Preloader />;
    }

    return (
        <div className={"div_main_wrapper__users_list"}>
            <div className={"div_wrapper__users_list"}>
                {onCreateClick && (
                    <div className={"div_wrapper_button_and_stats__users_list"}>
                        <button
                            onClick={onCreateClick}
                            className={"button_create__users_list"}
                        >
                            CREATE
                        </button>
                        {users.globalStats && (
                            <div className={"div_stats__users_list"}>
                                <p>Total: {users.globalStats.total}</p>
                                <p>In work: {users.globalStats.inWork}</p>
                                <p>New: {users.globalStats.new}</p>
                                <p>Agree: {users.globalStats.agree}</p>
                                <p>Disagree: {users.globalStats.disagree}</p>
                                <p>Dubbing: {users.globalStats.dubbing}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className={"div_wrapper_2__users_list"}>
                {users.data.length !== 0 ? (
                    users.data.map((user) => (
                        <User key={user._id} user={user} />
                    ))
                ) : (
                    <div className={"div_no_users__users_list"}>No users</div>
                )}
            </div>
        </div>
    );
};

export { UsersList };
