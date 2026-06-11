import { login, resetPassword } from "./auth.js";

const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("error-message");
const button = form.querySelector("button");

// reset UI elements
const forgot = document.getElementById("forgotPassword");
const resetBox = document.getElementById("resetBox");
const resetBtn = document.getElementById("resetBtn");
const resetEmail = document.getElementById("resetEmail");
const resetMsg = document.getElementById("resetMsg");


// LOGIN
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorMsg.textContent = "";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    button.disabled = true;
    button.textContent = "Logging in...";

    await login(email, password);

    window.location.href = "index.html";

  } catch (error) {
    errorMsg.style.color = "red";
    errorMsg.textContent = error.message;
  } finally {
    button.disabled = false;
    button.textContent = "Log In";
  }
});


// SHOW RESET UI
forgot.addEventListener("click", (e) => {
  e.preventDefault();
  resetBox.classList.toggle("hidden");
});


// SEND RESET EMAIL
resetBtn.addEventListener("click", async () => {
  const email = resetEmail.value;

  if (!email) {
    resetMsg.style.color = "red";
    resetMsg.textContent = "Please enter your email";
    return;
  }

  try {
    await resetPassword(email);

    resetMsg.style.color = "green";
    resetMsg.textContent = "Reset email sent! Check your inbox.";

  } catch (error) {
    resetMsg.style.color = "red";
    resetMsg.textContent = error.message;
  }
});