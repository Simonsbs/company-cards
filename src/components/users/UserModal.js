import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { registerUser, updateUser } from "../../services/api";
import { ThemeContext } from "../../contexts/ThemeContext";

const UserModal = ({ show, onHide, user, reloadUsers }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");

  const { token } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const textColorClass = theme === "dark" ? "text-light" : "text-dark";
  const bgClass = theme === "dark" ? "bg-dark" : "bg-light";

  useEffect(() => {
    setEmail(user?.Email || "");
    setName(user?.Name || "");
    setPassword("");
    if (user) {
      if (["Admin", "Guest"].includes(user?.Role)) {
        setRole(user?.Role || "Guest");
        setCustomRole("");
      } else {
        setRole("Other");
        setCustomRole(user?.Role || "");
      }
    } else {
      setRole("Guest");
    }
  }, [user]);

  const handleSubmit = async () => {
    const finalRole = role !== "Other" ? role : customRole;
    try {
      if (user) {
        console.warn(name, email, password, finalRole);
        await updateUser(token, email, password, name, finalRole);
      } else {
        await registerUser(email, password, name, finalRole);
      }
      reloadUsers();
      onHide();
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} dialogClassName={bgClass}>
      <Modal.Header closeButton className={bgClass}>
        <Modal.Title className={textColorClass}>
          {user ? "Update User" : "Add User"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${textColorClass} ${bgClass}`}>
        <Form className={`${textColorClass} ${bgClass}`}>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              readOnly={!!user}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="role" className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Admin">Admin</option>
              <option value="Guest">Guest</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
          {role === "Other" && (
            <Form.Group controlId="customRole" className="mb-3">
              <Form.Label>Custom Role</Form.Label>
              <Form.Control
                type="text"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                placeholder="Enter custom role"
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer className={bgClass}>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
