let skyIndex = 0;
// Get a reference to the container div
var container = document.getElementById("selector-container");
container.style.alignItems = "center";

// Create a select element
var selectElement = document.createElement("select");
selectElement.id = "worldNumber";
selectElement.name = "worldNumber";

// Set the style properties for the select element
selectElement.style.appearance = "none";
selectElement.style.backgroundColor = "transparent"; 
selectElement.style.color = "white"; 
selectElement.style.border = "0.5px solid white";
selectElement.style.borderRadius="2"; 
selectElement.style.paddingLeft = "20px"; 
selectElement.style.paddingRight = "20px";
selectElement.style.paddingTop = "3px";
selectElement.style.paddingBottom = "3px"; 
selectElement.style.fontFamily = "'Chivo Mono', monospace";
selectElement.style.textShadow = "0px 0px 2px rgba(0, 0, 0, 0.5)";
selectElement.style.outline = "none"; 
selectElement.style.boxShadow = "inset 0px 0px 2px 0px rgba(0,0,0,0.3)";
 // Responsive sizes
 if (window.innerWidth <= 1000 && innerWidth/innerHeight < 1) {
    selectElement.style.fontSize = "3em";
} else {
    selectElement.style.fontSize = "1.25em"
}


const totalSceneCount = SceneSetUp.getInstance().getSceneCount();
const titles = SceneSetUp.getInstance().getSceneTitlesAll();

// Create an option for each number and add it to the select element
titles.forEach(function (title) {
    var option = document.createElement("option");
    //option.value = number.toLowerCase();
    option.textContent = title;
    selectElement.appendChild(option);
});

selectElement.addEventListener('change', function(){
    skyIndex = selectElement.value - 1;
});

// Create a text element
var textElement = document.createElement("span");
textElement.textContent = "/ " + totalSceneCount.toString();

// Apply style to the text element
textElement.style.paddingLeft = "10px"; 
textElement.style.fontFamily = "'Chivo Mono', monospace";
textElement.style.textShadow = " 0px 0px 2px rgba(0, 0, 0, 0.5)";
if (window.innerWidth <= 1000 && innerWidth/innerHeight < 1 ) {
    textElement.style.fontSize = "3em";
} else {
    textElement.style.fontSize = "1.25em";
}

// Append the select and text elements to the container
container.appendChild(selectElement);
container.appendChild(textElement);


// Menu
document.addEventListener("DOMContentLoaded", function() {
    const dropdownBtn = document.querySelector(".dropbtn");
    const dropdown = document.querySelector(".dropdown");

    dropdownBtn.addEventListener("click", function() {
        dropdown.classList.toggle("active");
    });

   // Add an event listener to the document to close the dropdown when clicking outside
   document.addEventListener("click", function(event) {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("active");
        }
    });
});

const previousButton = document.getElementById('PreviousButton');
const nextButton = document.getElementById('NextButton');
previousButton.addEventListener('click', function() {
  if (skyIndex > 0 )
  {
    --skyIndex;
    selectElement.value = skyIndex + 1;
  }
});

nextButton.addEventListener('click', function(){
  if (skyIndex < totalSceneCount - 1)
  {
    ++skyIndex;
    selectElement.value = skyIndex + 1;
  }
});