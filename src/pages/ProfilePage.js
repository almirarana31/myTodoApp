import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/RegisterStyles.css"; // Keeping your existing styles
import CustomNavbar from "./components/CustomNavbar";

const ProfilePage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/150");
  const [bio, setBio] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUsername(userData.username);
          setProfilePic(userData.profilePic || "https://via.placeholder.com/150");
          setBio(userData.bio || "");
          setCreatedAt(userData.createdAt?.toDate().toDateString() || "N/A");
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profile_picture"); // Replace with your Cloudinary upload preset

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dnoufqfpc/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const imageUrl = data.secure_url;

      // Update Firestore with the new profile picture URL
      await updateDoc(doc(db, "users", user.uid), {
        profilePic: imageUrl,
      });

      setProfilePic(imageUrl);
      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleSave = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { username, bio });
      alert("Profile updated successfully!");
    }
  };

  return (
    <div className="app-container d-flex flex-column min-vh-100 bg-light">
    {/* Navbar */}
    <CustomNavbar />
    <div className="profile-body">
      <div className="profile-container">
        <h2 className="profile-title">My Profile</h2>
        <div className="profile-card">
          {/* Profile Picture */}
          <img src={profilePic} alt="Profile" className="profile-pic" />

          {/* Image Upload Input */}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />

          {/* Username Input */}
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="profile-input" />

          {/* Email (Read-Only) */}
          <input type="email" value={email} disabled className="profile-input disabled" />

          {/* Bio Input */}
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="profile-bio" placeholder="Write something about yourself..."></textarea>

          {/* Account Creation Date */}
          <p className="created-at">Account Created: {createdAt}</p>

          {/* Save Changes Button */}
          <button className="save-btn" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
