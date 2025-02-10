// console.log("Age Calculator");

let userInput = document.getElementById("date");
let result = document.getElementById("result");
const calculateBtn = document.getElementById("btn");

// Restrict the date input to prevent selecting future dates
userInput.max = new Date().toISOString().split("T")[0];

//  Function to calculate the age based on the selected birth date
function calculateAge() {
    // Check if the user has entered a valid date
    if (!userInput.value) {
        result.innerHTML = `Please enter a valid birth date.`;
        return;
    }

    // Extract day, month, and year from the birth date
    let birthDate = new Date(userInput.value);
    let d1 = birthDate.getDate();
    let m1 = birthDate.getMonth() + 1; // Months are zero-based, so add 1
    let y1 = birthDate.getFullYear();

    // Get the current date
    let today = new Date();
    let d2 = today.getDate();
    let m2 = today.getMonth() + 1;
    let y2 = today.getFullYear();

    // Calculate the difference in years
    let y3 = y2 - y1;

    let m3, d3;

    // Adjust the month difference
    if (m2 >= m1) {
        m3 = m2 - m1;
    } else {
        y3--; // Reduce one year if the current month is before birth month
        m3 = 12 + m2 - m1;
    }

    // Adjust the day difference
    if (d2 >= d1) {
        d3 = d2 - d1;
    } else {
        m3--; // Reduce one month if the current day is before birth day
        d3 = getDaysInMonth(y2, m2 - 1) + d2 - d1;
    }

    // Ensure month doesn't go negative
    if (m3 < 0) {
        m3 += 12;
        y3--;
    }

    // Handle the case where the age is exactly 0 years, 0 months, and 0 days
    if (y3 === 0 && m3 === 0 && d3 === 0) {
        result.innerHTML = `You are <span>0</span> years, <span>0</span> months, and <span>0</span> days old.`;
        return;
    }

    // Display the calculated age
    result.innerHTML = `You are <span>${y3}</span> years, <span>${m3}</span> months, and <span>${d3}</span> days old.`;
}

// Function to get days in a month
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

// Attach event listener to the calculate button
calculateBtn.addEventListener("click", calculateAge);
