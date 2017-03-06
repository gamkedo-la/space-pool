var canvas, canvasContext;

var ship;
var UFO;
var score = 0;
var showingTitleScreen = true;
var showingGameOverScreen = false;
var colliders = [];
var explosions = [];

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	ship = new shipClass();
	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');
	loadImages();
}


function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
	setupInput();
	loadLevel();
}

function resetGame(){
	endScore = score;
	score = 0;
	scoreMultiplier = 0;
	clearAllAsteroids(colliders);
	loadLevel();
	showingGameOverScreen = true;
}


function loadLevel(whichLevel) {
	ship.reset(shipPic);
	//spawnAndResetAsteroids();
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	if(showingGameOverScreen){
	 return;
 } else if(showingTitleScreen){
	 return
 }
 	sweepAsteroidsReadyForRemoval();
	ship.move(colliders);
 	moveAsteroids();
}

function drawAll() {
	colorRect(0,0, canvas.width,canvas.height, "black");
	if(showingTitleScreen){
		titleScreen();
	} else if(showingGameOverScreen){
		gameOverScreen();
	}
	else{
		drawUI();
		ship.draw();
		drawAsteroids();
		//drawExplosions();
	}
}
