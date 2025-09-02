import { Pagination } from "../components/paginations/Pagination";
import { UsersList } from "../components/users/UsersList";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { ErrorPage } from "./ErrorPage";

const UsersPage = () => {
    const {
        users: { totalPages },
        hasError,
    } = useAppSelector((state) => state.userSlice);

    if (hasError) {
        return <ErrorPage />;
    }

    return (
        <div>
            <UsersList />
            <Pagination totalPages={totalPages} />
        </div>
    );
};

export { UsersPage };
