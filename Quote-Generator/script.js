// console.log("Quote Generator");

// Select elements from the DOM
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const newQuoteBtn = document.getElementById("newquote");
const tweetBtn = document.getElementById("tweet");

// API endpoint for fetching random quotes
const api_url = "https://dummyjson.com/quotes/random";

// Fetch and display a new quote
async function getQuote(url) {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    quote.innerHTML = data.quote;
    author.innerHTML = data.author;
}

// Load an initial quote on page load
getQuote(api_url);

// Function to share the quote on Twitter
function tweet() {
    window.open("https://twitter.com/intent/tweet?text=" + quote.innerHTML + " --- by " + author.innerHTML, "Tweet Window", "width=600, height=300");
}

// Event listener for the "New Quote" button to fetch a new quote on click
newQuoteBtn.addEventListener("click", () => {
    getQuote(api_url);
});

// Event listener for the "Tweet" button to share the quote on Twitter
tweetBtn.addEventListener("click", () => {
    tweet();
});