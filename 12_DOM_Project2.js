let score = JSON.parse(localStorage.getItem('score')) ||
{
    win: 0,
    lose: 0,
    tie: 0
};            
updateScore();    
function ComputerMove(){
    let computerMove = '';
    variable = Math.random();            
    if(variable >= 0 && variable < 1/3) computerMove = 'rock';
    else if(variable >= 1/3 && variable < 2/3) computerMove = 'paper';
    else if(variable >= 2/3 && variable < 1) computerMove = 'scissors';
    return computerMove;
}                
function compareUser(player){
    let result = '';
    let computerMove = ComputerMove();

    if(computerMove === player){
        result = 'Tie.';                
    }else{
        if(player === 'rock'){
            result = (computerMove === 'scissors')? 'Win.' : 'Lose.';
        }else if(player === 'paper'){
            result = (computerMove === 'rock')?'Win.': 'Lose.';
        }else{
            result = (computerMove === 'paper')?  'Win.' : 'Lose.';
        }
    }
    if(result === 'Win.') score.win += 1;
    else if(result === 'Lose.') score.lose += 1;
    else if(result === 'Tie.') score.tie += 1;

    //This helps to save our score into localStorage.
    localStorage.setItem('score', JSON.stringify(score));

    updateResult(result); 
    updateMove(player, computerMove);
    updateScore();                
    // alert(`You picked ${player}. Computer picked ${computerMove}. ${result}\n` +
    //`Win: ${score.win}, Lose: ${score.lose}, Tie: ${score.tie}`);                     
}

function resetScore(){
    score.win = 0;
    score.lose = 0;
    score.tie = 0;                
    localStorage.removeItem('score');                
    alert('You have reset your scores:\n' + `Win: ${score.win}, Lose: ${score.lose}, Tie: ${score.tie}`);
}

function updateScore(){
    document.querySelector('.Score').innerHTML = `Win: ${score.win}, Lose: ${score.lose}, Tie: ${score.tie}`;  
}
function updateResult(result){                
    document.querySelector('.Result').innerHTML = `You ${result}`;
}        
function updateMove(player, computer){
    document.querySelector('.Moves').innerHTML =
    `You <img src="${player}.png" class="moves-icon" >
    <img src="${computer}.png" class="moves-icon"> computer`;
}
let isAutoPlaying = false;
let intervalId;

function autoPlay(){      
    if(!isAutoPlaying)  {
        intervalId = setInterval(() => {
            const playerMove = ComputerMove();
            compareUser(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else{
        clearInterval(intervalId);
        isAutoPlaying = false;
    }   
}

const rockButton = document.querySelector('.rock-button');
rockButton.addEventListener('click', () => {
    compareUser('rock');
});

const paperButton = document.querySelector('.paper-button');
paperButton.addEventListener('click', () => {
    compareUser('paper');
});

const scissorsButton = document.querySelector('.scissors-button');
scissorsButton.addEventListener('click', () => {
    compareUser('scissors');
});

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r') compareUser('rock');
    else if(event.key === 'p') compareUser('paper');
    else if(event.key === 's') compareUser('scissors');
});