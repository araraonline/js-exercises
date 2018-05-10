// game

var roundNumber;
var guesses;
var selectedNumber;

const MESSAGE_SUCCESS = 'Congratulations! You got it right!';
const MESSAGE_GAME_OVER = '!!!GAME OVER!!!';
const MESSAGE_WRONG = 'Wrong!';
const MESSAGE_GUESS_TOO_LOW = 'Last guess was too low!';
const MESSAGE_GUESS_TOO_HIGH = 'Last guess was too high!';

var newgame = document.querySelector('.newgame');
var input = document.querySelector('input');
var submit = document.querySelector('.submit');
var guessesShow = document.querySelector('.guesses');
var message = document.querySelector('.message');
var lowhigh = document.querySelector('.lowhigh');

function generateNumber() {
    // generates a random number between 1 and 100
    return Math.floor(Math.random() * 100) + 1;
}

function startNewGame() {
    // starts a new game
    roundNumber = 1;
    selectedNumber = generateNumber();

    clearGuesses();
    hideMessage();
    hideLowHigh();
    enableInput();
    hideNewGame();
}

function makeGuess(guessedNumber) {
    // make a guess
    addGuess(guessedNumber);
    if (guessedNumber === selectedNumber) {
        // guess was right: finish game
        disableInput()
        displayMessage(MESSAGE_SUCCESS, 'green');
        hideLowHigh();
        showNewGame();
    } else {
        if (roundNumber < 10) {
            // guess was wrong: next round
            displayMessage(MESSAGE_WRONG, 'red');
            if (guessedNumber < selectedNumber) {
                displayLowHigh('low');
            } else {
                displayLowHigh('high');
            }
            roundNumber++;
        } else {
            // guess was right: finish game
            disableInput();
            displayMessage(MESSAGE_GAME_OVER, 'red');
            hideLowHigh();
            showNewGame();
        }
    }
    clearInput();
}

// game interface functions

// Note: All elements start visible. They are added and removed
// from the page flow via javascript.

function addGuess(guess) {
    // add guess to guesses list and display it
    guesses.push(guess);
    guessesShow.textContent = guesses.join(' ');
    guessesShow.style.display = '';
}

function clearGuesses() {
    // clear guesses and hide the element that shows them
    guesses = [];
    guessesShow.style.display = 'none';
}

function displayMessage(text, color) {
    // displays a message
    message.textContent = text;
    message.style.backgroundColor = color;
    message.style.display = '';
}

function hideMessage() {
    // hide the message element
    message.style.display = 'none';
}

function enableInput() {
    // enable input and submit button
    input.disabled = false;
    submit.disabled = false;
}

function disableInput() {
    // disable input and submit button
    input.disabled = true;
    submit.disabled = true;
}

function displayLowHigh(lowOrHigh) {
    if (lowOrHigh == 'low') {
        lowhigh.textContent = MESSAGE_GUESS_TOO_LOW;
    } else {
        lowhigh.textContent = MESSAGE_GUESS_TOO_HIGH;
    }
    lowhigh.style.display = '';
}

function hideLowHigh() {
    // hide low/high message
    lowhigh.style.display = 'none'
}

function showNewGame() {
    // show new game button
    newgame.style.display = '';
}

function hideNewGame() {
    // hide new game button
    newgame.style.display = 'none'
}

function clearInput() {
    // clear input text
    input.value = '';
}


// listeners

submit.addEventListener('click', function() {
    guess = parseFloat(input.value);
    if (!Number.isInteger(guess) ||
        !(guess >= 1 && guess <= 100)) {
        // input must be an integer between 1 and 100
        window.alert("Please enter a whole number from 1 to 100");
        clearInput();
        return;
    }
    makeGuess(guess);
});

newgame.addEventListener('click', startNewGame);


// initialize

startNewGame()
