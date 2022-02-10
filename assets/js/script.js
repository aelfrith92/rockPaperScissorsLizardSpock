/**
* It adds the hovering effect to the svg file, which cannot be styled via CSS
*/
function hoverButtons() {
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

// The game algorithm starts here

/**
* This function sets buttons at the bottom of the page to a disabled status
* To let the game start with certain parameters
*/
function disableButtons(){
	
	let allDifficultyButtons = document.querySelectorAll('.difficulty button');
	
	for(let button of allDifficultyButtons){
		button.disabled = true;
		if(button.className === 'difficultyButtons'){
			button.classList.toggle('difficultyButtons');
		} else if(button.className === 'bestOfButtons'){
			button.classList.toggle('bestOfButtons');
		}
	}
}

/**
* This function resets the game: scores set to 0 (zero), it re-assigns original classes to command buttons
*/
function resetGame(){
	document.getElementById('yourCount').textContent = '0';
	document.getElementById('computerCount').textContent = '0';

	let commandButtons = document.querySelectorAll('.commands button');
	for (let commandButton of commandButtons){
		commandButton.classList.add('commandButton');
		commandButton.disabled = false;
		// Making sure that command buttons are all the same style, by setting the stroke attribute to its original style
		commandButton.childNodes[1].childNodes[1].setAttribute('stroke', '#fff');
	}
}

/**
* This function ends the game and re-enable buttons for user preferences.
* It also shows the final score announcing the winnner.
*/
function preReset (user, computer){
	let allDifficultyButtons = document.querySelectorAll('.difficulty button');
	let newGameButton = document.getElementById('newGameButton');

	// Re-enabling preferences for the next game, by assigning them their original classes
	for(let button of allDifficultyButtons){
		button.disabled = false;
		// Using IDs instead of classes, as they have been removed at this stage
		if(button.id === 'easy' || button.id === 'medium' || button.id === 'hard'){
			button.classList.add('difficultyButtons');
		} else if(button.id === '3' || button.id === '5'){
			button.classList.add('bestOfButtons');
		}
	}

	// Communicating the winner
	if(user > computer){
		document.getElementById('messageArea').textContent = `You have won`;
	} else{
		document.getElementById('messageArea').textContent = 'The computer has won';
	}

	// Disabling command buttons once the game is over. The user has to hit "New Game" to start playing again 
	let commandButtons = document.querySelectorAll('.commands button');
	for (let commandButton of commandButtons){
		commandButton.disabled = true;
		commandButton.classList.toggle('commandButton');
		// Making sure that command buttons are all the same style, by setting the stroke attribute to the disabled style
		commandButton.childNodes[1].childNodes[1].setAttribute('stroke', '#666');
	}

	// The message at the top shows up again
	document.getElementsByTagName('h2')[0].classList.remove('not-visible');
	// Making sure that the new game button comes back fully functioning
	if(newGameButton.classList[0] === 'not-visible'){
		newGameButton.classList.remove('not-visible');
	}
	if(newGameButton.classList[0] !== 'newGameButton' && newGameButton.classList[1] !== 'newGameButton'){
		newGameButton.classList.add('newGameButton');
	}
}

// This function updates the 'pick messages' to let the user what they have just picked - for their convenience
function updatePicks(what, who){
	who = who.split('C');
	what = what.split('B');

	/* Using the template literal spared some lines of code, by avoiding an unnecessary control*/
	who = document.getElementById(`${who[0]}Pick`);
	who.textContent = what[0];
	who.style.textTransform = "capitalize";
}

/**
* The following function updates the images inside the DOM, according to user's choice, as well as the computer random pick
* Compared to a previous version, it spares some lines of code, repeated in the calling function for both the user and the computer
*/
function updateSVG (update, who){

	/* Sparing some lines of code with template literals*/
	let what = update.toString().split('B');	

	document.getElementById(who).setAttribute('src', `assets/images/choices/${what[0]}.svg`);
	if (who === 'computerChoice'){
		updatePicks(document.getElementById(`${what[0]}Button`).id, who);
		return document.getElementById(`${what[0]}Button`).id;
	}
	updatePicks(update, who);
	
}

/**
* This function retrieves the scores, updates them and passes 
* them as an array to the calling function whoWins. The latter will in turn
* pass such an array to the calling function runGame
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
* The following function determines who wins the single match
* and returns an array of the scores user vs computer. End of game
* is determined by controlling them.
*/
function whoWins(user, computer){
	let messageDOM = document.getElementById('messageArea');
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
			alert(`Unknown choice: ${user}`);
      throw `Unknown choice triggered: ${user}. Aborting!`;
	}
	//The array of scores is then returned in the runGame function
	return score(messageDOM.textContent);
}

/**
* This function actually starts the game. It
* - updates the pictures inside the game areas, showing users' choices
* - updates the Score
* - updates the message area
*/
function runGame(choice, difficulty, nRounds){

	let computerPicks = ['rockButton','paperButton', 'scissorsButton', 'lizardButton', 'spockButton'];
	
	updateSVG(choice, 'userChoice');
	
	let randomChoice = computerPicks[Math.floor(Math.random() * 5)];
	let computerChoice = updateSVG(randomChoice, 'computerChoice');
	// The following variable is an array that contains the scores.
	// It determines the end of the game.
	let endOfGame = whoWins(choice, computerChoice);

	// The following check determines how many chances the user is given, according to the level of difficulty selected
	// For example, Easy = if the computer wins, the random pick hits again (+50% of chances to win); Medium = equal chances both for the user 
	// and the computer; Hard = if the user wins, the random pick hits again (-50% of chances to lose).
	// 
	let tempOutcome = document.getElementById('messageArea').textContent;
	if (difficulty === 'easy' && tempOutcome === 'Computer wins!'){
		document.getElementById('computerCount').textContent = --endOfGame[1];
		randomChoice = computerPicks[Math.floor(Math.random() * 5)];
		computerChoice = updateSVG(randomChoice, 'computerChoice');
		endOfGame = whoWins(choice, computerChoice);
	} else if (difficulty === 'hard' && tempOutcome === 'You win!'){
		document.getElementById('yourCount').textContent = --endOfGame[0];
		randomChoice = computerPicks[Math.floor(Math.random() * 5)];
		computerChoice = updateSVG(randomChoice, 'computerChoice');
		endOfGame = whoWins(choice, computerChoice);
	}
	
	// Checking number of rounds played and ending the game if necessary. Disabling buttons at the bottom while the game is ongoing.
	if (nRounds === 3){
		if(endOfGame[0] !== nRounds - 1 && endOfGame[1] !== nRounds - 1){
			if(document.getElementById('easy').disabled === false){
				disableButtons();
			}
		}
		if (endOfGame[0] === nRounds - 1 || endOfGame[1] === nRounds - 1){
			preReset(endOfGame[0], endOfGame[1]);
		}
	} else {
		if(endOfGame[0] !== nRounds - 2 && endOfGame[1] !== nRounds - 2){
			if(document.getElementById('easy').disabled === false){
				disableButtons();
			}
		}
		if (endOfGame[0] === nRounds - 2 || endOfGame[1] === nRounds - 2){
			preReset(endOfGame[0], endOfGame[1]);
		}
	}
}

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
	};

	let allButtons = document.getElementsByTagName('button');
	for (let button of allButtons) {
		button.addEventListener('click', function(){
			document.getElementsByTagName('h2')[0].classList.add('not-visible');
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
			game.rounds = parseInt(this.id);
			document.getElementById('selectedBestOf').textContent = this.id;
		});
	}

	// Adding the event listener to the New Game button. Putting it here should prevent that the button is being assigned 
	// an event listener each time that the code runs, considering that the button status is also disabled at the beginning.
	// The event listener was originally inside the preReset function as last task of it, but it kept being assigned the event 
	// listener each time.
	document.getElementById('newGameButton').addEventListener('click', function (){
		resetGame();
		this.disabled = true;
		this.classList.remove('newGameButton');
	});
	
	let buttons = document.getElementsByClassName('commandButton');
	let userTriggeredChoice;
	for (let button of buttons) {
		button.addEventListener('click', function(){
			let hasStartedAlready = document.getElementById('messageArea');
			//Checking whether the game has already run once
			if(hasStartedAlready.textContent === 'You have won' || hasStartedAlready.textContent === 'The computer has won'){
				let diff = document.getElementById('selectedDifficulty');
				diff.style.textTransform = 'lowercase';
				game.difficulty = diff.textContent;
				game.rounds = parseInt(document.getElementById('selectedBestOf').textContent);
			}
			userTriggeredChoice = this.id;
			//runGame should keep note of both difficulty and number of rounds
			runGame(userTriggeredChoice, game.difficulty, game.rounds);	
		});
	}
});