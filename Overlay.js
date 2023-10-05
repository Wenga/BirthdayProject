 // JavaScript to show the overlay when the page loads
 window.addEventListener('load', () => {
    const overlay = document.getElementById('intro');
    overlay.style.display = 'block';
});

// JavaScript to close the overlay with a fade-out effect when the "Close Overlay" button is clicked
const closeIntroButton = document.getElementById('closeIntroButton');
closeIntroButton.addEventListener('click', () => {
    const audio = document.getElementById('myAudio');
    audio.play();
    const overlay = document.getElementById('intro');
    overlay.classList.add('overlay-hidden'); // Apply the hidden class with opacity: 0
    setTimeout(function () {
        overlay.remove();
    }, 2000);
});

// Get elements
const aboutButton = document.querySelector(".dropdown-content li:first-child a");
const aboutOverlay = document.getElementById("about");
const closeOverlayButton = document.getElementById("closeOverlayButton");

// Function to open the overlay
function openOverlay() {
    aboutOverlay.style.display = "block";
}

// Function to close the overlay
function closeOverlay() {
    aboutOverlay.style.display = "none";
}

// Event listener for opening the overlay
aboutButton.addEventListener("click", openOverlay);

// Event listener for closing the overlay
closeOverlayButton.addEventListener("click", closeOverlay);