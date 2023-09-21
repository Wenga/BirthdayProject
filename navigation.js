// Get a reference to the container div
var container = document.getElementById("selector-container");

// Create a select element
var selectElement = document.createElement("select");
selectElement.id = "worldNumber";
selectElement.name = "worldNumber";

// Array 
var number = ["1", "2", "3", "4", "5", "6"];

// Create an option for each number and add it to the select element
number.forEach(function (number) {
    var option = document.createElement("option");
    option.value = number.toLowerCase();
    option.textContent = number;
    selectElement.appendChild(option);
});

// Add the select element to the container div
container.appendChild(selectElement);