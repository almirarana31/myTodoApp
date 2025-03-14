import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAEgPfKcVBZtQtzARqXNbVHxoLnXTzgNms",
  authDomain: "wads-9ff83.firebaseapp.com",
  projectId: "wads-9ff83",
  storageBucket: "wads-9ff83.firebasestorage.app",
  messagingSenderId: "265982087989",
  appId: "1:265982087989:web:db076c2127eab2d2f2727c",
  measurementId: "G-C71VZP2DKQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, app, storage };
