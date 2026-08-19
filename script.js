
// Get the form
const loginform = document.getElementById("loginform");

// Add submit event
loginform.addEventListener("submit", function (event) {

    // Prevent form from submitting
    event.preventDefault();

    // Get values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Check email
    if (email === "") {
        alert("Please enter your email.");
        return;
    }

    if (email.includes(" ")) {
        alert("Email should not contain spaces.");
        return;
    }

    if (!email.includes("@")) {
        alert("Email must contain @ symbol.");
        return;
    }

    if (!email.includes(".")) {
        alert('Email must contain a "."');
        return;
    }

    // Check password
    if (password === "") {
        alert("Please enter your password.");
        return;
    }

    if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
    }

    // Login successful
    alert("Login successful!");
})


