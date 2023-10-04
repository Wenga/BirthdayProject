// Get a reference to the audio element and the button
var audio = document.getElementById("myAudio");
var audioButton = document.getElementById("audioButton");

//Add a click event listener to the button
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
//Add fade in and fade out
const fadeInDuration = 2000; // Duration of the fade-in in milliseconds
const fadeOutDuration = 3000; // Duration of the fade-out in milliseconds

function fadeInAudio() {
audio.volume = 0;

let volume = 0;
const fadeInterval = setInterval(function () {
    if (volume < 1) {
    volume += 0.05; // Adjust the increment for desired speed
    if (volume > 1) volume = 1; // Ensure volume doesn't go above 1
    audio.volume = volume;
  } else {
    clearInterval(fadeInterval);
  }
}, fadeInDuration / 20); // Divide duration by 20 for smoothness
}

function fadeOutAudio() {
let volume = audio.volume;
const fadeInterval = setInterval(function () {
    if (volume > 0) {
        volume -= 0.05;
        if (volume < 0) volume = 0; // Ensure volume doesn't go below 0
        audio.volume = volume;
      } else {
        clearInterval(fadeInterval);
      audio.currentTime = 0;
      audio.volume = 1; // Reset the volume to its original value
      audio.play(); // Start the audio again for the next loop
    }
  }, fadeOutDuration / 20); // Divide duration by 20 for smoothness
}

audio.addEventListener('timeupdate', function () {
  // Check if the audio has reached the end of the loop (e.g., after 10 seconds)
  if (audio.currentTime >= 10) { // Adjust the time as needed
    fadeOutAudio();
  }
});

// Start the initial fade-in
fadeInAudio();
console.log("fadein1");


