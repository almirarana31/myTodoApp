import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "../styles/RegisterStyles.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        createdAt: new Date(),
      });

      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        username: user.displayName || user.email,
        email: user.email,
        createdAt: new Date(),
      }, {merge: true});

      navigate("/home")
      } catch (err) {
        console.error("Google Sign-In Error:", err);
        setError("Failed to sign in with Google");
      }
    };

  return (
    <div className="register-body">
      <div className="register-container">
        <h2 style={{ color: "white" }}>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button-register" type="submit">Register</button>
          <button className="button-google" onClick={handleGoogleSignIn}>
            Sign-in with Google
          </button>
        </form>
        <p className="account-already">
          Already have an account? <span onClick={() => navigate("/")}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
