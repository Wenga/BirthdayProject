// Get a reference to the audio element and the button
var audio = document.getElementById("myAudio");
var audioButton = document.getElementById("audioButton");

// Add a click event listener to the button
audioButton.addEventListener("click", function() {
    if (audio.paused) {
        audio.play(); // Play the audio if it's paused
        audioButton.style.backgroundImage = './Textures/audioIcon.png';
        audioButton.style.opacity = 1;
    } else {
        audio.pause(); // Pause the audio if it's playing
        audioButton.style.backgroundImage = './Textures/audioIcon.png';
        audioButton.style.opacity = 0.5;
    }
});