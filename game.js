const buttonArrays = ["red", "blue", "yellow", "green"];
let gamePattern = [];
let userClickedPattern = [];
const btn = document.querySelectorAll(".btn");
let level = 0;
const title = document.querySelector("#level-title");
//console.log(btn);

window.addEventListener("keypress", function (e) {
  // console.log(e.key);
  if (e.key === "a") {
    newSequence();
  }
});

const newSequence = () => {
  userClickedPattern = [];
  title.textContent = `Level ${level}`;
  level++;
  const randomNumber = Math.floor(Math.random() * 4);
  //console.log(randomNumber);

  const randomChosenColor = buttonArrays[randomNumber];
  // console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);

  //console.log(gamePattern);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
};
btn.forEach((item) => {
  item.addEventListener("click", () => {
    const userChosenColor = item.id;
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

const playSound = (val) => {
  let audio = new Audio(`./sounds/${val}.mp3`);
  audio.play();
};
// animate

function animatePress(currentColor) {
  const color = document.querySelector(`.${currentColor}`);
  color.classList.add("pressed");
  setTimeout(function () {
    color.classList.remove("pressed");
  }, 100);
}
// check answer
function checkAnswer(currentlevel) {
  console.log(currentlevel);
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    //console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        newSequence();
      }, 1000);
    }
  } else {
    //console.log("wrong");
    const body = document.querySelector("body");
    body.classList.add("game-over");
    setTimeout(function () {
      body.classList.remove("game-over");
    }, 200);
    gamePattern = [];
    level = 0;
    title.textContent = "Game over Press A key to start the game";
  }
  console.log(gamePattern);
  console.log(userClickedPattern);
}
