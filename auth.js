// This file communicates with Firebase Authentication.
// It does not interact with the HTML directly.
import { auth, db } from "../firebase/firebase.js";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// LOGIN

export async function login(email, password) {

    try {
        return await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
    } catch (error) {
        console.error("Login Error:", error.message);
        throw error;
    }
}

// SIGN UP

export async function signup(email, password) {

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;

        await setDoc(
            doc(db, "users", user.uid),
            {

                name: "",

                email: user.email,

                role: "reader",

                bio: "",

                photo: "",

                joinedAt: serverTimestamp(),

                bookmarks: [],

                likedStories: []

            }
        );

        console.log("Firestore document created");

        } 
        catch (err) {
    console.error("Firestore write failed:", err);
    throw err;
}
}

// LOGOUT

export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout Error:", error.message);
        throw error;
    }
}

// PASSWORD RESET

export async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.error("Reset Password Error:", error.message);
        throw error;
    }

}