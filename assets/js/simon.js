// Variables

let sequence = [];
let playerSequence = [];
let light, turn, correct, compTurn, intervalId, win;
let strictMode = true;
let sound = true;

// Buttons, number displays, pads & modals targetted as variables using JQuery.

const numDisplay = document.getElementById("number-counter");
const greenPad = document.getElementById("0");
const redPad = document.getElementById("1");
const yellowPad = document.getElementById("2");
const bluePad = document.getElementById("3");
const startButton = document.getElementById("start");
const strictButton = document.getElementById("strict");
const startModal = document.getElementById("start-modal-button");
const startWinModal = document.getElementById("start-modal-win-button");
const loseModalDisplay = document.getElementById("lose-modal-display");
const winModalDisplay = document.getElementById("win-modal-display");

// Whatever code is written inside the JQuery ready method will run once the page Document Object Modal (DOM) is ready to execute JavaScript code.

$(document).ready(function() {
    
    /*
    JQuery function to check to see if strict slider is true or false when the slider is clicked.
    If strict mode is true, it will return everything back to default setting ready to begin a new game.
    */

    $(strictButton).on("click", function() {
        if (strictButton.checked == true) {
            strictMode = true;
            turn = 1;
            $(".pad").addClass('disabled');
            clearInterval(intervalId);
            if ($(numDisplay).text() == "-") {
                $(numDisplay).text("-");
            } else {
                $(numDisplay).text("0");
            }
            setTimeout(function() {
                clearColor();
            }, 600);
        }
        else {
            strictMode = false;
        }
    });

    // JQuery function to initialise game when start button is clicked.

    $(startButton).on("click", function() {
        clearInterval(intervalId);
        play();
    });

    // JQuery function to initialise game when start button in score modal is clicked.

    $(startModal).on("click", function() {
        clearInterval(intervalId);
        play();
    });

    // JQuery function to initialise game when start button in win modal is clicked.

    $(startWinModal).on("click", function() {
        clearInterval(intervalId);
        play();
    });

    // JQuery function to allow modal scroll icon to scroll down upon click.

    $('.modal-scroll').on('click', function(e) {
        var linkHref = $(this).attr('href');
        e.preventDefault();
        $('.modal-body').animate({
            scrollTop: $(linkHref).offset().top
        }, 1000);
    });

    /* 
    Events taking place when each of the pads are clicked using JQuery.
    On click on each of the pads, it will push a number into the player sequence array depending on which has been clicked.
    It then runs a light & sound function depending on colour.
    Then it will clear colour after a set time.
    */

    $(greenPad).on("click", function() {
        playerSequence.push(1);
        check();
        green();
        if (!win) {
            setTimeout(function() {
                clearColor();
            }, 300);
        }
    });

    $(redPad).on("click", function() {
        playerSequence.push(2);
        check();
        red();
        if (!win) {
            setTimeout(function() {
                clearColor();
            }, 300);
        }
    });

    $(yellowPad).on("click", function() {
        playerSequence.push(3);
        check();
        yellow();
        if (!win) {
            setTimeout(function() {
                clearColor();
            }, 300);
        }
    });

    $(bluePad).on("click", function() {
        playerSequence.push(4);
        check();
        blue();
        if (!win) {
            setTimeout(function() {
                clearColor();
            }, 300);
        }
    });
});

// Default play setting. This targets the game play so that is ready to begin a new sequence.

function play() {
    win = false;
    sequence = [];
    playerSequence = [];
    getRandomNumber();
    light = 0;
    intervalId = 0;
    turn = 1;
    $(numDisplay).text("0");
    correct = true;
    compTurn = true;
    intervalId = setInterval(gameTurn, 800);
}

function getRandomNumber() {
    sequence.push(Math.floor(Math.random() * 4) + 1);
    console.log(sequence);
}

/* 
An action taking place whether it's the player's turn or the computer's turn.
When the amount of flashes then matches the turn number. The computer sequence stops, ensures all colours are cleared & sequence is logged to the console.
Whilst the computer is producing a sequence, it checks sequence light id & applies the light & sound function to each one accordingly.
A disable class is added to the timeout using JQuery to stop any clicking action on the pads whilst computer is generating a sequence.
The disable class is then removed after a set time which then allows player to then click.
*/

function gameTurn() {
    if (light == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
    }
    else if (compTurn) {
        clearColor();
        setTimeout(function() {
            if (sequence[light] == 1) green();
            if (sequence[light] == 2) red();
            if (sequence[light] == 3) yellow();
            if (sequence[light] == 4) blue();
            light++;
            $(".pad").addClass('disabled');
        }, 300);
    }
    setTimeout(function() {
        $(".pad").removeClass('disabled');
    }, 299);
}

/* 
Sounds & Lights being generated for each color.
This is done by selecting the sound through JQuery & running a play function.
Also, a class is added through JQuery to give it the light effect.
*/

function green() {
    if (sound) {
        let audio = document.getElementById("sound-green");
        audio.currentTime = 0;
        audio.play();
    }
    sound = true;
    $(greenPad).addClass("green-light");
}

function red() {
    if (sound) {
        let audio = document.getElementById("sound-red");
        audio.currentTime = 0;
        audio.play();
    }
    sound = true;
    $(redPad).addClass("red-light");
}

function yellow() {
    if (sound) {
        let audio = document.getElementById("sound-yellow");
        audio.currentTime = 0;
        audio.play();
    }
    sound = true;
    $(yellowPad).addClass("yellow-light");
}

function blue() {
    if (sound) {
        let audio = document.getElementById("sound-blue");
        audio.currentTime = 0;
        audio.play();
    }
    sound = true;
    $(bluePad).addClass("blue-light");
}

// This returns all of the colours back to their original state from being flashed by removing class name through JQuery. 

function clearColor() {
    $(greenPad).removeClass("green-light");
    $(redPad).removeClass("red-light");
    $(yellowPad).removeClass("yellow-light");
    $(bluePad).removeClass("blue-light");
}

// This will flash all of the colours at the same time using JQuery.

function lightAllColors() {
    $(greenPad).addClass("green-light");
    $(redPad).addClass("red-light");
    $(yellowPad).addClass("yellow-light");
    $(bluePad).addClass("blue-light");
}

/* 
Function to order game over modal to appear with final score.
This will show the modal & show the final score using JQuery.
*/

function displayModal() {
    $('#loseModal').modal('show');
    $(loseModalDisplay).text((turn) - 1);
}

/*
This function checks to see if:
- The player followed a sequence incorrectly.
- The player has reached the sequence 20 when strict mode is active.
- If correct is false.
- If Strict mode is active & a game has been lost.
- If player sequence matches turn count & is correct.
*/
function check() {
    // If player sequence is not the same as computer sequence, correct will return as false.
    if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
        correct = false;
    }
    // If player is in strict mode reaches level 20, you will win the game, the win function will run & each pad will be disabled.
    if (playerSequence.length == 20 && correct && strictButton.checked == true) {
        $(".pad").addClass('disabled');
        winGame();
    }
    // If correct is false, this will mean you've lost & you will get back "Lose!" in the number display.
    if (correct == false) {
        lightAllColors();
        $(numDisplay).text("Lose!");
        sound = false;
        // A lose sound with a flashing of all of the lights will be produced.
        let audio = document.getElementById("sound-lost");
        audio.currentTime = 0;
        audio.play();
        // Pads are also disabled using JQuery.
        $(".pad").addClass('disabled');
        //A timeout has been set up on lose for after 800 milliseconds. which will clear all colours & display the turn number as your score in the number display.
        setTimeout(function() {
            $(numDisplay).text((turn) - 1);
            clearColor();
            if (strictMode) {
                $(".pad").addClass('disabled');
                displayModal();
            }
            else {
                compTurn = true;
                light = 0;
                playerSequence = [];
                correct = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);
    }
    // If player sequence matches turn count & is correct then, turn count will increase by 1, an extra number is added to sequence array & will begin the computer sequence again.
    else if (turn == playerSequence.length && correct && !win) {
        turn++;
        playerSequence = [];
        getRandomNumber();
        compTurn = true;
        light = 0;
        $(numDisplay).text((turn) - 1);
        $(".pad").addClass('disabled');
        intervalId = setInterval(gameTurn, 800);
    }
}

// This is called when the player wins the game. This will display "WIN!" in the number display a win modal with the maximum score.

function winGame() {
    clearInterval(intervalId);
    lightAllColors();
    turn++;
    $(numDisplay).text(turn - 1);
    setTimeout(function() {
        $(numDisplay).text("WIN!");
        setTimeout(function() {
            $(winModalDisplay).text(turn - 1);
            $('#winModal').modal('show');
            let audio = document.getElementById("sound-win");
            audio.currentTime = 0;
            audio.play();
        }, 600);
    }, 600);
}
