document.getElementById("submitButton").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default form submission
    doSomething();
});

function doSomething() {
    console.log("Button clicked, performing action...");
    document.getElementById("heading").innerHTML = "Hello, World!";
}