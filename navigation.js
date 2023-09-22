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
selectElement.style.fontFamily = "'Cutive Mono', monospace";
selectElement.style.fontSize = "1.25em"
selectElement.style.textShadow = "1px 1px 6px rgba(0, 0, 0, 0.3)";
selectElement.style.outline = "none"; 
selectElement.style.boxShadow = "inset 0px 0px 5px rgba(0, 0, 0, 0.1)";

// Array 
var number = ["1", "2", "3", "4", "5", "6"];

// Create an option for each number and add it to the select element
number.forEach(function (number) {
    var option = document.createElement("option");
    option.value = number.toLowerCase();
    option.textContent = number;
    selectElement.appendChild(option);
});

// Create a text element
var textElement = document.createElement("span");
textElement.textContent = "/ 30";

// Apply style to the text element
textElement.style.paddingLeft = "10px"; 
textElement.style.fontFamily = "'Cutive Mono', monospace";
textElement.style.fontSize = "1.25em";
textElement.style.textShadow = "1px 1px 10px rgba(0, 0, 0, 0.3)";

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