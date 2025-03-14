import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/LoginStyles.css"; // Import separate CSS file

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect to home pages
    } catch (error) {
      alert("Login Failed: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 style={{color:"white"}}>Welcome Back!</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input className="email-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input className="password-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit">Login</button>
      </form>
      <p className="login-p">
        Don't have an account? <span onClick={() => navigate("/register")}>Sign up</span>
      </p>
    </div>
  );
};

export default LoginPage;
