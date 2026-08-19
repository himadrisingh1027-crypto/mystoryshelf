import { logout } from "js/auth/auth.js";

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        try {

            await logout();

            window.location.href = "log-in.html";

        }

        catch (error) {

            console.error("Logout Error:", error.message);

        }

    });

}