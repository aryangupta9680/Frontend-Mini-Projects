// console.log("Notes-App");

// Selecting the container where notes will be displayed
const notesContainer = document.querySelector(".notes-container");

// Selecting the button that creates new notes
const createBtn = document.querySelector(".btn");


// Selecting all existing notes (if any)
let notes = document.querySelectorAll(".input-box");

// Function to load and display saved notes from local storage
function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes") || ""; // Load stored notes or an empty string if none exist
}

showNotes(); // Display stored notes on page load

// Function to update local storage with the current state of notes
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML)
}

// Event listener for the "Create Notes" button
createBtn.addEventListener("click", ()=>{
    let inputBox = document.createElement("p");
    let image = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    image.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(image);
})

// Event listener to handle note interactions (delete & update)
notesContainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box")
        notes.forEach(nt=>{
            nt.onkeyup = function(){
                updateStorage();
            }
        })
    }
})

// Event listener to prevent the Enter key from creating new paragraphs. Instead, it inserts a line break within the existing note
document.addEventListener("keydown", e=>{
    if (e.key === "Enter") {
        document.execCommand("insertLineBreak");
        e.preventDefault(); // Prevent default behavior of creating a new paragraph
    }
})
