// console.log("QR-Code-Generator");

// Selecting necessary DOM elements
let imgBox = document.getElementById("img-box");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let generateBtn = document.getElementById("btn");


// Function to generate the QR code based on user input.
function generateQR() {
    // Trim any leading or trailing spaces from the input
    let inputValue = qrText.value.trim();

    // Check if input is not empty
    if (inputValue.length > 0) {
        // Set the QR code image source using an external API
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(inputValue)}`;

        // Display the QR code container
        imgBox.classList.add("show-img");
    } else {
        // Add error animation if input is empty
        qrText.classList.add("error");

        // Remove error class after a short delay
        setTimeout(() => {
            qrText.classList.remove("error");
        }, 1000);
    }
}


// Event listener for the button click event
generateBtn.addEventListener("click", generateQR);


// Event listener for pressing "Enter" inside the input field
qrText.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        generateQR();
    }
});
