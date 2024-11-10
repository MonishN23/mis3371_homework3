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

// Update salary display based on slider value
function updateIncomeDisplay() {
    const salary = document.getElementById("income-slider");
    const salaryDisplay = document.getElementById("income-display");
    salaryDisplay.textContent = "$" + salary.value;
}

// Validate all fields and return true if valid
function validateForm() {
    clearAllErrors();

    validateName(document.getElementById("firstName"));
    validateName(document.getElementById("lastName"));
    validateSSN();
    validateZip();
    validateEmail();
    validateUserId();
    validatePasswords();
    validateDOB();

    // Additional checks for salary and other optional fields
    validateSalary();

    // Check if there are any errors
    const errors = document.querySelectorAll('.error');
    if (errors.length === 0) {
        document.getElementById("submitBtn").style.display = "block";
        document.getElementById("reviewSection").style.display = "block";
        populateReviewSection();
    } else {
        document.getElementById("submitBtn").style.display = "none";
        document.getElementById("reviewSection").style.display = "none";
    }
}

// Populate review section with form data
function populateReviewSection() {
    document.getElementById("reviewFirstName").textContent = document.getElementById("firstName").value;
    document.getElementById("reviewLastName").textContent = document.getElementById("lastName").value;
    document.getElementById("reviewDOB").textContent = document.getElementById("dob").value;
    document.getElementById("reviewSSN").textContent = document.getElementById("ssn").value;
    document.getElementById("reviewAddress1").textContent = document.getElementById("address1").value;
    document.getElementById("reviewAddress2").textContent = document.getElementById("address2").value;
    document.getElementById("reviewCity").textContent = document.getElementById("city").value;
    document.getElementById("reviewState").textContent = document.getElementById("state").value;
    document.getElementById("reviewZip").textContent = document.getElementById("zip").value;
    document.getElementById("reviewEmail").textContent = document.getElementById("email").value;
    document.getElementById("reviewVaccinationStatus").textContent = document.querySelector('input[name="vaccinationStatus"]:checked')?.value || "N/A";
    document.getElementById("reviewSymptoms").textContent = document.getElementById("symptoms").value;
    document.getElementById("reviewSalary").textContent = "$" + document.getElementById("income-slider").value;
    document.getElementById("reviewUsername").textContent = document.getElementById("userId").value;
}

// Call validateForm() whenever a user interacts with the form to validate fields dynamically
document.getElementById("firstName").addEventListener('input', () => validateName(document.getElementById("firstName")));
document.getElementById("lastName").addEventListener('input', () => validateName(document.getElementById("lastName")));
document.getElementById("dob").addEventListener('change', validateDOB);
document.getElementById("ssn").addEventListener('input', validateSSN);
document.getElementById("zip").addEventListener('input', validateZip);
document.getElementById("email").addEventListener('input', validateEmail);
document.getElementById("userId").addEventListener('input', validateUserId);
document.getElementById("password").addEventListener('input', validatePasswords);
document.getElementById("confirm-password").addEventListener('input', validatePasswords);
document.getElementById("income-slider").addEventListener('input', updateIncomeDisplay);

document.getElementById("validateBtn").addEventListener('click', validateForm);

