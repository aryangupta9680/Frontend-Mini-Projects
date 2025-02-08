// Selecting the password input box
const passwordBox = document.getElementById("password");

// Selecting the generate button
const generateBtn = document.querySelector(".btn");

// Selecting the copy icon inside the display div
const copyIcon = document.querySelector(".display img");

// Defining the length of the generated password
const length = 14;

// Defining character sets for password generation
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "!@#$%^&*()_+-={}[]<>/?~";

// Combining all character sets into a single string
const allChars = upperCase + lowerCase + number + symbol;

// Function to generate a random password
function createPassword() {
    let password = "";
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += number[Math.floor(Math.random() * number.length)];
    password += symbol[Math.floor(Math.random() * symbol.length)];

    while (length > password.length) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    passwordBox.value = password;
}

// Copies the generated password to the clipboard and provides user feedback by temporarily changing the button text.
function copyPassword() {
    if (passwordBox.value !== "") {
        // Copy the password to clipboard
        navigator.clipboard.writeText(passwordBox.value);

        // Provide user feedback by changing button text to "Copied!"
        generateBtn.innerText = "Copied!";

        // Revert the button text back to "Generate Password" after 1.5 seconds
        setTimeout(() => {
            generateBtn.innerText = "Generate Password";
        }, 1500);
    }
}

// Adding event listeners
generateBtn.addEventListener("click", createPassword); // Generate a new password when the button is clicked
copyIcon.addEventListener("click", copyPassword); // Copy the password when the copy icon is clicked
