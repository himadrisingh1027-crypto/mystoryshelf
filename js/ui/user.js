// Handles displaying the logged-in user's information

import { auth } from "../firebase/firebase.js";
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// ELEMENTS

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

// SAFETY CHECK

if (!userName || !userEmail) {
    console.warn("User elements not found.");

} else {
    // WATCH AUTH STATE

    onAuthStateChanged(auth, (user) => {

        if (user) {
            // User is logged in

            const email = user.email || "";
            const name = email.split("@")[0];
            userName.textContent = capitalize(name);
            userEmail.textContent = email;

        } else {
            // No user logged in

            userName.textContent = "Guest";
            userEmail.textContent = "Not Logged In";

        }
    });
}

// CAPITALIZE FIRST LETTER

function capitalize(text) {

    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);

}