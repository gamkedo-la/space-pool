const NUMBER_OF_LIVES = 3;
const FULL_SIZE_CANVAS = true;
const DEBUG = false;
const MOTION_BLUR = !DEBUG;

var testingCheats = false;

var canvas, canvasContext, hiddenCanvas, hiddenCanvasContext;

var ship;
var score = 0;
var waves = 0;
var lives = NUMBER_OF_LIVES;
var showingTitleScreen = true;
var showingGameOverScreen = false;
var colliders = [];
var blits = [];
var maxBlits = 9;

var timesShotWrap=0;//used for Stats
var timesShot=0;//used for Stats
var avgTimesShotsWrapped=0;
var asteroidsHit=0;
var fuelUsed=0;
var accuracy=0;

window.onload = function() {
  if(testingCheats){
    console.log('CHEATS ENABLED SHIP WONT BE DESTROYED DIRECT SHOTS ENABLED, USE C TO TOGGLE');
  }

  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  //<canvas style = "display:none;" id="hiddenGameCanvas" width="600" height="600"></canvas>
  hiddenCanvas = document.createElement('canvas');
  hiddenCanvas.id = 'hiddenGameCanvas';
  hiddenCanvas.style.display = 'none';
  hiddenCanvasContext = canvas.getContext('2d');

  ship = new Ship();
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  colorText("LOADING IMAGES", canvas.width / 2, canvas.height / 2, 'white');
  // loadImages() will now be invoked after loading sounds from SoundLoading.js
  Sound.load(loadImages);
  //setting main theme to loop then playing song at medium volume
  Sound.volume("spacepool", .5);
  Sound.loop("spacepool", true);
  Sound.playbackRate("spacepool", .5);
  Sound.play("spacepool");

  if (FULL_SIZE_CANVAS) {
    window.addEventListener("resize", onResize);
    onResize();
  }
};

function onResize() // full screen
{
	hiddenCanvas.width = canvas.width = window.innerWidth;
	hiddenCanvas.height = canvas.height = window.innerHeight;
}

function imageLoadingDoneSoStartGame() {
  requestAnimationFrame(updateAll);
  setupInput();
  loadLevel();
}

function checkWave(){
  if (colliders.length < (START_NUMBER_OF_ASTEROIDS / 2) && colliders.length != 0) {
    spawnAndResetAsteroids();
    waves++;
    maxBlits += waves * randomInteger(1, 5);

  } //spawn a new wave of asteroids after half of the current batch is destroyed
}

var breakRecursion = false;
function canHasScene(){
  if(waves > 2){
    breakRecursion = true;
    debugger;
    setTimeout(slideScreen, 2000);
  }
}

function resetGame() {
  endScore = score;
  endWave = waves;
  score = 0;
  waves = 0;
  lives = 3;
  scoreMultiplier = 1;
  clearAllAsteroids();
  clearAllBlits();
  loadLevel();
  showingGameOverScreen = true;
}

function resetRound() {
  endScore = score;
  endWave = waves;
  scoreMultiplier = 1;
  clearAllAsteroids();
  clearAllBlits();
  loadLevel();
  //showingGameOverScreen = true;
}

function loadLevel(whichLevel) {
  ship.reset(shipPic);
  spawnAndResetAsteroids();
}

function updateAll() {
  checkWave();
  moveAll();
  drawAll();
  canHasScene()
  if(breakRecursion == true){
    return;
  }
  requestAnimationFrame(updateAll);
}

var slidex = 0;
var slidey = 0;
function slideScreen(){
  if(randomInteger(1, 100) < 4){
    canvasContext.drawImage(canvas, 0, 0, canvas.width, canvas.height,
      slidex, slidey, canvas.width, canvas.height);
    slidex += randomInteger(1, canvas.width/700);
    slidey += randomInteger(1, canvas.height/700);
    //canvasContext.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }
  requestAnimationFrame(slideScreen);
}
function moveAll() {
  if (showingGameOverScreen) {
    return;
  }
  else if (showingTitleScreen) {
    return
  }
  sweepAsteroidsReadyForRemoval();
  ship.move(colliders);
  moveAllParticles();
  moveAsteroids();
  moveBlits();
}

function drawAll() {

  if (MOTION_BLUR) {
    darkenRect(0, 0, canvas.width, canvas.height, "rgba(0,0,0,0.25)"); // transparent
  }
  else {
  	colorRect(0, 0, canvas.width, canvas.height, "black"); // opaque
  }

  if (showingTitleScreen) {
    titleScreen();
  }
  else if (showingGameOverScreen) {
    gameOverScreen();
  }
  else {
    drawUI();
    ship.draw();
    drawAllParticles();
    drawAsteroids();
    drawBlits();
  }
}
