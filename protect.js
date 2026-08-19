// Prevents unauthenticated users from accessing protected pages

import { auth } from "../firebase/firebase.js";
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// CHECK AUTHENTICATION

onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log("Authenticated:", user.email);
        return;

    }

    console.warn("User not logged in. Redirecting...");
    window.location.href = "log-in.html";

});