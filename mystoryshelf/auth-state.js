import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { auth } from "./firebase.js";

// prevent UI flicker
document.body.style.display = "none";

onAuthStateChanged(auth, (user) => {
  document.body.style.display = "block";

  const path = window.location.pathname;

  const isAuthPage =
    path.includes("log-in.html") || path.includes("signup.html");

  const isHomePage =
    path.endsWith("/") || path.includes("index.html");

  if (user) {
    // ✅ USER LOGGED IN
    if (isAuthPage) {
      window.location.href = "index.html";
    }

    const emailElement = document.getElementById("userEmail");
    if (emailElement) {
      emailElement.textContent = user.email;
    }

  } else {
    // ❌ USER LOGGED OUT
    if (isHomePage) {
      window.location.href = "log-in.html";
    }
  }
});

const sidebarEmail = document.getElementById("sidebarEmail");
const sidebarLogout = document.getElementById("sidebarLogout");
const sidebarLogin = document.getElementById("sidebarLogin");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // logged in
    if (sidebarEmail) sidebarEmail.textContent = user.email;

    if (sidebarLogout) sidebarLogout.style.display = "block";
    if (sidebarLogin) sidebarLogin.style.display = "none";

  } else {
    // logged out
    if (sidebarEmail) sidebarEmail.textContent = "Not logged in";

    if (sidebarLogout) sidebarLogout.style.display = "none";
    if (sidebarLogin) sidebarLogin.style.display = "block";
  }
});