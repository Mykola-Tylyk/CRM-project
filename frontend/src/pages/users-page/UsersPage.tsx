import "./UsersPage.css";

import { useState } from "react";

import { CreateUserModal } from "../../components/create-user-modal/CreateUserModal";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { Pagination } from "../../components/paginations/Pagination";
import { UsersList } from "../../components/users/UsersList";
import { useAppSelector } from "../../redux/hooks/useAppSelector";

const UsersPage = () => {
    const [showModal, setShowModal] = useState(false);
    const {
        users: { totalPages },
    } = useAppSelector((state) => state.userSlice);

    return (
        <div className={"grid__users_page"}>
            <header className={"header_fixed__users_page"}>
                <Header />
            </header>
            <div className={"users_scroll__users_page"}>
                <UsersList onCreateClick={() => setShowModal(true)} />
            </div>
            <div className={"pagination_fixed__users_page"}>
                <Pagination totalPages={totalPages} />
            </div>
            <footer className={"footer_fixed__users_page"}>
                <Footer />
            </footer>
            {showModal && (
                <CreateUserModal
                    onClose={() => setShowModal(false)}
                    onSuccess={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export { UsersPage };
