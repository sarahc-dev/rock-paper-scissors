const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const options = ["rock", "paper", "scissors"];
const widthQuery = window.matchMedia("(min-width: 600px)");

let gameChoice = "";
let userChoice = "";

let score = sessionStorage.getItem("score");

if (score == null) {
    $("h2").innerHTML = 0;
} else {
    $("h2").innerHTML = score;
}

$$(".circle-btn-outer").forEach((button) => {
    button.addEventListener("click", () => {
        userChoice = button.getAttribute("value");
        newGame();
    })
})

function newGame() {

   $(".game").style.background = "none";
   $(".bottom-btns").classList.add("hidden");
   $(".scissors-outer").classList.add("hidden");
   $(".opaque-circle").classList.remove("hidden");

    let userBtn = userChoice + "-outer";
    let newImg = "./images/icon-" + userChoice + ".svg";

    $(".circle-btn-outer").classList.replace("paper-outer", userBtn);
    $(".circle-btn").classList.replace("paper", userChoice);
    $(".btn-img").setAttribute("src", newImg);
    $(".btn-img").setAttribute("alt", userChoice);

   const youPicked = document.createElement("h3");
   youPicked.textContent = "You picked";
   const housePicked = document.createElement("h3");
   housePicked.textContent = "The house picked";
   housePicked.className = "house";

   if (widthQuery.matches === false) {
       $(".circle-btn-outer").appendChild(youPicked);
       $(".circle-btn-outer").disabled = true;
       $(".opaque-circle").appendChild(housePicked);
   } else {
       let parent = $(".circle-btn-outer").parentNode;
       parent.insertBefore(youPicked, $(".circle-btn-outer"));
    $(".circle-btn-outer").disabled = true;
    $("h3").append(housePicked);
   }

   setTimeout(() => {
    housePicks();
}, 1000);
}

function housePicks() {

    let randomNumber = Math.floor(Math.random() * 3);
    gameChoice = options[randomNumber];

    let houseBtn = gameChoice + "-outer";
    let houseImg = "./images/icon-" + gameChoice + ".svg";

    $(".opaque-circle").classList.add("hidden");
    $("[value='scissors']").classList.remove("hidden");

    if (gameChoice !== "scissors") {
        $("[value='scissors']").classList.replace("scissors-outer", houseBtn);
        $("[value='scissors'] .circle-btn").classList.replace("scissors", gameChoice);
        $("[value='scissors'] .circle-btn .btn-img").setAttribute("src", houseImg);
        $("[value='scissors'] .circle-btn .btn-img").setAttribute("alt", gameChoice);
    }

    setTimeout(() => {
        whoWins();
    }, 1000);
    
}

function whoWins() {

    let newScore = 0;

    $(".result").classList.remove("hidden");
   
    if (userChoice == gameChoice) {
        $("h1").innerHTML = "Draw";
        newScore = parseInt(score, 10);
    } else if ((userChoice == "paper" && gameChoice == "rock") || (userChoice == "scissors" && gameChoice == "paper") || (userChoice == "rock" && gameChoice == "scissors")) {
        $("h1").innerHTML = "You win";
        
        if (score == null) {
            sessionStorage.setItem("score", "1");
            newScore = 1;
        } else {
            newScore = parseInt(sessionStorage.getItem("score"), 10);
            newScore++; 
        } 
    } else {
        if (score == null) {
            sessionStorage.setItem("score", "-1");
            newScore = -1;
        } else {
            newScore = parseInt(sessionStorage.getItem("score"), 10);
            newScore--;
        }
    }
    
    sessionStorage.setItem("score", JSON.stringify(newScore));
            
    $("h2").innerHTML = newScore;


    $(".play-again").addEventListener("click", () => {
        location.reload();
    })
}
    

    


