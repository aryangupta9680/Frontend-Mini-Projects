// console.log("Drag and Drop")

// Select all draggable list items
let lists = document.querySelectorAll(".list");


// Select the left and right containers
let leftBox = document.getElementById("left");
let rightBox = document.getElementById("right");


// Global variable to store the currently dragged item
let selected = null;


// Add dragstart event to each list item
lists.forEach(list => {
    list.addEventListener("dragstart", function (e) {
        selected = this; // Store the dragged element globally
        e.dataTransfer.setData("text/plain", ""); // Required for some browsers to enable dragging
    });
});


// Add event listeners to both left and right containers
[rightBox, leftBox].forEach(box => {

    // Allow the dragged item to be moved over the container
    box.addEventListener("dragover", function (e) {
        e.preventDefault(); // Prevent default behavior to allow drop
    });

    // Handle dropping of the dragged item into the container
    box.addEventListener("drop", function (e) {
        if (selected) { // Check if an item is being dragged
            box.appendChild(selected); // Move the dragged item to the new container
            selected = null; // Reset the selected variable
        }
    });
});

