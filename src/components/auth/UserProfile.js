import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Alert, Spinner, Card } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { getUser, updateUser } from "../../services/api";

const UserProfile = () => {
  const { user, token, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(token, user.Email);
        setName(data.Name);
      } catch (e) {
        setError("Error fetching user details.");
      } finally {
        setLoading(false);
      }
    };

    if (user && user.Email) {
      fetchUser();
    }
  }, [user, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const updatedUser = await updateUser(
        token,
        user.Email,
        password,
        name,
        user.Role,
        user.Favorites
      );
      if (updatedUser && updatedUser.data) {
        setUser(updatedUser);
        setUpdateSuccess(true);
      } else {
        setError("Error updating user details.");
      }
    } catch (e) {
      setError("Error updating user details.");
    }
  };

  if (loading || !user) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-4">User Profile</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          {updateSuccess && (
            <Alert variant="success">Profile updated successfully!</Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" readOnly value={user.Email} />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Change Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password if you want to change"
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Verify New Password</Form.Label>
              <Form.Control
                type="password"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                placeholder="Re-enter new password"
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="primary" type="submit">
                Update Profile
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfile;
