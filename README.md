# Welcome to Ally's To Do List App ❤️
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is a simple to-do application built with React and Firebase, with support for Docker deployment.

## Let's get started! ✨
You can set up this project using GitHub (manual installation) or Docker (containerized setup).

### 🐳 Setup via Docker (Containerized Deployment)
1️⃣ Pull the docker image from the repository
```
docker pull alfarana/my-todo-app
```

2️⃣ Run the Docker Container
```
docker run -p 3000:3000 -e HOST=0.0.0.0 alfarana/my-todo-app
```

3️⃣ Access the app<br/>
Open [http://localhost:3000](http://localhost:3000) in your browser.<br/><br/>


### 🔧 Setup via GitHub (Manual Installation)
1️⃣ Clone the GitHub Repository 
```
git clone https://github.com/<your-username>/my-todo-app.git
```
```
cd my-todo-app
```

2️⃣ Install Node Dependencies
```
npm install
```

3️⃣ Set up Firebase/Firestore
1. Create a Firebase project at Firebase Console.
2. Copy your Firebase config and update firebase.js like so:

```
import { initializeApp } from "firebase/app";
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
export const db = getFirestore(app);
```
3. Enable Authentication (Email/Password + Google Sign-In).
4. Create a Firestore Database.
5. Add two collections named "tasks" and "users".
6. In the "Rules" tab, update your rules to look like this:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 4, 16);
    }
  }
}
```


4️⃣ Run the App
```
npm start #Runs on localhost:3000
```

# After installing and running...</br>
## 🎀 You should be greeted by a pink login page!
![image](https://github.com/user-attachments/assets/5370d784-3a64-4f95-a9a1-4cdd0c9792c1)
</br>
Sign up or log in manually, or use your Google account.
</br>
## 🌸 After you log in, the home page will greet you.
![Screenshot 2025-03-15 123854](https://github.com/user-attachments/assets/0fa89f56-832e-4168-a66d-c1f4f02a062e)
Add tasks, delete tasks, update tasks, and complete tasks. Completed tasks will automatically move to the bottom of the page and will be marked with a strikethrough.
</br>
## 🎁 Customize your profile picture and bio through the My Profile page!
![Screenshot 2025-03-15 124206](https://github.com/user-attachments/assets/73a79ad9-629d-4c95-8c5a-925ab1420612)
</br>
⚠️ Don't forget to save your changes.

## That's all! Thank you for using my To Do List App 😆
