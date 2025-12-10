import "./UsersPage.css";

import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { Pagination } from "../../components/paginations/Pagination";
import { UsersList } from "../../components/users/UsersList";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { ErrorPage } from "../error-page/ErrorPage";

const UsersPage = () => {
    const {
        users: { totalPages },
        hasError,
    } = useAppSelector((state) => state.userSlice);

    if (hasError) {
        return <ErrorPage />;
    }

    return (
        <div className={"grid_users_page"}>
            <header className={"header_fixed_users_page"}>
                <Header />
            </header>
            <div className={"users_scroll_users_page"}>
                <UsersList />
            </div>
            <div className={"pagination_fixed_users_page"}>
                <Pagination totalPages={totalPages} />
            </div>
            <footer className={"footer_fixed_users_page"}>
                <Footer />
            </footer>
        </div>
    );
};

export { UsersPage };
