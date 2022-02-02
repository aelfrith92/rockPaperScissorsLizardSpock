/**
* It adds the hovering effect to the svg file, which cannot be styled via CSS
*/
function hoverButtons (){
	let buttons = document.getElementsByTagName('button');
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
	let buttons = document.getElementsByClassName('commandButton');
	let userTriggeredChoice;
	for (let button of buttons) {
		button.addEventListener('click', function(){
			userTriggeredChoice = this.id;
			runGame(userTriggeredChoice, buttons);	
		});
	}
});

/**
* This function actually starts the game. It
* - updates the pictures inside the game areas, showing users' choices
* - updates the Score
* - updates the message area
*/
function runGame(choice, buttons){
	switch(choice){
		case 'rockButton':
			document.getElementById('userChoice').setAttribute('src', 'assets/images/choices/Rock.svg');
			break;
		case 'paperButton':
			document.getElementById('userChoice').setAttribute('src', 'assets/images/choices/Paper.svg');
			break;
		case 'scissorsButton':
			document.getElementById('userChoice').setAttribute('src', 'assets/images/choices/Scissors.svg');
			break;
		case 'lizardButton':
			document.getElementById('userChoice').setAttribute('src', 'assets/images/choices/Lizard.svg');
			break;
		case 'spockButton':
			document.getElementById('userChoice').setAttribute('src', 'assets/images/choices/Spock.svg');
			break;
		default:
			alert(`Unknown choice: ${choice}`);
      throw `Unknown choice triggered: ${choice}. Aborting!`;
	}
	
	let randomChoice = Math.floor(Math.random() * 5);
	switch(randomChoice){
		case 0:
			document.getElementById('computerChoice').setAttribute('src', 'assets/images/choices/Rock.svg');
			randomChoice = document.getElementById('rockButton').id;
			break;
		case 1:
			document.getElementById('computerChoice').setAttribute('src', 'assets/images/choices/Paper.svg');
			randomChoice = document.getElementById('paperButton').id;
			break;
		case 2:
			document.getElementById('computerChoice').setAttribute('src', 'assets/images/choices/Scissors.svg');
			randomChoice = document.getElementById('scissorsButton').id;
			break;
		case 3:
			document.getElementById('computerChoice').setAttribute('src', 'assets/images/choices/Lizard.svg');
			randomChoice = document.getElementById('lizardButton').id;
			break;
		case 4:
			document.getElementById('computerChoice').setAttribute('src', 'assets/images/choices/Spock.svg');
			randomChoice = document.getElementById('spockButton').id;
			break;
		default:
			alert(`Unknown choice: ${choice}`);
      throw `Unknown choice triggered: ${choice}. Aborting!`;
	}

	let endOfGame = whoWins(choice, randomChoice);
	if(endOfGame[0] === 2){
		console.log('You Win');
		setTimeout(alert('You Win'), 2000);
		resetGame();
	} else if (endOfGame[1] === 2){
		console.log('Computer wins');
		setTimeout(alert('Computer wins'), 2000);
		resetGame();
	}
};

/**
* The following function determines who wins the single match
* and returns an array of the scores user vs computer. End of game
* is determined by controlling them.
*/
function whoWins(user, computer){
	let message;
	let messageDOM = document.getElementById('messageArea');
	// returns the message depending on the choices
	// the variable message is then passed into the score function
	// to update the scores in the DOM and to retrieve them
	// each time, to decide whether to trigger the end of the game or not.
	switch(user){
		case 'rockButton':
			if (user === computer){
				message = 'Tie!';
				messageDOM.textContent = message;
			} else if (computer === 'lizardButton' || computer === 'scissorsButton'){
				message = 'You win!';
				messageDOM.textContent = message;
			} else {
				message = 'Computer wins!';
				messageDOM.textContent = message;
			}
			break;
		case 'paperButton':
			if (user === computer){
				message = 'Tie!';
				messageDOM.textContent = message;
			} else if (computer === 'rockButton' || computer === 'spockButton'){
				message = 'You win!';
				messageDOM.textContent = message;
			} else {
				message = 'Computer wins!';
				messageDOM.textContent = message;
			}
			break;
		case 'scissorsButton':
			if (user === computer){
				message = 'Tie!';
				messageDOM.textContent = message;
			} else if (computer === 'paperButton' || computer === 'lizardButton'){
				message = 'You win!';
				messageDOM.textContent = message;
			} else {
				message = 'Computer wins!';
				messageDOM.textContent = message;
			}
			break;
		case 'lizardButton':
			if (user === computer){
				message = 'Tie!';
				messageDOM.textContent = message;
			} else if (computer === 'spockButton' || computer === 'paperButton'){
				message = 'You win!';
				messageDOM.textContent = message;
			} else {
				message = 'Computer wins!';
				messageDOM.textContent = message;
			}
			break;
		case 'spockButton':
			if (user === computer){
				message = 'Tie!';
				messageDOM.textContent = message;
			} else if (computer === 'rockButton' || computer === 'scissorsButton'){
				message = 'You win!';
				messageDOM.textContent = message;
			} else {
				message = 'Computer wins!';
				messageDOM.textContent = message;
			}
			break;
		default:
			alert(`Unknown choice: ${choice}`);
      throw `Unknown choice triggered: ${choice}. Aborting!`;
	}
	//The array of scores is the returned in the runGame above
	return score(message);
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
* This function is supposed to reset the game
*/
function resetGame(){
	document.getElementById('yourCount').textContent = '0';
	document.getElementById('computerCount').textContent = '0';
}