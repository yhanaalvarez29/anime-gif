document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("authForm");
  const username = form.querySelector('input[name="username"]');
  const password = form.querySelector('input[name="password"]');
  const messageBox = document.querySelector(".message");

  // AI-style dynamic suggestions
  username.addEventListener("input", () => {
    if (username.value.length < 3) {
      showMessage("AI Hint: Your username is too short.");
    } else {
      clearMessage();
    }
  });

  password.addEventListener("input", () => {
    if (password.value.length < 6) {
      showMessage("AI Security Tip: Password should be at least 6 characters.");
    } else if (!/\d/.test(password.value)) {
      showMessage("AI Alert: Add at least one number.");
    } else if (!/[A-Z]/.test(password.value)) {
      showMessage("AI Suggestion: Use uppercase letters for better security.");
    } else {
      clearMessage();
    }
  });

  // Validate before submit
  form.addEventListener("submit", (e) => {
    if (username.value.trim().length < 3 || password.value.length < 6) {
      e.preventDefault();
      showMessage("AI Warning: Please check your login credentials.");
    } else {
      showMessage("AI: Logging you in...", "green");
    }
  });

  function showMessage(text, color = "orange") {
    messageBox.textContent = text;
    messageBox.style.color = color;
  }

  function clearMessage() {
    messageBox.textContent = "";
  }
});
