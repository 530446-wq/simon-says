let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

const colors = ["green", "red", "yellow", "blue"];


$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  const userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userPattern.length - 1);
});


function nextSequence() {
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  

  const randomColor = colors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}


function playSound(color) {
  const audio = new Audio("https://www.soundjay.com/button/beep-07.wav"); 
  audio.play();
}


function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  playSound("wrong");

  gamePattern = [];
  userPattern = [];
  level = 0;
  started = false;
}
