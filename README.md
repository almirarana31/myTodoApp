# Welcome to Ally's To Do List App!
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is a simple to-do application built with React and Firebase, with support for Docker deployment.

## Let's get started!
You can set up this project using GitHub (manual installation) or Docker (containerized setup).

### Setup via GitHub (Manual Installation)
(1) Clone the Repository
```git clone https://github.com/<your-username>/my-todo-app.git```
```cd my-todo-app```

(2) Install Node Dependencies
```npm install```

(3) Set up Firebase/Firestore
1. Create a Firebase project at Firebase Console.
2. Enable Authentication (Email/Password + Google Sign-In).
3. Create a Firestore Database.
4. Copy your Firebase config and update firebase.js
```import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);```

