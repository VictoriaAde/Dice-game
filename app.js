/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his CURRENT score
- BUT, if the player rolls a 1, all his CURRENT score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his CURRENT score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
//declaring our variables
let scores, cuurentScore, activePlayer, gamePlaying;
initializ();

let lastDice;


///////////////////////// ROLL DICE BTN //////////////////////////////
document.querySelector(".btn-roll").addEventListener("click", function () {

    if (gamePlaying) {
        //1.add a random number
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        //2.Display the result
        let diceDOM1 = document.querySelector(".dice1");
        let diceDOM2 = document.querySelector(".dice2");

        //display dice image on click event 
        diceDOM1.style.display = "block";
        diceDOM2.style.display = "block";


        //display dice img using random numbers
        diceDOM1.src = "dice-" + dice1 + ".png";
        diceDOM2.src = "dice-" + dice2 + ".png";     


        //3.Update the round score IF the rolled number was not a 1
        if (dice1 !== 1 && dice2 !== 1) {
            //add score
            //currentScore = currentScore + dice;
            currentScore += dice1 + dice2;
            document.querySelector("#current-" + activePlayer).textContent = currentScore;
        }  else {
            nextplayer();
        }

        // if (dice === 6 && lastDice === 6) {
        //     //player looses the entire score
        //     scores[activePlayer] = 0;
        //     document.querySelector("#score-" + activePlayer).textContent = "0";
        //     nextplayer(); 
        // } else if (dice !== 1) {
        //     //add score
        //     //currentScore = currentScore + dice;
        //     currentScore += dice;
        //     document.querySelector("#current-" + activePlayer).textContent = currentScore;
        // } else {
        //     nextplayer();
        // }
        // lastDice = dice;

    }
});

//////////////////////// HOLD BTN //////////////////////////////////////
document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gamePlaying) {
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += currentScore;
        //find out why its working like this 
        // scores[activePlayer] = scores[activePlayer] = currentScore;
        //AND NOT LIKE THIS
        // scores[activePlayer] = scores[activePlayer] + currentScore;

        //Update UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        //read score from input field
        let inputValue = document.getElementById("input-id").value;
        let winningScore;
        if(inputValue){
            winningScore = inputValue;
        } else{
            winningScore  = 100;
        }



        //Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner";
            document.querySelector(".dice1").style.display = "none";
            document.querySelector(".dice2").style.display = "none";

            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            nextplayer();
        }
    }
    // when BTN=hold ia clicked then its the next player's turn 
})

function nextplayer() {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    currentScore = 0;


    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";


    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    // document.querySelector(".player-0-panel").classList.remove("active");
    // document.querySelector(".player-1-panel").classList.add("active");
    document.querySelector(".dice1").style.display = "none";
    document.querySelector(".dice2").style.display = "none";


}

document.querySelector(".btn-new").addEventListener("click", initializ);


function initializ() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //Hide the dice image on page load
    document.querySelector(".dice1").style.display = "none";
    document.querySelector(".dice2").style.display = "none";


    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");

}


//changing text in HTML element and in this case we say it's a setter because we are getting the value from our html
//document.querySelector("#current-" + activePlayer).textContent = dice;

//write HTML from our JS code
//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>"

//read element from HTML, in this case we say its a getting, because we are actually getting the value from our HTML
//var x = document.querySelector("#score-0").textContent;
//console.log(x);
