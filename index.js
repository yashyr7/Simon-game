var buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;

$(document).keydown(() => {
  if (gameStart == false) {
    nextSequence();
    gameStart = true;
    $("#level-title").text("Level " + level);
  }
})

function nextSequence() {
  var n = Math.floor(Math.random() * 4);
  var chosenColor = buttonColors[n];
  gamePattern.push(chosenColor);
  $("#" + chosenColor).fadeOut(100).fadeIn(100);
  playSound(chosenColor);
  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").click(function () {
  var userColor = $(this).attr("id");
  userClickedPattern.push(userColor);
  animatePress(userColor);
  playSound(userColor);
  checkAnswer(userClickedPattern.length - 1);
})

function playSound (name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed")
  setTimeout(() => {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function startOver() {
  gameStart = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if(currentLevel === gamePattern.length - 1) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    console.log("wrong");
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over")
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log(gamePattern);
  }
}