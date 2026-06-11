import { signup } from "./auth.js";

const form = document.getElementById("signupForm");
const message = document.getElementById("message");
const button = form.querySelector("button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  message.textContent = "";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    message.style.color = "red";
    message.textContent = "Passwords do not match";
    return;
  }

  try {
    button.disabled = true;
    button.textContent = "Signing up...";

    await signup(email, password);

    message.style.color = "green";
    message.textContent = "Account created successfully!";

    window.location.href = "index.html";

  } catch (error) {
    message.style.color = "red";
    message.textContent = error.message;
  } finally {
    button.disabled = false;
    button.textContent = "Sign Up";
  }
});