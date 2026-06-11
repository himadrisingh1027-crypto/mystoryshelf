// auth.js

import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

// LOGIN
export async function login(email, password) {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    return userCred;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
}

// SIGNUP
export async function signup(email, password) {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    return userCred;
  } catch (error) {
    console.error("Signup Error:", error.message);
    throw error;
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
  return await sendPasswordResetEmail(auth, email);
}