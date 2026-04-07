import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";

// User update modal here -------------------------------------------------------------------------------

export function UserUpdatePopup({ show, handleClose, onUpdateSuccess }) {

  const [userName, setUserName] = useState("");
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
      const emailRequest = await fetch('http://localhost:8080/get-email', {
        method: "GET",
        credentials: 'include',
      });

      const email = await emailRequest.text();

      console.log("User email is:", email);

      const response = await fetch(`http://localhost:8080/update-username/${email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userName }),
      });
      
      if (!response.ok) {
        const message = await response.text();
        setError(message || "Update failed.");
        return;
      }
      toast.success("Username updated! Please logout and login again.");
      // reset form
      setUserName("");
      setValidated(false);

      onUpdateSuccess?.(); // refresh username in navbar
      handleClose();

    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setUserName("");
    setValidated(false);
    setError(null);
    handleClose();
  };

  return (
    <>
    <Toaster />
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Your Details</Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={userName}
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a username.
            </Form.Control.Feedback>
          </Form.Group>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
    </>
  );
}

// Password reset modal here -------------------------------------------------------------------------------

export function UserPasswordResetPopup({ show, handleClose, onPasswordReset }) {
  
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmitReset = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const request = await fetch(`http://localhost:8080/forgot-password/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      if (!request.ok) {
        try {
          const data = await request.json();
          setError(data.message || "Invalid email.");
        } catch {
          setError("Something went wrong.");
        }
        return;
      }

      setSuccess(true);
      setEmail("");
      onPasswordReset?.();

    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setEmail("");
    setError(null);
    setSuccess(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>TeamKeys - Password Reset</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmitReset}>
        <Modal.Body>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && (
            <Alert variant="success">
              If that email exists, a reset link has been sent.
            </Alert>
          )}

          <Form.Group controlId="resetEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              disabled={success}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={loading || success}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

// Login modal here -------------------------------------------------------------------------------

export function UserLoginPopup({ show, handleClose, onLoginSuccess }) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

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
        try {
          const data = await response.json();
          setError(data.message || "Invalid email or password.");
        } catch {
          setError("Invalid email or password.");
        }
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
    <>
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
              type={showPassword ? "text" : "password"}
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
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                cursor: "pointer",
                background: "none",
                border: "black",
                color: "black"
              }}
            >
              {showPassword ? "Hide Password" : "Show Password"}
          </button>

          </Form.Group>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="link" className="me-auto" onClick={() => setShowPasswordReset(true)}>Forgot Password</Button>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
    <UserPasswordResetPopup show={showPasswordReset} handleClose={() => setShowPasswordReset(false)} />

    </>
  );
}

// Trends modal here -------------------------------------------------------------------------------

export function TrendsModal({ show, handleClose }) {

  const TREND_ID = 1; 

  const [points, setPoints] = useState(Array(9).fill(""));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (index, value) => {
    const updated = [...points];
    updated[index] = value;
    setPoints(updated);
  };

  const handleSubmitTrends = async (event) => {
    event.preventDefault();

    if (points.some(p => p === "")) {
      setError("Please fill in all 9 values.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/trends/predicted-score", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          trendId: TREND_ID,
          predictedScore: points.map(Number)
        }),
      });

      if (!response.ok) {
        setError("Error! Only TeamKeys members are allowed to make edits!");
        return;
      }

      setSuccess(true);
      setPoints(Array(9).fill(""));

    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setPoints(Array(9).fill(""));
    setError(null);
    setSuccess(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Enter Trend Predictions</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmitTrends}>
        <Modal.Body>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && (
            <Alert variant="success">
              Trends submitted successfully!
            </Alert>
          )}

          {points.map((value, index) => (
            <Form.Group key={index} className="mb-2">
              <Form.Label>Point {index + 1}</Form.Label>
              <Form.Control
                type="number"
                value={value}
                required
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </Form.Group>
          ))}

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}