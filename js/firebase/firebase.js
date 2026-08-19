// ==========================================================
// FIREBASE CONFIGURATION
// My Story Shelf
// ==========================================================


// ==========================================================
// FIREBASE APP
// ==========================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";


// ==========================================================
// FIREBASE ANALYTICS
// ==========================================================

import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";


// ==========================================================
// FIREBASE AUTHENTICATION
// ==========================================================

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


// ==========================================================
// FIRESTORE
// ==========================================================

import {
    initializeFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


// ==========================================================
// FIREBASE STORAGE
// ==========================================================

import {
    getStorage
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";


// ==========================================================
// REALTIME DATABASE
// ==========================================================

import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


// ==========================================================
// FIREBASE CONFIGURATION
// ==========================================================

const firebaseConfig = {

    apiKey:
        "AIzaSyDx2HRgy3XALyQtTRzRZHchZi9KQcvIVK0",

    authDomain:
        "my-story-shelf-bb9c6.firebaseapp.com",

    databaseURL:
        "https://my-story-shelf-bb9c6-default-rtdb.firebaseio.com",

    projectId:
        "my-story-shelf-bb9c6",

    storageBucket:
        "my-story-shelf-bb9c6.firebasestorage.app",

    messagingSenderId:
        "233357813640",

    appId:
        "1:233357813640:web:ba1887e7c6661b7e75bc3d",

    measurementId:
        "G-8TCB093QBD"
};


// ==========================================================
// INITIALIZE FIREBASE APP
// ==========================================================

const app =
    initializeApp(firebaseConfig);


// ==========================================================
// FIREBASE SERVICES
// ==========================================================

const analytics =
    getAnalytics(app);


const auth =
    getAuth(app);


// ==========================================================
// FIRESTORE
// ==========================================================
//
// Your Firebase project has:
//
// Database ID: default
// Type: FIRESTORE_NATIVE
// Edition: ENTERPRISE
// Location: asia-south1
//
// Explicitly initialize the database.
//

const db =
    initializeFirestore(
        app,
        {},
        "default"
    );


// ==========================================================
// STORAGE
// ==========================================================

const storage =
    getStorage(app);


// ==========================================================
// REALTIME DATABASE
// ==========================================================

const realtimeDB =
    getDatabase(app);


// ==========================================================
// DEBUG INFORMATION
// ==========================================================

console.log(
    "Firebase Project:",
    app.options.projectId
);

console.log(
    "Firebase App:",
    app.name
);

console.log(
    "Firestore Database: default"
);

console.log(
    "Firestore Location: asia-south1"
);

console.log(
    "Firestore Edition: Enterprise"
);

console.log(
    "Firebase Authentication: Ready"
);

console.log(
    "Firebase Storage: Ready"
);

console.log(
    "Firebase Realtime Database: Ready"
);


// ==========================================================
// EXPORTS
// ==========================================================

export {

    // Firebase
    app,
    analytics,

    // Authentication
    auth,

    // Firestore
    db,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    setDoc,
    serverTimestamp,

    // Storage
    storage,

    // Realtime Database
    realtimeDB
};