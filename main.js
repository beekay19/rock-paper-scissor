// const { json } = require("stream/consumers");

const choice = new Choice();
// import { choice } from "./choice";

// added event listener
document.querySelector(".open").addEventListener("click", open);
document.querySelector(".close").addEventListener("click", close);
document.addEventListener("DOMContentLoaded", gameStart);
document.querySelector(".play").addEventListener("click", play);

// var for local storage
let myScore;
let score 
if(localStorage.getItem('score') === null){
  score = 0
  localStorage.setItem('score',JSON.stringify(score))
}else{
  score = document.querySelector(".number").textContent = localStorage.getItem('score');
  // myScore = JSON.parse(localStorage.getItem('score'))
}


score = parseInt(score);
// functions
// function to close modal
function open() {
  document.querySelector(".modal").classList.add("modal-open");
}
// function to close modal
function close() {
  document.querySelector(".modal").classList.remove("modal-open");
}

// play again function
function play() {
  document.querySelector(".container").style.display = "grid";
  document.querySelector(".result-container").style.display = "none";
  const main = document.querySelectorAll(".to-delete");
  main.forEach((item) => {
    item.remove();
  });
}

// start game
function gameStart() {
  const scissor = document.querySelector(".scissor-main"),
    rock = document.querySelector(".rock-main"),
    paper = document.querySelector(".paper-main"),
    options = [rock, paper, scissor],
    list = ["rock", "paper", "scissor"];
  options.forEach((item) => {
    item.addEventListener("click", function (e) {
      let player = this.textContent.trim();
      let x = Math.floor(Math.random() * 3);
        // console.log(this)
      let computer = list[x];
      playGame(player, computer, this);
    });
  });

  function playGame(input, computer, key) {
    if (input === computer) {
      // computer data
      let comData = key.cloneNode(true);
      comData.className = `${key.className.split("-")[0]}-game to-delete`;
      //   player data
      let playerData = key.cloneNode(true);
      playerData.className = `${key.className.split("-")[0]}-game to-delete`;
      choice.tired(comData, playerData);
      time();
      message("draw");
      // console.log("tired");
    } else if (input === "paper") {
      if (computer === "scissor") {
        message("you lose");
        choice.scissor();
        choice.playerPaper();
        // console.log("computer wins scissor");
        time();
        if (score > 0) {
          score--;
          score = score;
          localStorage.setItem("score", JSON.stringify(score));
          myScore = JSON.parse(localStorage.getItem("score"));
          document.querySelector(".number").textContent = myScore;
        }
      } else {
        choice.playerPaper();
        choice.rock();
        // console.log("player wins paper");
        score++;
        score = score;
        localStorage.setItem("score", JSON.stringify(score));
        myScore = JSON.parse(localStorage.getItem("score"));
        document.querySelector(".number").textContent = myScore;
        time();
        message("you win");
      }
    } else if (input === "rock") {
      if (computer === "paper") {
        choice.paper();
        choice.playerRock();
        message("you lose");
        time();
        // console.log("computer wins paper");
        if (score > 0) {
          score--;
          score = score;
          localStorage.setItem("score", JSON.stringify(score));
          let myScore = JSON.parse(localStorage.getItem("score"));
          document.querySelector(".number").textContent = myScore;
        }
      } else {
        choice.playerRock();
        choice.scissor();
        // console.log("palyer wins rock");
        time();
        score++;
        score = score;
        localStorage.setItem("score", JSON.stringify(score));
        let myScore = JSON.parse(localStorage.getItem("score"));
        document.querySelector(".number").textContent = myScore;
        message("you win");
      }
    } else if (input === "scissor") {
      if (computer === "rock") {
        choice.rock();
        choice.playerScissor();
        // console.log("computer wins rock");
        time();
        message("you lose");
        if (score > 0) {
          score--;
          score = score;
          localStorage.setItem("score", JSON.stringify(score));
          let myScore = JSON.parse(localStorage.getItem("score"));
          document.querySelector(".number").textContent = myScore;
        }
      } else {
        choice.playerScissor();
        choice.paper();
        // console.log("player wins scissor");
        time();
        score++;
        score = score;
        localStorage.setItem("score", JSON.stringify(score));
        let myScore = JSON.parse(localStorage.getItem("score"));
        document.querySelector(".number").textContent = myScore;
        message("you win");
      }
    }
  }
}

function message(message) {
  document.querySelector(".status").textContent = `${message}`;
  // document.querySelector('.play').className = `play ${className}`
}

function time() {
  document.querySelector(".score-result").style.opacity = 0;
  setTimeout(() => {
    document.querySelector(".score-result").style.opacity = 1;
  }, 500);
}
