const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_SPACEBAR = 32;
const KEY_ENTER = 13;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;

const KEY_P = 80;
const KEY_Q = 81;
const KEY_ESC = 27;

// Reload keys
const KEY_F5 = 116;
const KEY_R = 82;

const KEY_C = 67; //toggle cheats
const KEY_B = 66; //toggle blits

var debugBoolTurnOffSlide = false;
var debugBoolTurnOffBlit = false;

var peaShooterActive = false;
var railGunActive = true;
var shotSnakeActive = false;

var mouseX = 0;
var mouseY = 0;
var repeat;

function setupInput() {
  canvas.addEventListener('mousemove', updateMousePos);

  var repeat = false;

  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  document.addEventListener("keyup", function() {
    repeat = false;
  });
  document.addEventListener("keydown", function() {
  });
  ship.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_SPACEBAR);
  //ship.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_SPACEBAR, KEY_C);
}

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

  // cheat / hack to test car in any position
  /*carX = mouseX;
   carY = mouseY;
   carSpeedX = 4;
   carSpeedY = -4;*/
}

function keySet(keyEvent, setTo) {
  if (keyEvent.keyCode == ship.controlKeyLeft) {
    ship.keyHeld_TurnLeft = setTo;
    //debugBoolTurnOffSlide = setTo;
  }
  if (keyEvent.keyCode == ship.controlKeyRight) {
    ship.keyHeld_TurnRight = setTo;
    //debugBoolTurnOffBlit = setTo;
  }
  if (keyEvent.keyCode == ship.controlKeyUp) {
    ship.keyHeld_Gas = setTo;
  }
  if (keyEvent.keyCode == ship.controlKeyDown) {
    ship.keyHeld_Reverse = setTo;
  }
  if (keyEvent.keyCode == ship.controlKeyForShotFire) {
    ship.keyHeld_Fire = setTo;
  }
  if(setTo){ //only detecting when key goes down not held keys
    if (keyEvent.keyCode == KEY_ENTER) {
      if(!cursorOnStartGame){
        showingCreditsScreen = true;
      }
      if (showingTitleScreen && cursorOnStartGame) {
        showingTitleScreen = false;
        isAllowedToRenderAndMoveGameObjects = true;
      }
      if (showingGameOverScreen) {
        showingGameOverScreen = false;
      }
    }
    if(showingTitleScreen && !showingCreditsScreen){
      if(keyEvent.keyCode == KEY_UP_ARROW){
        cursorOnStartGame = !cursorOnStartGame;
      }
      if(keyEvent.keyCode == KEY_DOWN_ARROW){
        cursorOnStartGame = !cursorOnStartGame;
      }
    }
    if(keyEvent.keyCode == KEY_C){
      testingCheats = !testingCheats;
      console.log('testingCheats is ' + testingCheats);
    }
    if(keyEvent.keyCode == KEY_B){
      showBlits = !showBlits;
      console.log('showBlits is ' + showBlits);
    }
    if(keyEvent.keyCode == KEY_P)
    {
      if (showingQuitScreen || showingTitleScreen){
          return;
      }
      if (showBlits && !showingPauseScreen){
          // turn off blitting during pause
          showBlits = false;
      }
      showingPauseScreen = !showingPauseScreen;
      showingQuitScreen = false;
    }
    if(keyEvent.keyCode == KEY_ESC || keyEvent.keyCode == KEY_Q)
    {
      if(showingCreditsScreen){
        showingCreditsScreen = false;
      }
      if (showingPauseScreen){
        return;
      }
      if (showingQuitScreen && keyEvent.keyCode == KEY_Q){
        showingTitleScreen = true;
        return;
      }
      showingQuitScreen = !showingQuitScreen;
      showingPauseScreen = false;
      }
  }
}

function keyPressed(evt) {
  // console.log("Key pressed: "+evt.keyCode);
  keySet(evt, true);
  if (!repeat) {
    if (evt.keyCode == ship.controlKeyForShotFire) {
      ship.cannon.cannonFire(ship);
    }
    repeat = true;
  }
  //console.log(evt.keyCode);
  // Do not prevent F5 or Ctrl+R
  if (evt.keyCode != KEY_F5 && !(evt.keyCode == KEY_R && evt.ctrlKey == true)) {
    evt.preventDefault();
  }
}

function keyReleased(evt) {
  // console.log("Key pressed: "+evt.keyCode);
  keySet(evt, false);
  repeat = false;
}
