import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Form, Button } from "react-bootstrap";
import AuthService from "../services/auth.service";
import { AuthContext } from "../contexts/authContext";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      navigate("/admin");
    }
  }, []);
  const onChangeUsername = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
  };
  const onChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setLoading(false);
      e.stopPropagation();
    } else {
      AuthService.login(username, password).then(
        (data) => {
          setUser(data); // Set the user
          navigate("/admin");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
    }
    setValidated(true);
  };

  return (
    <Col md={12} className="contenu d-flex justify-content-center">
      <Card className="p-3" style={{ width: "50%" }}>
        <Form noValidate validated={validated} onSubmit={handleLogin}>
          <Form.Group as={Col} controlId="formGridUsername" className="mb-2">
            <Form.Label>Username</Form.Label>

            <Form.Control
              required
              name="username"
              type="text"
              placeholder="Username"
              onChange={onChangeUsername}
              value={username}
            />
            <Form.Control.Feedback type="invalid">
              Veuillez renseigner votre username
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail" className="mb-2">
            <Form.Label>
              Password<span className="required"> *</span>
            </Form.Label>
            <Form.Control
              required
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />
            <Form.Control.Feedback type="invalid">
              Veuillez renseigner votre email
            </Form.Control.Feedback>
          </Form.Group>

          <div className="mt-3 text-center">
            <Button
              type="submit"
              className="rounded-pill mb-3"
              disabled={loading}
            >
              {loading && <span className="spinner-border spinner-border-sm" />}
              Login
            </Button>
          </div>
          {message && (
            <Form.Group>
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </Form.Group>
          )}
        </Form>
      </Card>
    </Col>
  );
}
