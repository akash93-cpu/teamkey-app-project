import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

export function UserLoginPopup({ show, handleClose, onLoginSuccess }) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // needed to store the JWT cookie
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const message = await response.text();
        setError(message || "Invalid email or password.");
        return;
      }

      // Reset form state
      setEmail("");
      setPassword("");
      setValidated(false);

      onLoginSuccess?.();  // notify Navbar to re-fetch the username
      handleClose();

    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setEmail("");
    setPassword("");
    setValidated(false);
    setError(null);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>TeamKeys User Login</Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group controlId="loginEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="loginPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              required
              minLength={8}
              maxLength={16}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Password must be between 8 - 16 characters in length.
            </Form.Control.Feedback>
          </Form.Group>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
