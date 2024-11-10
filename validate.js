// Utility function to add error messages
function setError(element, message) {
    const errorSpan = document.getElementById("error" + element.id.charAt(0).toUpperCase() + element.id.slice(1));
    errorSpan.textContent = message;
    element.classList.add("error");
}

// Utility function to clear error messages
function clearError(element) {
    const errorSpan = document.getElementById("error" + element.id.charAt(0).toUpperCase() + element.id.slice(1));
    errorSpan.textContent = "";
    element.classList.remove("error");
}

// Clear all errors
function clearAllErrors() {
    const errorMessages = document.querySelectorAll('span[id^="error"]');
    for (let error of errorMessages) {
        error.textContent = ""; // Clear the error text
    }

    // Remove "error" class from all form elements
    const formElements = document.querySelectorAll('input, select, textarea');
    for (let element of formElements) {
        element.classList.remove("error");
    }
}

// Validate first and last names
function validateName(element) {
    const namePattern = /^[A-Za-z'-]+$/;
    if (!namePattern.test(element.value)) {
        setError(element, "Only letters, apostrophes, and dashes are allowed.");
    } else {
        clearError(element);
    }
}

// Validate SSN (Social Security Number)
function validateSSN() {
    const ssn = document.getElementById("ssn");
    const ssnPattern = /^\d{3}-\d{2}-\d{4}$/;
    if (!ssnPattern.test(ssn.value)) {
        setError(ssn, "Enter a valid SSN in the format XXX-XX-XXXX.");
    } else {
        clearError(ssn);
    }
}

// Validate Zip Code
function validateZip() {
    const zip = document.getElementById("zip");
    const zipPattern = /^\d{5}$/;
    if (!zipPattern.test(zip.value)) {
        setError(zip, "Enter a valid 5-digit zip code.");
    } else {
        clearError(zip);
    }
}

// Validate email
function validateEmail() {
    const email = document.getElementById("email");
    const emailPattern = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}$/i;
    if (!emailPattern.test(email.value)) {
        setError(email, "Enter a valid email address.");
    } else {
        clearError(email);
    }
}

// Validate user ID
function validateUserId() {
    const userId = document.getElementById("userId");
    const userIdPattern = /^[a-zA-Z0-9_-]{6,20}$/;
    if (!userIdPattern.test(userId.value)) {
        setError(userId, "User ID must be 6-20 characters long and can contain letters, numbers, underscores, or hyphens.");
    } else {
        clearError(userId);
    }
}

// Validate password and confirm password
function validatePasswords() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");

    if (password.value !== confirmPassword.value) {
        setError(confirmPassword, "Passwords do not match.");
    } else {
        clearError(confirmPassword);
    }
}

// Validate Date of Birth
function validateDOB() {
    const dob = document.getElementById("dob");
    const dobDate = new Date(dob.value);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();

    if (dobDate > today) {
        setError(dob, "Date of birth cannot be in the future.");
    } else if (age > 120) {
        setError(dob, "Date of birth cannot be more than 120 years ago.");
    } else {
        clearError(dob);
    }
}

// Validate salary input and show error if necessary
function validateSalary() {
    const salary = document.getElementById("income-slider");
    const salaryDisplay = document.getElementById("errorIncome");

    if (!salary.value) {
        salaryDisplay.textContent = "Please select a salary.";
        salary.classList.add("error");
    } else {
        salaryDisplay.textContent = "";
        salary.classList.remove("error");
    }
}

// Update the salary display whenever the slider value changes
document.getElementById("income-slider").addEventListener('input', function() {
    const salary = document.getElementById("income-slider");
    const salaryDisplay = document.getElementById("income-display");
    salaryDisplay.textContent = "$" + salary.value;
});

// Validate all fields and return true if valid
function validateForm() {
    clearAllErrors();

    validateName(document.getElementById("firstName"));
    validateName(document.getElementById("lastName"));
    validateSSN();
    validateEmail();
    validateUserId();
    validatePasswords();
    validateDOB();
    validateSalary();

    // Check if there are any errors
    const errors = document.querySelectorAll('.error');
    const submitBtn = document.getElementById("submitBtn");

    // If no errors, show the submit button
    if (errors.length === 0) {
        submitBtn.style.display = "block"; // Show the submit button
    } else {
        submitBtn.style.display = "none"; // Hide the submit button
    }
}

// Call validateForm() whenever a user interacts with the form to validate fields dynamically
document.getElementById("firstName").addEventListener('input', () => validateName(document.getElementById("firstName")));
document.getElementById("lastName").addEventListener('input', () => validateName(document.getElementById("lastName")));
document.getElementById("ssn").addEventListener('input', validateSSN);
document.getElementById("email").addEventListener('input', validateEmail);
document.getElementById("userId").addEventListener('input', validateUserId);
document.getElementById("password").addEventListener('input', validatePasswords);
document.getElementById("confirm-password").addEventListener('input', validatePasswords);
document.getElementById("dob").addEventListener('input', validateDOB);
document.getElementById("income-slider").addEventListener('input', validateSalary);

// Validate on button click
document.getElementById("validateBtn").addEventListener('click', validateForm);




