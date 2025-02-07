// console.log("Welcome to Tic-Tac-Toe Game");

let audioGameover = new Audio("assets/music/music-1.mp3");
let audioTurn = new Audio("assets/music/music-2.mp3");
let win = new Audio("assets/music/music-3.mp3");

let turn = "X";
let gameover = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X"
}

// Function to check for a win
const checkWin = () => {
    let boxtexts = document.getElementsByClassName("box-text");
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[0]].innerText !== "")) {
            win.play()
            document.querySelector(".info").innerText = boxtexts[e[0]].innerText + " Won"
            gameover = true;
            document.querySelector(".image").getElementsByTagName("img")[0].style.width = "140px"
        }
    })
}


// Function to check for a draw
const checkDraw = () => {
    let boxtexts = document.getElementsByClassName("box-text");
    let isDraw = true;

    // Check if any box is empty
    Array.from(boxtexts).forEach(box => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    // If no empty boxes and no winner, it's a draw
    if (isDraw && !gameover) {
        document.querySelector(".info").innerText = "It's a Draw!";
        gameover = true;
        document.querySelector(".image").getElementsByTagName("img")[0].style.width = "140px";
        audioGameover.play();
    }
};


// Game Logic 
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".box-text");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !gameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            checkDraw(); // Call checkDraw after checking for a win
            if (!gameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    })
})


// Add onclick Listener to reset button
reset.addEventListener("click", () => {
    let boxtexts = document.querySelectorAll(".box-text");
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    })
    turn = "X";
    gameover = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector(".image").getElementsByTagName("img")[0].style.width = "0px"
})


