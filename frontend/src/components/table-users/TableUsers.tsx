// import { useEffect, useState } from "react";
// import { IUser } from "../../interfaces/user.interface";
// import { TableUserRow } from "./TableUserRow";
// import { getAllUsers } from "../../services/api.service";
//
// const TableUsers = () => {
//
//     const [users, setUsers] = useState<IUser[]>([]);
//     useEffect(() => {
//         getAllUsers().then(data => setUsers(data));
//     }, []);
//
//     return (
//         <div>
//             <table style={{ borderCollapse: "collapse", width: "100%" }}>
//                 <thead style={{ backgroundColor: "#4CAF50", color: "white" }}>
//                 <tr>
//                     <th style={{ padding: "10px", textAlign: "left" }}>_id</th>
//                     <th style={{ padding: "10px", textAlign: "left" }}>name</th>
//                     <th style={{ padding: "10px", textAlign: "left" }}>surname</th>
//                     <th style={{ padding: "10px", textAlign: "left" }}>age</th>
//                     <th style={{ padding: "10px", textAlign: "left" }}>created_at</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {users.map((user, index) => <TableUserRow key={user._id} user={user} index={index}/>)}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
//
// export { TableUsers };

import { useEffect, useState } from "react";
import { IUser } from "../../interfaces/user.interface";
import { CreateUserModal } from "../createUserModal/CreateUserModal";
import { TableUserRow } from "./TableUserRow";
import { getAllUsers } from "../../services/user.service";

const TableUsers = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [showModal, setShowModal] = useState(false);

    const fetchUsers = () => {
        getAllUsers().then(data => setUsers(data));
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserCreated = () => {
        setShowModal(false);
        fetchUsers(); // обновляем таблицу после добавления
    };

    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                style={{ marginBottom: "20px", padding: "10px 20px" }}
            >
                Create User
            </button>

            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead style={{ backgroundColor: "#4CAF50", color: "white" }}>
                <tr>
                    <th style={{ padding: "10px", textAlign: "left" }}>_id</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>name</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>surname</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>age</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>created_at</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <TableUserRow key={user._id} user={user} index={index} />
                ))}
                </tbody>
            </table>

            {showModal && (
                <CreateUserModal onClose={() => setShowModal(false)} onSuccess={handleUserCreated} />
            )}
        </div>
    );
};

export { TableUsers };
