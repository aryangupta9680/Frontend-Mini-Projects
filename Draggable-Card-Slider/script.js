// console.log("Draggable-Card-Slider");


// Selecting required DOM elements
const wrapper = document.querySelector(".wrapper"); // Main container that holds the carousel
const carousel = document.querySelector(".carousel"); // The inner scrolling element containing all cards
const arrowBtns = document.querySelectorAll(".wrapper i"); // Left and right navigation buttons
const firstCardWidth = carousel.querySelector(".card").offsetWidth; // Width of a single card
const carouselChildren = [...carousel.children]; // Storing all child elements of the carousel


// Variables to manage dragging and autoplay
let isDragging = false, startX, startScrollLeft, timeoutId;


// Calculating the number of cards visible at a time based on the carousel width
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);


// Cloning the last few cards and adding them at the beginning to create an infinite scrolling effect
carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});


// Cloning the first few cards and adding them at the end to ensure seamless infinite scrolling
carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});


// Adding click event listeners to navigation buttons to scroll the carousel left or right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});


// Function to start dragging functionality
const dragStart = (e) => {
    isDragging = true; // Set dragging state to true
    carousel.classList.add("dragging"); // Add class to disable smooth scrolling while dragging
    startX = e.pageX; // Store initial mouse position
    startScrollLeft = carousel.scrollLeft; // Store initial scroll position
}


// Function to handle the dragging motion
const dragging = (e) => {
    if (!isDragging) return; // If not dragging, do nothing
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX); // Adjust scroll position based on movement
}


// Function to stop dragging
const dragStop = () => {
    isDragging = false; // Set dragging state to false
    carousel.classList.remove("dragging"); // Remove class to restore smooth scrolling
}


// Function to enable autoplay for the carousel
const autoPlay = () => {
    // Stop autoplay if the screen width is less than 800px or if the carousel does not need to scroll
    if (window.innerWidth < 800 || carousel.scrollWidth <= carousel.offsetWidth) return;
    
    // Automatically scroll to the next card every 2.5 seconds
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}


// Start autoplay on page load
autoPlay();


// Function to implement infinite scrolling effect
const infiniteScroll = () => {
    // If scrolled to the beginning, move to the cloned end section for a seamless loop
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition"); // Temporarily remove transition for a smooth effect
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If scrolled to the end, move back to the cloned beginning section
    else if (Math.round(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Reset autoplay timer when user scrolls manually
    clearTimeout(timeoutId);
    
    // Resume autoplay when the user is not hovering over the carousel
    if (!wrapper.matches(":hover")) autoPlay();
}

// Adding event listeners for drag functionality
carousel.addEventListener("mousedown", dragStart); // Start dragging when mouse is pressed
carousel.addEventListener("mousemove", dragging); // Move carousel on mouse movement
document.addEventListener("mouseup", dragStop); // Stop dragging when mouse is released

// Adding event listener for infinite scrolling functionality
carousel.addEventListener("scroll", infiniteScroll);

// Pause autoplay when the user hovers over the carousel
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));

// Resume autoplay when the user moves the mouse away from the carousel
wrapper.addEventListener("mouseleave", autoPlay);

