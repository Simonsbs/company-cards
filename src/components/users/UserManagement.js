import React, { useState, useEffect, useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { TrashFill, PencilFill } from "react-bootstrap-icons";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteUser, getUsers } from "../../services/api";
import UserModal from "./UserModal";
import { ThemeContext } from "../../contexts/ThemeContext";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { token } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUsers = async () => {
    try {
      const usersList = await getUsers(token);
      setUsers(usersList);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  const handleDelete = async (email) => {
    try {
      await deleteUser(token, email);
      loadUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="container">
      <div style={{ marginBottom: "20px" }}>
        <Button size="lg" onClick={() => setShowModal(true)}>
          <PencilFill /> Add User
        </Button>
      </div>

      <Table
        striped
        bordered
        hover
        className={(theme === "dark" ? "table-dark" : "table-light") + ""}
      >
        <thead style={{ fontWeight: "bold" }}>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.Email}>
              <td>{user.Email}</td>
              <td>{user.Name}</td>
              <td>{user.Role}</td>
              <td width={112}>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(user.email)}
                  style={{ marginRight: "10px" }}
                >
                  <TrashFill />
                </Button>
                <Button variant="info" onClick={() => handleUpdate(user)}>
                  <PencilFill />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <UserModal
        show={showModal}
        onHide={() => setShowModal(false)}
        user={selectedUser}
        reloadUsers={loadUsers}
      />
    </div>
  );
};

export default UserManagement;
