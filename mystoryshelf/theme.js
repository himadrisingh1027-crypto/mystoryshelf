const toggleBtn = document.getElementById("themeToggle");

// Load saved theme OR system preference
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.documentElement.classList.add(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    document.documentElement.classList.add("dark");
  }
}

// Update icon
function updateIcon() {
  if (document.documentElement.classList.contains("dark")) {
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }
}

updateIcon();

// Toggle
toggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  const theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);

  updateIcon();
});