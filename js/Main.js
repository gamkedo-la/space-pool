const NUMBER_OF_LIVES = 3;
const FULL_SIZE_CANVAS = true;
const MOTION_BLUR = true;
const Ship = require("./Ship");
const Graphics = require("./GraphicsCommon");
const Input = require("./Input");
const Asteroid = require("./Asteroid");
const UI = require("./UI");
const Stat = require("./Stats");
const Image = require("./ImageLoading")(imageLoadingDoneSoStartGame);

const config = require("./config")

var canvas, canvasContext;

var ship;
var score = 0;
var waves = 0;
var lives = NUMBER_OF_LIVES;
var showingTitleScreen = true;
var showingGameOverScreen = false;
var colliders = [];

var timesShotWrap=0;//used for Stats
var timesShot=0;//used for Stats
var avgTimesShotsWrapped=0;


var accuracy=0;

window.onload = function() {
  if(config.testingCheats){
    console.log('CHEATS ENABLED SHIP WONT BE DESTROYED DIRECT SHOTS ENABLED, USE C TO TOGGLE');
  }
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  ship = new Ship();
  //WE COULD HAVE MULTIPLE SHIPS :D
  ship.setupInput(Input.KEY_UP_ARROW, Input.KEY_RIGHT_ARROW, Input.KEY_DOWN_ARROW, Input.KEY_LEFT_ARROW, Input.KEY_SPACEBAR, Input.KEY_C);
  Input.setShip(ship);
  Input.setScene = setScene;

  Graphics.colorRect(0, 0, canvas.width, canvas.height, 'black');
  Graphics.colorText("LOADING IMAGES", canvas.width / 2, canvas.height / 2, 'white');
  Image.loadImages();
  if (FULL_SIZE_CANVAS) {
    window.addEventListener("resize", onResize);
    onResize();
  }
};

var setScene = function setScene(scene){
  if(showingTitleScreen){
    showingTitleScreen = false    
  } else if (showingGameOverScreen) {    
    showingGameOverScreen = false
  }
}

function onResize() // full screen
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function imageLoadingDoneSoStartGame() {
  requestAnimationFrame(updateAll);
  Input.setupInput();
  loadLevel();
}

function resetGame() {
  endScore = score;
  endWave = waves;
  score = 0;
  waves = 0;
  lives = 3;
  Stat.scoreMultiplier = 1;
  clearAllAsteroids();
  loadLevel();
  showingGameOverScreen = true;
}

function resetRound() {
  endScore = score;
  endWave = waves;
  Stat.scoreMultiplier = 1;
  clearAllAsteroids();
  loadLevel();
  showingGameOverScreen = true;
}

function loadLevel(whichLevel) {
  ship.reset(Image.shipPic);
  Asteroid.spawnAndResetAsteroids(colliders);
}

function updateAll() {
  moveAll();
  drawAll();
  requestAnimationFrame(updateAll);
}

function moveAll() {
  if (showingGameOverScreen) {
    return;
  }
  else if (showingTitleScreen) {
    return
  }
  Asteroid.sweepAsteroidsReadyForRemoval(colliders);
  ship.move(colliders);
  Asteroid.moveAsteroids(colliders);
}

function drawAll() {

  if (MOTION_BLUR) {
	Graphics.darkenRect(0, 0, canvas.width, canvas.height, "rgba(0,0,0,0.25)"); // transparent
  }
  else {
  	Graphics.colorRect(0, 0, canvas.width, canvas.height, "black"); // opaque
  }

  if (showingTitleScreen) {
    UI.titleScreen();
  }
  else if (showingGameOverScreen) {
    gameOverScreen();
  }
  else {
    UI.drawUI(score, waves, lives, Stat.scoreMultiplier);
    ship.draw();
    Asteroid.drawAsteroids(colliders);
  }
}
