// Variables

let sequence = [];
let playerSequence = [];
let light;
let turn;
let correct;
let compTurn;
let intervalId;
let strictMode = false;
let sound = true;

// Clickable buttons & pads targetted as variables
const greenPad = document.getElementById("0");
const redPad = document.getElementById("1");
const yellowPad = document.getElementById("2");
const bluePad = document.getElementById("3");
const startButton = document.getElementById("start");
const strictButton = document.getElementById("strict")

// Event Listener checks to see if strict slider is true or false
strictButton.addEventListener('click', (event) => {
    if (strictButton.checked == true) {
        strict = true;
    } else {
        strict = false;
    }
});