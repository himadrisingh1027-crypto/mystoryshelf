import { logout } from "../auth/auth.js";

// ELEMENTS

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebarOverlay");
const closeBtn = document.getElementById("closeSidebar");
const logoutBtn = document.getElementById("logoutBtn");

// SIDEBAR

if (menuBtn && sidebar && overlay) {

    menuBtn.addEventListener("click", () => {

        sidebar.classList.add("open");
        overlay.classList.add("show");
        document.body.style.overflow = "hidden";

    });

    function closeMenu() {

        sidebar.classList.remove("open");
        overlay.classList.remove("show");
        document.body.style.overflow = "";

    }

    closeBtn?.addEventListener("click", closeMenu);

    overlay.addEventListener("click", closeMenu);

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

            await logout();

            window.location.href = "log-in.html";

        }

        catch (error) {

            console.error("Logout Error:", error);

        }

    });

}