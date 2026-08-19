document.addEventListener("DOMContentLoaded", () => {

    console.log("Theme JS Loaded");

    const toggleBtn = document.getElementById("themeToggle");
    const header = document.querySelector(".site-header");
    const themeColor = document.querySelector('meta[name="theme-color"]');

    if (!toggleBtn) {

        console.error("Theme button not found.");
        return;

    }

    function isDarkMode() {

        return document.documentElement.classList.contains("dark");

    }

    document.documentElement.classList.remove("light", "dark");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {

        document.documentElement.classList.add(savedTheme);

    }

    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {

        document.documentElement.classList.add("dark");

    }

    function updateIcon() {

        toggleBtn.innerHTML = isDarkMode()

            ? '<i class="fa-solid fa-sun"></i>'

            : '<i class="fa-solid fa-moon"></i>';

        if (themeColor) {

            themeColor.setAttribute(
                "content",
                isDarkMode() ? "#17120F" : "#F6F0E8"
            );

        }

    }

    updateIcon();

    toggleBtn.addEventListener("click", () => {

        document.documentElement.classList.add("theme-transition");

        document.documentElement.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            isDarkMode() ? "dark" : "light"
        );

        updateIcon();

        setTimeout(() => {

            document.documentElement.classList.remove("theme-transition");

        }, 300);

    });

    if (header) {

        window.addEventListener("scroll", () => {

            header.classList.toggle(
                "scrolled",
                window.scrollY > 30
            );

        });

    }

});

