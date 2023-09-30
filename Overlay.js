 // JavaScript to show the overlay when the page loads
 window.addEventListener('load', () => {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
});

// JavaScript to close the overlay with a fade-out effect when the "Close Overlay" button is clicked
    const closeOverlayButton = document.getElementById('closeOverlayButton');
    closeOverlayButton.addEventListener('click', () => {
        const overlay = document.getElementById('overlay');
        overlay.classList.add('overlay-hidden'); // Apply the hidden class with opacity: 0
        setTimeout(function () {
            // Play the audio when the overlay is closed
            const audio = document.getElementById('myAudio');
            audio.play();
            overlay.remove();
        }, 2000);
    });