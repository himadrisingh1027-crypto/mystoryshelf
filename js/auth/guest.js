// Redirect authenticated users away from guest pages

import { auth } from "../firebase/firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// CHECK AUTHENTICATION

onAuthStateChanged(auth, (user) => {

    if (!user) {

        return;

    }

    console.log("Already logged in:", user.email);

    window.location.href = "index.html";

});