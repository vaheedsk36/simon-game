let gamePattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (
      gamePattern[gamePattern.length - 1] ===
      userClickedPattern[userClickedPattern.length - 1]
    ) {
      console.log("success");
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press 'R' to Restart");
    $(document).keydown((e) => {
      if (e.key === "r" || e.key === "R") {
        $("body").removeClass("game-over");
        startOver();
      }
    });
  }
};

const nextSequence = () => {
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  console.log(gamePattern);
};

$(document).keydown((e) => {
  if (e.key === "s" || e.key === "S") {
    nextSequence();
  }
});

const playSound = (fileName) => {
  let music = new Audio(`sounds/${fileName}.mp3`);
  music.play();
};

const animatePress = (currentColour) => {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  $("#level-title").text("Press S Key to Start");
}
