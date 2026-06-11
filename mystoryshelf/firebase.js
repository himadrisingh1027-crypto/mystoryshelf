// Firebase configuration and initialization

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBLk__l9VRIXyCqEA_jUyiNa-0Oz_FCuKY",
  authDomain: "my-story-shelf.firebaseapp.com",
  projectId: "my-story-shelf",
  storageBucket: "my-story-shelf.firebasestorage.app",
  messagingSenderId: "24443459324",
  appId: "1:24443459324:web:13a6c6610f2b31cdaca979",
  measurementId: "G-NYXW9NQQV5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
