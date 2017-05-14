const NUMBER_OF_LIVES = 1;
const FULL_SIZE_CANVAS = true;
const DEBUG = false;
const MOTION_BLUR = !DEBUG;
const GLITCH_THE_SCANLINE_OVERLAY = false;;
const SCROLL_THE_SCANLINE_OVERLAY = !DEBUG;

var showBlits = true;
var testingCheats = false;

var canvas, canvasContext, hiddenCanvas, hiddenCanvasContext;

var ship;
var score = 0;
var waves = 0;

var lives = NUMBER_OF_LIVES;

var showingTitleScreen = true;
var showingGameOverScreen = false;
var showingPauseScreen = false;
var showingQuitScreen = false;
var showingCreditsScreen = false;

var isAllowedToRenderAndMoveGameObjects = false;

var colliders = [];
var blits = [];
var maxBlits = 9;
var sliding = false;

var timesShotWrap=0;//used for Stats
var timesShot=0;//used for Stats
var avgTimesShotsWrapped=0;
var asteroidsHit=0;
var fuelUsed=0;
var accuracy=0;

var largeAsteroidsDestroyedThisRound = 0;
var largeAsteroidsDestroyedThisWave = 0;

var cutsceneTimer = 0;
var roundCounter = 0;
var isInHyperSpace = false;

window.onload = function() {
  /* QUICK AND DIRTY LEVEL SELECTOR
  roundCounter = prompt('select level');
  hyperSpaceThreshold = hyperSpaceThreshold + Number(roundCounter);
  */

  if(testingCheats){
    console.log('CHEATS ENABLED SHIP WONT BE DESTROYED DIRECT SHOTS ENABLED, USE C TO TOGGLE');
  }

  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  //<canvas style = "display:none;" id="hiddenGameCanvas" width="600" height="600"></canvas>

  hiddenCanvas = document.createElement('canvas');
  hiddenCanvas.id = 'hiddenGameCanvas';
  hiddenCanvas.style.display = 'none';
  hiddenCanvasContext = hiddenCanvas.getContext('2d');
  hiddenCanvas.width = canvas.width;
  hiddenCanvas.height = canvas.height;

	waveController = new WaveController();

  ship = new Ship();
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  colorText("LOADING IMAGES", canvas.width / 2, canvas.height / 2, 'white');
  // loadImages() will now be invoked after loading sounds from SoundLoading.js
  Sound.load(loadImages);
  //setting main theme to loop then playing song at medium volume
  Sound.volume("spacepool-low-volume", 1);
  Sound.loop("spacepool-low-volume", true);
  Sound.playbackRate("spacepool-low-volume", .5);
  Sound.play("spacepool-low-volume");

  if (FULL_SIZE_CANVAS) {
    window.addEventListener("resize", onResize);
    onResize();
  }

  if (GLITCH_THE_SCANLINE_OVERLAY)
	  glitchScanlineOverlay();
  if (SCROLL_THE_SCANLINE_OVERLAY)
	  scrollScanlineOverlay();

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
  //colliders.length < (START_NUMBER_OF_ASTEROIDS / 2) original check
  //
  if (largeAsteroidsDestroyedThisWave > 4 && colliders.length != 0) {
    largeAsteroidsDestroyedThisWave = 0;
    spawnAndResetAsteroids();
    waves++;
    maxBlits += waves * randomInteger(1, 5);
		stopSliding();
  } //spawn a new wave of asteroids after half of the current batch is destroyed
}

var breakRecursion = false;


function resetGame() {
  endScore = score;
  endWave = waves;
  largeAsteroidsDestroyedThisRound = 0;
  largeAsteroidsDestroyedThisWave = 0;
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
  waves = 0;
  largeAsteroidsDestroyedThisRound = 0;
  largeAsteroidsDestroyedThisWave = 0;
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
  canHasScene();
  requestAnimationFrame(updateAll);
}

function moveAll() {
  if (showingGameOverScreen) {
    return;
  }
  else if (!isAllowedToRenderAndMoveGameObjects) {
    showingPauseScreen = false;
    showingQuitScreen = false;
    return;
  }
  else if (showingPauseScreen) {
    console.log(roundCounter);
    console.log(hyperSpaceThreshold);
    return;
  }
  else if (showingQuitScreen)
  {
    return;
  }
  sweepAsteroidsReadyForRemoval();
  ship.move(colliders);
  moveAllParticles();
  moveAsteroids();
  if(debugBoolTurnOffBlit == false){
    moveBlits();
  }
}

function drawBackground() {
  if(sliding){
		slideScreen();
		waveController.drawWave();
    darkenRect(0, 0, canvas.width, canvas.height, "rgba(0,0,0,0.025)"); // More transparent
  }
  else if (MOTION_BLUR) {
		waveController.drawWave();
    darkenRect(0, 0, canvas.width, canvas.height, "rgba(0,0,0,0.25)"); // transparent
  }
  else {
  	colorRect(0, 0, canvas.width, canvas.height, "black"); // opaque
  }
}

var scanline_overlay_div = null;
var scanline_overlay_div_y = 0;
function glitchScanlineOverlay()
{
	if (!scanline_overlay_div) scanline_overlay_div = document.getElementById('overlay');
	scanline_overlay_div_y = Math.floor(Math.random()*16);
	scanline_overlay_div.style.backgroundPosition = '0px ' + scanline_overlay_div_y + 'px';
	setTimeout(glitchScanlineOverlay,Math.random()*1000);
}
function scrollScanlineOverlay()
{
	if (!scanline_overlay_div) scanline_overlay_div = document.getElementById('overlay');
	scanline_overlay_div_y--;
	scanline_overlay_div.style.backgroundPosition = '0px ' + scanline_overlay_div_y + 'px';
	setTimeout(scrollScanlineOverlay,50);
}

var slideDirectionX = 1, slideDirectonY = 1;

function startSliding(x, y) {
	sliding = true;

	slideDirectionX = x;
	slideDirectonY = y;
}

function stopSliding() {
  sliding = false;
}

var slideMovementX = 0;
var slideMovementY = 0;

function slideScreen(){
  slideMovementX = randomInteger(1, canvas.width/350) * slideDirectionX;
  slideMovementY = randomInteger(1, canvas.height/150) * slideDirectonY;
  canvasContext.drawImage(canvas, 0, 0, canvas.width, canvas.height,
    slideMovementX, slideMovementY, canvas.width, canvas.height);
}

function drawAll() {
  drawBackground();

  if (showingCreditsScreen) {
    creditsScreen();
  }

  if (showingTitleScreen && !showingCreditsScreen) {
    titleScreen();
  }
  if(isAllowedToRenderAndMoveGameObjects) {
    drawUI();
    ship.draw();
    drawAllParticles();
    drawAsteroids();
    if(showBlits){
      if(debugBoolTurnOffBlit == false){
        drawBlits();
      }
    }
    ship.draw();
    if (showingPauseScreen){
        pauseScreen();
    }
    else if (showingQuitScreen){
        quitScreen();
    }
  }
}
