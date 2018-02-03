var colors = [];
var numSquares = 6;
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorToGuess = document.querySelector("#colorToGuess");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
colorToGuess.textContent = pickedColor;
var resetBtn = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init() {
    // Mode buttons
    setModeButtons();
    // Set up initial square colors
    setUpInitialSquares();
    // Reset what we see
    reset();
}

function setModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        })
    }
}

function setUpInitialSquares() {
    for (var i = 0; i < squares.length; i++) {
        // squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener("click", function () {
            var currentSquare = this.style.backgroundColor;
            if (currentSquare === pickedColor) {
                messageDisplay.textContent = "Correct!"
                changeColor();
                resetBtn.textContent = "Play Again?";
            }
            else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again!";
            }
        });
    }
}

// Changes each square to be color of the correct color we want
function changeColor() {
    h1.style.background = pickedColor;
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = pickedColor;
    }
}
// Picks a random color to be the color to find
function pickColor() {
    var randomNum = (Math.random() * colors.length);
    randomNum = Math.floor(randomNum);
    return colors[randomNum];
}
// Generate 6 random colors
function generateRandomColors(maxColors) {
    var randomColors = [];
    for (var i = 0; i < maxColors; i++) {
        randomColors.push("rgb(" + generateRGBValue() + ", " +
            generateRGBValue() + ", " + generateRGBValue() + ")");
    }
    return randomColors;
}
//Generate values between 0 and 255
function generateRGBValue() {
    return Math.floor((Math.random() * 256));
}

resetBtn.addEventListener("click", function () {
    reset();
});

//Updates the square colors after reset or mode change
function changeSquareColors() {
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        else {
            squares[i].style.display = "none";
        }
    }
}

//Resets the game
function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorToGuess.textContent = pickedColor;
    changeSquareColors();
    h1.style.backgroundColor = "steelblue";
    resetBtn.textContent = "Change Colors";
    messageDisplay.textContent = "";
}