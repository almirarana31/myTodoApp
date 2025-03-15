import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/LoginStyles.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setError] = useState(null);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

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

  const handleGoogleLogIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/home")
    } catch (err) {
      setError("Google Log-in Failed" + err.message)
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
        <button className="button-google" onClick={handleGoogleLogIn}>Log in with Google</button>
      </form>
      <p className="login-p">
        Don't have an account? <span onClick={() => navigate("/register")}>Sign up</span>
      </p>
    </div>
  );
};

export default LoginPage;
