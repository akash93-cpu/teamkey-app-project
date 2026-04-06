import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register-style.css";

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const [showPassword, setShowPassword] = useState(false); 
  const [message, setMessage] = useState("");
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("User registered successfully!");
        setFormData({
          email: "",
          password: "",
          userName: "",
        });
        nav("/");
      }
 else {
        setMessage("Error! " + (data.error || data.message || "Registration failed!"));
      }
      
      // if (data.error === undefined || data.message === undefined) {
      //   setMessage("Registration failed! Please check Email or password!")
      // }
    } catch (error) {
      console.error(error);
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register Your TeamKeys Account</h2>

        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={formData.userName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* 👇 Password field with toggle */}
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"} 
            name="password"
            placeholder="Password"
            minLength={8}
            maxLength={16}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              background: "none",
              border: "black",
              color: "black"
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button type="submit">Register</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}