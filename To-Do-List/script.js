// console.log("To-Do List");

// Selecting required elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.querySelector(".row button"); // Select the button

// Function to add a task
function addTask() {
    const taskText = inputBox.value.trim(); // Trim spaces to prevent empty tasks

    if (taskText === "") {
        alert("You must write something!"); // Alert if input is empty
        return;
    }

    // Create a new <li> element
    let li = document.createElement("li");
    li.textContent = taskText;
    listContainer.appendChild(li);

    // Create a delete button (close '×' icon)
    let span = document.createElement("span");
    span.textContent = "\u00d7"; // '×' symbol
    li.appendChild(span);

    // Add event listener to remove the task when clicking the '×'
    span.addEventListener("click", function () {
        li.remove();
        saveData(); // Save updated list after deletion
    });

    inputBox.value = ""; // Clear the input box after adding a task
    saveData(); // Save tasks to localStorage
}

// Event listener for the "Add" button
addButton.addEventListener("click", addTask);

// Event listener for marking tasks as completed or removing them
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked"); // Toggle 'checked' class on tasks
        saveData(); // Save updated task state
    }
});

// Function to save tasks to localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to load tasks from localStorage when the page loads
function showTask() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        listContainer.innerHTML = savedData; // Restore saved tasks

        // Reattach event listeners to delete buttons after reloading
        document.querySelectorAll("li span").forEach(span => {
            span.addEventListener("click", function () {
                span.parentElement.remove();
                saveData(); // Save updated list after deletion
            });
        });
    }
}

// Load tasks from localStorage when the page opens
showTask();
