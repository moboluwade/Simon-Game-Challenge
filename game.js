let count = 0, level;
gamePattern =  [];
userClickedPattern = [];
buttonColours = ['red', 'blue', 'green', 'yellow'];
function nextSequence(){
	level++;
	if(level===20){
		alert('Level 20? Champ!');
	}
	$('#level-title').html('Level '+level);
	let randomNumber= Math.random()*4;
	randomNumber= Math.floor(randomNumber);
	console.log(randomNumber);
	randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	$('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);
}

//vanilla js addeventlistener not supported on jquery
$('.btn').click(function(){
	let userChosenColour = this.id;
	playSound(userChosenColour);
	userClickedPattern.push(userChosenColour);
	animatePress(userChosenColour);

	checkAnswer(userClickedPattern.length-1)
})
function playSound(name){
	let audio = new Audio('sounds/'+name+'.mp3');
	audio.play();
}
function animatePress(currentColor){
	$('.'+currentColor).addClass('pressed')
	setTimeout(function(){
		$('.'+currentColor).removeClass('pressed')
	},100)
}
$(document).keypress( function(){
	if(count===0){
		level = 0;
		$('#level-title').html('Level 0');
		count++;
		nextSequence();

	}
})
function checkAnswer(currentLevel){
	if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
		console.log(userClickedPattern[currentLevel])
		console.log(gamePattern[currentLevel])
		if(userClickedPattern.length===gamePattern.length){
			setTimeout(function(){
				nextSequence();
				userClickedPattern = []; //questionable!!!
			},1000)
		}
	} else{
		playSound('wrong');
		$('body').addClass('game-over')
		setTimeout(function(){
			$('body').removeClass('game-over')
		},200)
		$('#level-title').html('Game Over, Press Any Key to Restart');
		startOver();
	}
}
function startOver(){
	level = 0;
	gamePattern = [];
	userClickedPattern =[];
	count = 0;
}
