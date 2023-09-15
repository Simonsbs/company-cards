import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const usersList = await getUsers(token);
      setUsers(usersList);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
    setLoading(false);
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

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container>
      <div style={{ marginBottom: "20px" }}>
        <Button
          size="lg"
          onClick={() => {
            setSelectedUser(null);
            setShowModal(true);
          }}
        >
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
                  onClick={() => handleDelete(user.Email)}
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
    </Container>
  );
};

export default UserManagement;
