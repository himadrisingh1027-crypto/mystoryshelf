import { signOut } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { auth } from "./firebase.js";

window.logout = async function () {
  try {
    await signOut(auth);
    window.location.href = "log-in.html";
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};