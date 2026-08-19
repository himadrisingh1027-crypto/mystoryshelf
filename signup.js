import { signup } from "js/auth/auth.js";

// ELEMENTS

const form = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const message = document.getElementById("message");
const submitBtn = form.querySelector("button");

// SIGN UP

if (!form) {
    console.error("Signup form not found.");
} 
else {

    form.addEventListener("submit", async (e) => {
    e.preventDefault();

    message.textContent = "";
    message.style.color = "red";
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Empty validation
    if (!email || !password || !confirmPassword) {

        message.textContent = "Please fill in all fields.";
        return;
    }

    // Password match
    if (password !== confirmPassword) {

        message.textContent = "Passwords do not match.";
        return;
    }

    // Password length
    if (password.length < 6) {

        message.textContent =
            "Password must be at least 6 characters.";
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Creating Account...";

try 
{ await signup(email, password); 
    message.style.color = "green"; 
    message.textContent = "Account created successfully! Redirecting..."; 
    setTimeout(() => { window.location.href = "index.html"; 

    }, 1500); 
} 
catch (error) 
{ switch (error.code) 
    { 
    case "auth/email-already-in-use": 
    message.textContent = "An account already exists with this email."; 
    break; 
    case "auth/invalid-email": 
    message.textContent = "Please enter a valid email address."; 
    break; 
    case "auth/weak-password": 
    message.textContent = "Password should be at least 6 characters."
    ; break; 
    case "auth/network-request-failed": 
    message.textContent = "Network error. Please check your internet connection."; 
    break; 
    case "auth/operation-not-allowed": 
    message.textContent = "Email/Password authentication is not enabled in Firebase."; 
    break; 
    default: message.textContent = error.message;
    }

    }finally {

        submitBtn.disabled = false;
        submitBtn.textContent = "Create Account";

    }
});
}