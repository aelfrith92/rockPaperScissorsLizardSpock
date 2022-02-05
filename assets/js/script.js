/**
* It adds the hovering effect to the svg file, which cannot be styled via CSS
*/
function hoverButtons (){
	let buttons = document.getElementsByClassName('commandButton');
	for(let button of buttons){
		// Select the path tag inside the svg tag to modify its attribute 'stroke'
		button.addEventListener('mouseover', function(){
			this.childNodes[1].childNodes[1].setAttribute('stroke', '#000');
		});
		button.addEventListener('mouseleave', function(){
			this.childNodes[1].childNodes[1].setAttribute('stroke', '#fff');
		});
	}
}
hoverButtons();
// The Game algorythm starts here
/*
	The game starts when the user clicks or touches one of the buttons
	For the time being, the game mode is set to 'best of 3'. Below are the steps
	- The game starts together with an empty user's array of win VS lose OR a simple sum of WINs
	- The buttons all have event listeners which trigger the game and the consequent:
		- random function for the computer choice
		- update the choices in the DOM
		- push of lose/win or count of WINs
		- check on the number of rounds played (best of 3)
		- Score update and message update by updating the DOM
		- user array reset to start over again
*/

//Waiting for the DOM to finish loading before running the game
//Get the button elements and add event listeners to them

/*The following Event Listener contains an anonymous function which executes when the event occurs*/
document.addEventListener('DOMContentLoaded', function() {
	/* User preferences */
	let game = {
		difficulty: 'easy',
		rounds: 3
	}

	let allButtons = document.getElementsByTagName('button');
	for (let button of allButtons) {
		button.addEventListener('click', function(){
			document.getElementsByTagName('h2')[0].classList.add('removed');
		});
	}
	
	let difficultyButtons = document.getElementsByClassName('difficultyButtons');
	for (let button of difficultyButtons) {
		button.addEventListener('click', function(){
			game.difficulty = this.id;
			document.getElementById('selectedDifficulty').textContent = this.id;
		});
	}

	let bestOfButtons = document.getElementsByClassName('bestOfButtons');
	for (let button of bestOfButtons) {
		button.addEventListener('click', function(){
			game.rounds = this.id;
			document.getElementById('selectedBestOf').textContent = this.id;
		});
	}
	
	let buttons = document.getElementsByClassName('commandButton');
	let userTriggeredChoice;
	for (let button of buttons) {
		button.addEventListener('click', function(){
			userTriggeredChoice = this.id;
			runGame(userTriggeredChoice);	
		});
	}
});

/**
* The following function updates the images inside the DOM, according to user's choice, as well as computer random pick
* Compared to the previous version, it spares some lines of code, repeated in the calling function for both the user and the computer
*/
function updateSVG (update, who){
	switch(update){
		case 'rockButton':
		case 0:
			document.getElementById(who).setAttribute('src', 'assets/images/choices/Rock.svg');
			if (who === 'computerChoice'){
				return document.getElementById('rockButton').id;
			}
			break;
		case 'paperButton':
		case 1:
			document.getElementById(who).setAttribute('src', 'assets/images/choices/Paper.svg');
			if (who === 'computerChoice'){
				return document.getElementById('paperButton').id;
			}
			break;
		case 'scissorsButton':
		case 2:
			document.getElementById(who).setAttribute('src', 'assets/images/choices/Scissors.svg');
			if (who === 'computerChoice'){
				return document.getElementById('scissorsButton').id;
			}
			break;
		case 'lizardButton':
		case 3:
			document.getElementById(who).setAttribute('src', 'assets/images/choices/Lizard.svg');
			if (who === 'computerChoice'){
				return document.getElementById('lizardButton').id;
			}
			break;
		case 'spockButton':
		case 4:
			document.getElementById(who).setAttribute('src', 'assets/images/choices/Spock.svg');
			if (who === 'computerChoice'){
				return document.getElementById('spockButton').id;
			}
			break;
		default:
			alert(`Unknown choice: ${update}`);
      throw `Unknown choice triggered: ${update}. Aborting!`;
	}
}

/**
* The following function determines who wins the single match
* and returns an array of the scores user vs computer. End of game
* is determined by controlling them.
*/
function whoWins(user, computer){
	let messageDOM = document.getElementById('messageArea');
	console.log('Hai scelto ' + user + ', mentre il computer ha scelto ' + computer);
	// returns the message depending on the choices
	// the variable message is then passed into the score function
	// to update the scores in the DOM and to retrieve them
	switch(user){
		case 'rockButton':
			if (user === computer){
				messageDOM.textContent = 'Tie!';
				
			} else if (computer === 'lizardButton' || computer === 'scissorsButton'){
				messageDOM.textContent = 'You win!';
				
			} else {
				messageDOM.textContent = 'Computer wins!';
				
			}
			break;
		case 'paperButton':
			if (user === computer){
				messageDOM.textContent = 'Tie!';
				
			} else if (computer === 'rockButton' || computer === 'spockButton'){
				messageDOM.textContent = 'You win!';
				
			} else {
				messageDOM.textContent = 'Computer wins!';
				
			}
			break;
		case 'scissorsButton':
			if (user === computer){
				messageDOM.textContent = 'Tie!';
				
			} else if (computer === 'paperButton' || computer === 'lizardButton'){
				messageDOM.textContent = 'You win!';
				
			} else {
				messageDOM.textContent = 'Computer wins!';
				
			}
			break;
		case 'lizardButton':
			if (user === computer){
				messageDOM.textContent = 'Tie!';
				
			} else if (computer === 'spockButton' || computer === 'paperButton'){
				messageDOM.textContent = 'You win!';
				
			} else {
				messageDOM.textContent = 'Computer wins!';
				
			}
			break;
		case 'spockButton':
			if (user === computer){
				messageDOM.textContent = 'Tie!';
				
			} else if (computer === 'rockButton' || computer === 'scissorsButton'){
				messageDOM.textContent = 'You win!';
				
			} else {
				messageDOM.textContent = 'Computer wins!';
				
			}
			break;
		default:
			alert(`Unknown choice: ${choice}`);
      throw `Unknown choice triggered: ${choice}. Aborting!`;
	}
	//The array of scores is the returned in the runGame above
	return score(messageDOM.textContent);
}

/**
* This function retrieves the scores, updates them and passes 
* them as an array to the calling function above
*/
function score(result){
	let userScoreSoFar = parseInt(document.getElementById('yourCount').textContent);
	let computerScoreSoFar = parseInt(document.getElementById('computerCount').textContent);
	if (result === 'You win!'){
		document.getElementById('yourCount').textContent = ++userScoreSoFar;
	} else if (result === 'Computer wins!' || result !== 'Tie!'){
		document.getElementById('computerCount').textContent = ++computerScoreSoFar;
	}

	return [userScoreSoFar, computerScoreSoFar];
}

/**
* This function actually starts the game. It
* - updates the pictures inside the game areas, showing users' choices
* - updates the Score
* - updates the message area
*/
function runGame(choice){
	updateSVG(choice, 'userChoice');
	
	let randomChoice = Math.floor(Math.random() * 5);
	let computerChoice = updateSVG(randomChoice, 'computerChoice');
	// The following variable is an array that contains the scores.
	// It determines the end of the game.
	let endOfGame = whoWins(choice, computerChoice);
	console.log('Il punteggio attuale è: Io ' + endOfGame[0] + ' Computer ' + endOfGame[1]);
};

/**
* This function is supposed to reset the game
* when specific buttons are being hit
*/
function resetGame(){
	document.getElementById('yourCount').textContent = '0';
	document.getElementById('computerCount').textContent = '0';
}