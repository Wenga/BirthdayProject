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

// Funtion and listeners to open & close About overlay
const aboutButton = document.querySelector(".dropdown-content li:first-child a");
const aboutOverlay = document.getElementById("about");
const closeAboutButton = document.getElementById("closeAboutButton");
const rightMenu = document.getElementById("right-menu");

function openAboutOverlay() {
    aboutOverlay.style.display = "block";
    storyOverlay.style.display = "none";
    rightMenu.classList.remove("active");
    isMenuOpen = true;
}
function closeAboutOverlay() {
    aboutOverlay.style.display = "none";
    isMenuOpen = false;
}

aboutButton.addEventListener("click", openAboutOverlay);
closeAboutButton.addEventListener("click", closeAboutOverlay);

// Funtion and listeners to open & close Story overlay
const storyButton = document.querySelector(".dropdown-content li:nth-child(2) a");
const storyOverlay = document.getElementById("story");
const closeStoryButton = document.getElementById("closeStoryButton")

function openStoryOverlay() {
    storyOverlay.style.display = "block";
    aboutOverlay.style.display = "none";
    rightMenu.classList.remove("active");
    isMenuOpen = true;
}
function closeStoryOverlay(){
    storyOverlay.style.display = "none";
    isMenuOpen = false;
}

storyButton.addEventListener("click", openStoryOverlay);
closeStoryButton.addEventListener("click", closeStoryOverlay);
