// console.log("Stopwatch"); // Logging to indicate that the script has started

// Initialize time variables (hours, minutes, seconds)
let [seconds, minutes, hours] = [0, 0, 0];

// Get references to the DOM elements
let displayTime = document.getElementById("displayTime");
let Start = document.getElementById("start");
let Reset = document.getElementById("reset");
let Stop = document.getElementById("stop");

// Timer reference
let timer = null;

// Increments time and updates display in HH:MM:SS format.
function stopwatch() {
    seconds++;

    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }

    // Format time to always display two digits
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    // Update the display element with the formatted time
    displayTime.textContent = `${h}:${m}:${s}`;
}


// Starts the stopwatch timer. Ensures only one interval is running at a time.
function watchStart() {
    if (timer === null) {
        timer = setInterval(stopwatch, 1000);
    }
}

// Stops the stopwatch by clearing the interval. Resets the `timer` variable to null.
function watchStop() {
    clearInterval(timer);
    timer = null;
}

// Resets the stopwatch to "00:00:00". Stops the timer and resets all time values.
function watchReset() {
    clearInterval(timer);
    timer = null;
    [seconds, minutes, hours] = [0, 0, 0];
    displayTime.textContent = "00:00:00";
}

// Ensure the buttons exist before attaching event listeners to avoid errors
if (Start && Stop && Reset) {
    Start.addEventListener("click", watchStart);
    Stop.addEventListener("click", watchStop);
    Reset.addEventListener("click", watchReset);
} else {
    console.error("One or more buttons not found in the DOM!");
}
