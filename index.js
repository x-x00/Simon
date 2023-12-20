var buttonColors = Array("box1", "box2", "box3", "box4");
var gamePattern = [];
var audioElement = new Audio();
var userClickedPattern = [];
var firstKeyPress = false;
var level = 0;

// playSound("SpookyMelody");

$(".btn").on("click", function (e) {
  if (firstKeyPress) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  }
  // $(this).fadeToggle(100).fadeToggle(100);
});

$(document).on("keydown", function (e) {
  if (!firstKeyPress) {
    nextSequence();
    firstKeyPress = true;
  }
});

function nextSequence() {
  userClickedPattern = [];

  var r = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[r];
  gamePattern.push(randomChosenColor);
  var chosenButton = $("#" + randomChosenColor);
  chosenButton.fadeToggle(150).fadeToggle(150);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
}

function checkAnswer(currentLevel) {
  if (
    userClickedPattern[currentLevel] === gamePattern[currentLevel]
  ) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("game over");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 300);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
    level = 0;
    firstKeyPress = false;
    userClickedPattern = [];
    gamePattern = [];
    // $("#level-title").text("Press A Key to Start");
}

function playSound(name) {
  audioElement.src = "./sounds/" + name + ".mp3";
  audioElement.play();
}

function animatePress(currentColor) {
  var thePressedButton = $("#" + currentColor);
  var delayInMilliseconds = 100;
  thePressedButton.addClass("pressed");
  setTimeout(function () {
    thePressedButton.removeClass("pressed");
  }, delayInMilliseconds);
}


