import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../css/reset-password.css";

export default function ResetUserPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      setMessage("Error! Invalid or missing reset link.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/reset-password?token=${token}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(newPassword)}`,
        { method: "PUT" }
      );

      const data = await response.text();

      if (response.ok) {
        setMessage("Password reset successfully!");
        setNewPassword("");
        nav("/");
      } else {
        setMessage("Error! " + (data || "Reset failed!"));
      }
    } catch (error) {
      console.error(error);
      setMessage("Error connecting to server");
    }
  };

  const toggleStyle = {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    background: "none",
    border: "black",
    color: "black",
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleResetPassword}>
        <h2>Reset Your TeamKeys Password</h2>

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            minLength={8}
            maxLength={16}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={toggleStyle}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button type="submit">Reset Password</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}
