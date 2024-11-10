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

// Validate first and last names
function validateName(element) {
    const namePattern = /^[A-Za-z'-]+$/;
    if (!namePattern.test(element.value)) {
        setError(element, "Only letters, apostrophes, and dashes are allowed.");
    } else {
        clearError(element);
    }
}

// Validate Date of Birth
// Function to format the date as "Month Day, Year"
function formatDate() {
    const options = {  month: 'long', day: 'numeric' ,year: 'numeric'};
    const today = new Date();
    return today.toLocaleDateString('en-US', options);
}

// Display the current date in the banner
document.getElementById('current-date').textContent = "Today's Date: " + formatDate();

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
// Email validation function (converts to lowercase)
const emailField = document.getElementById("email");
emailField.addEventListener("input", function() {
    emailField.value = emailField.value.toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorEmail = document.getElementById("errorEmail");
    if (!emailRegex.test(emailField.value)) {
        errorEmail.textContent = "Please enter a valid email address";
    } else {
        errorEmail.textContent = "";
    }
});

// Update income display based on slider
function updateIncomeDisplay() {
    const slider = document.getElementById("income-slider");
    document.getElementById("income-display").textContent = "$" + slider.value;
}

// Show the review section with entered values
function showReview() {
    document.getElementById("reviewFirstName").textContent = document.getElementById("firstName").value;
    document.getElementById("reviewLastName").textContent = document.getElementById("lastName").value;
    document.getElementById("reviewDOB").textContent = document.getElementById("dob").value;
    document.getElementById("reviewSSN").textContent = document.getElementById("ssn").value;
    document.getElementById("reviewAddress1").textContent = document.getElementById("address1").value;
    document.getElementById("reviewAddress2").textContent = document.getElementById("address2").value;
    document.getElementById("reviewCity").textContent = document.getElementById("city").value;
    document.getElementById("reviewState").textContent = document.getElementById("state").value;
    document.getElementById("reviewZip").textContent = document.getElementById("zip").value;
    document.getElementById("reviewVaccinationStatus").textContent = document.querySelector('input[name="vaccinationStatus"]:checked')?.value || "N/A";
    document.getElementById("reviewSalary").textContent = document.getElementById("income-slider").value;
    document.getElementById("reviewEmail").textContent = document.getElementById("email").value;
    document.getElementById("reviewSymptoms").textContent = document.getElementById("symptoms").value;
    document.getElementById("reviewUsername").textContent = document.getElementById("userId").value;

    // Show the review section
    document.getElementById("reviewSection").style.display = "block";
}

// Function to check if there are any validation errors
function hasErrors() {
    const errorMessages = document.querySelectorAll('span[id^="error"]');
    for (let error of errorMessages) {
        if (error.textContent !== '') {
            return true;
        }
    }
    return false;
}

// Function to validate the entire form
function validateForm() {
    let valid = true;

    // Validate first and last names
    validateName(document.getElementById("firstName"));
    validateName(document.getElementById("lastName"));
    
    // Validate SSN
    validateSSN();

    // Validate Zip Code
    validateZip();
    //Validate Email
    const email = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        setError(email, "Please enter a valid email address.");
        formIsValid = false;
    } else {
        clearError(email);
    }

    // If the form is valid, show the review section and enable the submit button
    if (formIsValid) {
        showReview();
        document.getElementById("submitBtn").style.display = "block";  // Show Submit button
    } else {
        document.getElementById("submitBtn").style.display = "none";  // Hide Submit button
    }

    // If there are errors, set valid to false
    if (hasErrors()) {
        valid = false;
    }

    // Show or hide the Submit button based on validity
    if (valid) {
        document.getElementById("submitBtn").style.display = "inline-block"; // Show Submit button
    } else {
        document.getElementById("submitBtn").style.display = "none"; // Hide Submit button
    }

    return valid;
}
// Event listener for the confirm password field
const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirm-password');
const errorConfirmPassword = document.getElementById('errorConfirmPassword');
    
confirmPasswordField.addEventListener('input', () => {
    if (confirmPasswordField.value !== passwordField.value) {
        errorConfirmPassword.textContent = "Passwords do not match";
    } else {
        errorConfirmPassword.textContent = "";  // Clear error if passwords match
    }
});
// Select the email field and error display span
const email = document.getElementById("email");
const errorEmail = document.getElementById("errorEmail");

// Regular expression for validating email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Email validation function on input and on blur to validate as user types and when they leave the field
emailField.addEventListener("input", validateEmail);
emailField.addEventListener("blur", validateEmail);

function validateEmail() {
    // Convert email input to lowercase for consistency
    emailField.value = emailField.value.toLowerCase();

    // Check if the email matches the regex
    if (!emailRegex.test(emailField.value)) {
        errorEmail.textContent = "Please enter a valid email address";
    } else {
        errorEmail.textContent = ""; // Clear error if the email is valid
    }
}

// Event listener for the form validation
document.getElementById("patientForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form submission for testing
    validateForm();
});
// Listen for form submission (optional confirmation check)
document.getElementById('patientForm').addEventListener('submit', function(e) {
    if (!document.getElementById("firstName").value || !document.getElementById("lastName").value) {
        e.preventDefault();
        alert("Please fill out all required fields.");
    }
});
