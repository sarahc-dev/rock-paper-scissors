const options = ["rock", "paper", "scissors"];

let gameChoice = "";
let userChoice = "";

document.querySelectorAll(".game-choice").forEach((button) => {
    button.addEventListener("click", () => {
        document.querySelector(".user-choice").appendChild(button);
    })
})

function newGame() {
   

    let randomNumber = Math.floor(Math.random() * 3);
    gameChoice = options[randomNumber];
    let computerImg = "./images/icon-" + gameChoice + ".svg";

    document.querySelector(".computer-choice").setAttribute("src", computerImg);
    document.querySelector(".computer-choice").setAttribute("alt", gameChoice);
    
}

