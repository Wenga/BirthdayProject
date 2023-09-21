// Get a reference to the container div
var container = document.getElementById("selector-container");

// Create a select element
var selectElement = document.createElement("select");
selectElement.id = "programmingLanguages";
selectElement.name = "programmingLanguages";

// Array of programming languages
var languages = ["JavaScript", "Python", "Java", "C#", "Ruby", "PHP"];

// Create an option for each programming language and add it to the select element
languages.forEach(function (language) {
    var option = document.createElement("option");
    option.value = language.toLowerCase();
    option.textContent = language;
    selectElement.appendChild(option);
});

// Add the select element to the container div
container.appendChild(selectElement);