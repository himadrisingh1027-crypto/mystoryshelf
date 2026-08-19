import { login, resetPassword } from
 "./auth.js";

 // ELEMENTS

 const form =
  document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");
    const loginButton = form.querySelector("button");
    const forgotPassword = document.getElementById("forgotPassword");
    const resetBox = document.getElementById("resetBox");
    const resetEmail = document.getElementById("resetEmail");          const resetBtn = document.getElementById("resetBtn");
    const resetMsg = document.getElementById("resetMsg");

// ====================== // LOGIN // ======================

if (!form) {

    console.error("Login form not found.");

} else {
 form.addEventListener("submit", async (e) => {

    e.preventDefault(); 
    errorMessage.textContent = ""; 
    errorMessage.style.color = "red"; 
    loginButton.disabled = true; 
    loginButton.textContent = "Logging in..."; 
    try { 
        const userCredential = await login(
           emailInput.value.trim(),
           passwordInput.value
        );

        // Useful for debugging
        console.log("User UID:", userCredential.user.uid);
        console.log("Email:", userCredential.user.email);

        window.location.href = "index.html";
    } 
    catch (error) { 
        switch (error.code) { 
            case "auth/invalid-email": 
            errorMessage.textContent = "Please enter a valid email."; 
            break; 
            case "auth/invalid-credential": 
            case "auth/wrong-password": 
            case "auth/user-not-found": 
            errorMessage.textContent = "Incorrect email or password."; 
            break; 
            case "auth/too-many-requests": 
            errorMessage.textContent = "Too many attempts. Please try again later."; 
            break; 
            case "auth/network-request-failed": 
            errorMessage.textContent = "Network error. Check your internet connection."; 
            break; 
            default: errorMessage.textContent = error.message; 
        } 
    } finally  { 
        loginButton.disabled = false; 
        loginButton.textContent = "Log In"; 
    } 
}); 
}

 // SHOW / HIDE RESET BOX 

if (!form) {
    console.error("Reset form not found.");
} else {
forgotPassword.addEventListener("click", 
    (e) => { e.preventDefault(); 
        resetBox.classList.toggle("hidden"); 
        resetMsg.textContent = ""; 
    }); 
}
// SEND RESET EMAIL

if (!form) {
    console.error("Login form not found.");
} else {
resetBtn.addEventListener("click", async () => { 
    const email = resetEmail.value.trim(); 
    resetMsg.style.color = "red"; 
    if (!email) 
        { resetMsg.textContent = "Please enter your email."; 
    return; 
    } resetBtn.disabled = true; 
    resetBtn.textContent = "Sending..."; 
    try {
        await resetPassword(email); 

        resetMsg.style.color = "green"; 
        resetMsg.textContent = "Password reset email sent successfully."; 
        resetEmail.value = ""; 
    } 
    catch (error) { 
        switch (error.code) { 
            case "auth/user-not-found": 
            resetMsg.textContent = "No account exists with this email."; 
            break; 
            case "auth/invalid-email": 
            resetMsg.textContent = "Invalid email address."; 
            break; 
            case "auth/network-request-failed": 
            resetMsg.textContent = "Check your internet connection."; 
            break; 
            default: resetMsg.textContent = error.message; 
        } 
    } finally { 
        resetBtn.disabled = false; 
        resetBtn.textContent = "Send Reset Link"; 
    } 
});
}
