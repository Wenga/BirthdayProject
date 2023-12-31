// Get a reference to the audio element and the button
var audio = document.getElementById("myAudio");
var audioButton = document.getElementById("audioButton");

//Add a click event listener to the button
audioButton.addEventListener("click", function() {
    if (audio.paused) {
        audio.play(); 
        audioButton.style.backgroundImage = './Textures/audioIcon.png';
        audioButton.style.opacity = 1;
    } else {
        audio.pause(); 
        audioButton.style.backgroundImage = './Textures/audioIcon.png';
        audioButton.style.opacity = 0.5;
    }
});
//Add fade in and fade out
const fadeInDuration = 3000; // Duration of the fade-in in milliseconds
const fadeOutDuration = 3000; // Duration of the fade-out in milliseconds

function fadeInAudio() {
  audio.volume = 0;
  let volume = 0;
  const fadeInterval = setInterval(function () {
      if (volume < 1) {
      volume += 0.03; 
        if (volume > 1) volume = 1; // Ensure volume doesn't go above 1
        audio.volume = volume;
      } else {
        clearInterval(fadeInterval);
      }
    }, fadeInDuration / 30); // Divide duration for smoothness
}

function fadeOutAudio() {
  let volume = audio.volume;
  const fadeInterval = setInterval(function () {
      if (volume > 0) {
          volume -= 0.03;
          if (volume < 0) volume = 0; // Ensure volume doesn't go below 0
          audio.volume = volume;
          } else {
            clearInterval(fadeInterval);
            audio.currentTime = 0;
            fadeInAudio();
      }
    }, fadeOutDuration / 30); // Divide duration for smoothness
}

audio.addEventListener('timeupdate', function () {
  if (audio.currentTime >= 17) { // Adjust the time as needed
    fadeOutAudio();
  }
});

