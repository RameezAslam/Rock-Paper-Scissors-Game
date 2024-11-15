
let score = JSON.parse(localStorage.getItem('score'));
if (score === null)
  score = {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

 document.querySelector('.js-rock-button')
 .addEventListener('click', () => {
    playGame('Rock');
 });

 document.querySelector('.js-paper-button')
 .addEventListener('click', () => {
    playGame('Paper');
 });

 document.querySelector('.js-scissors-button')
 .addEventListener('click', () => {
    playGame('Scissors');
 });

 document.querySelector('.js-auto-button')
 .addEventListener( 'click', () =>{
    autoPlay();
 }); 

 document.body.addEventListener('keydown' , (event) => {
    if(event.key === 'r'){
        playGame('Rock');
    }if(event.key === 'p'){
        playGame('Paper')
    }if(event.key === 's'){
        playGame('Scissors');
    }if(event.key === 'a'){
        autoPlay();
    }if(event.key === 'Backspace'){
        showConfirmationMessage();
    }
 })
 
 let isAutoPlaying = false;
 let intervalID;

 function autoPlay() {
    if(!isAutoPlaying) {
    intervalID = setInterval(function () {
        const playerMove = pickComputerMove();
        playGame(playerMove);
    },1000);

    isAutoPlaying =true;
    document.querySelector('.js-auto-button')
    .innerHTML = 'Stop Playing'

 } else{
    clearInterval(intervalID);
    isAutoPlaying =false;

    document.querySelector('.js-auto-button')
    .innerHTML = 'Auto Play'
 }
 }
  
function playGame (playerMove) {
    const computerMove = pickComputerMove();
    
    let result = '';
    if(playerMove === 'Rock') {

        if(computerMove === 'Scissors'){
            result = 'You win';
        }else if(computerMove === 'Paper'){
            result = 'You lose';
        }else if(computerMove === 'Rock'){
            result = 'Tie'
        }
    }else if( playerMove === 'Paper'){

        if(computerMove === 'Scissors'){
            result = 'You lose';
        }else if(computerMove === 'Rock'){
            result = 'You win';
        } else if( computerMove === 'Paper'){
            result = 'Tie'
        }
    } else if ( playerMove === 'Scissors'){

        if(computerMove === 'Rock'){
            result = 'You lose';
        }else if (computerMove === 'Paper'){
            result = 'You win';
        }else if(computerMove === 'Scissors'){
            result = 'Tie';
        }
    }

    if(result === 'You win'){
        score.wins+= 1;
    }else if(result === 'You lose'){
        score.losses+= 1;
    }else if (result === 'Tie'){
        score.ties+= 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result')
 .innerHTML = result;

 document.querySelector('.js-moves')
 .innerHTML = `You
   <img src="images/${playerMove}-emoji.png" class="button"> 
    <img src="images/${computerMove}-emoji.png" class="button"> 
   Computer
 `
}


 function updateScoreElement() {
   document.querySelector('.js-result-score')
   .innerHTML = `Wins:${score.wins} , Losses:${score.losses}, Ties:${score.ties}`;
 }
 
function pickComputerMove () {
    const randomNumber = Math.random();

    let computerMove = '';

    if(randomNumber >=0 && randomNumber < 1/3){
        computerMove = 'Rock';
    } else if(randomNumber >=1/3 && randomNumber < 2/3){
        computerMove = 'Paper';
    } else if(randomNumber >= 2/3 && randomNumber < 1){
        computerMove = 'Scissors';
    }
    return computerMove;
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}

document.querySelector('.js-reset-button')
.addEventListener('click', () => {
    showConfirmationMessage();
});

function showConfirmationMessage() {
    document.querySelector('.js-reset-score')
    .innerHTML = `
    Are you sure you want to reset the score?
    <button class="js-reset-yes-button confirmation-reset-button">
     Yes
     </button>
    <button class="js-reset-no-button confirmation-reset-button">
     No
     </button>
    `;

    document.querySelector('.js-reset-yes-button')
    .addEventListener('click', () => {
        resetScore();
        hideConfirmationMessage();
    });

    document.querySelector('.js-reset-no-button')
    .addEventListener('click', () => {
        hideConfirmationMessage();
    });
    
}

function hideConfirmationMessage() {
    document.querySelector('.js-reset-score')
    .innerHTML = '';
}