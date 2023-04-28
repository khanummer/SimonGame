let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0
let started = false;

// Handle Starting Game
$(document).keydown(function() {
    if (started === false) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    };
});

// Handle Button Click
$(".btn").click(function() {
    let userChosenColour = this.id
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
}) ;

// Handle Next Sequence / Level
function nextSequence() {
    userClickedPattern = [];
    let randomNumber = Math.floor((Math.random() * 4));
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut("fast").fadeIn("fast");
    playSound(randomChosenColour);
    
    // Attempt to show entire sequence 
    // for (let i = 0; i <= gamePattern.length; i++) {
            // setTimeout(function() {$("#" + gamePattern[i]).fadeOut("fast").fadeIn("fast")}, 1000)
            // console.log(i);
            // playSound(gamePattern[i]);
        // };
        
        level ++;
        $("#level-title").text("Level " + level);
};

// Checking Answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence(), 1000);
        };
    } else {
        let wrong = new Audio("sounds/wrong.mp3");
        var respp = wrong.play();
        if (respp!== undefined) {
            respp.then(_ => {
                // autoplay starts!
            }).catch(error => {
               //show error
            });
            };
        $("body").toggleClass("game-over");
        setTimeout(function() { $("body").toggleClass("game-over") }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    };
};

// Handle Restarting Game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// Handle Playing Sound
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    var resp = audio.play();
    if (resp!== undefined) {
    resp.then(_ => {
        // autoplay starts!
    }).catch(error => {
        //show error
    });
}
}

// Animate Button Press
function animatePress(currentColour) {
$("." + currentColour).toggleClass("pressed");
setTimeout(function() { $("." + currentColour).toggleClass("pressed") }, 100)
}

