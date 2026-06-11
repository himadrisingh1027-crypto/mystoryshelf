import { signOut } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { auth } from "./firebase.js";

// ELEMENTS
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeSidebar");
const logoutBtn = document.getElementById("sidebarLogout");

// SAFETY CHECK
if (menuBtn && sidebar && overlay) {

  // OPEN SIDEBAR
  menuBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden"; // prevent scroll
  });

  // CLOSE FUNCTION
  const closeMenu = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = ""; // restore scroll
  };

  // CLOSE BUTTON
  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  // CLICK OUTSIDE
  overlay.addEventListener("click", closeMenu);

  // ESC KEY CLOSE
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });
}


// LOGOUT
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "log-in.html";
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  });
}