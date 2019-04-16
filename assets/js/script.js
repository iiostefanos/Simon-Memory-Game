// Variables

var playerSeq = [];
var compSeq = [];
var active = false;
var id, color, lvl = 0; // id, color & lvl are all initialised at 0
var greenSound = document.getElementById("sound-green"); //for audio
var redSound = document.getElementById("sound-red");
var yellowSound = document.getElementById("sound-yellow");
var blueSound = document.getElementById("sound-blue");
var gameOverSound = document.getElementById("sound-lost");


// Initialising sequence.
$(document).ready(function() {
    $(".start-btn").on("click", function() {
        lvl = 0;
        compSeq = [];
        playerSeq = [];
        lvl++;
        startPlay();
    });
    
    $(".pad").on("click", function() {
        id = $(this).attr("id");
        color = $(this).attr("class").split(" ")[1];
        playerSeq.push(id);
        console.log(id+" "+color);
        addSoundClass(id, color);
        // Checking player sequence
        if (!PersonSequenceCheck()) {
            showError();
            playerSeq = [];
        }
        // End of Sequence
        if (playerSeq.length == compSeq.length) {
            lvl++;
            playerSeq = [];
            startPlay();
        }
    });
});

function showError() {
    console.log("Error!");
    var count = 0;
    var myError = setInterval(function() {
        $(".num-display").text("Error");
        
        count++;
        if (count == 3) {
            $(".num-display").text(lvl);
            clearInterval(myError);
            playerSeq = [];
            count = 0;
            gameOverSound.play();
        }
    }, 200);
};

// This checks to ensure Player Sequence is the same as Computer Sequence
function PersonSequenceCheck() {
    for(var i = 0; i < playerSeq.length; i++) {
        if (playerSeq[i] != compSeq[i]) {
            return false;
        }
    }
    return true;
}

// Computer Sequence.
function startPlay() {
    console.log(lvl);
    $(".num-display").text(lvl);
    getRandomNumber();
    var i = 0;
    var myInterval = setInterval(function () {
        id = compSeq[i];
        color = $("#"+id).attr("class").split(" ")[1];
        console.log(id+" "+color)
        addSoundClass(id, color);
        i++;
        if (i == compSeq.length) {
            i = 0;
            clearInterval(myInterval);
        }
    }, 800);
}

// A Random number is generated
function getRandomNumber() {
    var random = Math.floor(Math.random() * 4);
    compSeq.push(random);
}

// A Light & sound will be generated
function addSoundClass(id, color) {
    $("#"+id).addClass(color+"-light");
    blueSoundGenerate();
    setTimeout(function() {
      $("#"+id).removeClass(color+"-light");  
    }, 500);
}

function blueSoundGenerate() {
    blueSound.play();
};