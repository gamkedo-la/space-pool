var Input = {}
Input.KEY_LEFT_ARROW = 37;
Input.KEY_UP_ARROW = 38;
Input.KEY_RIGHT_ARROW = 39;
Input.KEY_DOWN_ARROW = 40;

Input.KEY_SPACEBAR = 32;
Input.KEY_ENTER = 13;

Input.KEY_W = 87;
Input.KEY_A = 65;
Input.KEY_S = 83;
Input.KEY_D = 68;

Input.KEY_1 = 49;
Input.KEY_2 = 50;
Input.KEY_3 = 51;

Input.KEY_C = 67; //toggle cheats

var peaShooterActive = false;
var railGunActive = true;
var shotSnakeActive = false;

var mouseX = 0;
var mouseY = 0;
var repeat;
var UI = require("./UI")
var canvas = document.getElementById('gameCanvas');
Input.setupInput = function setupInput() {
  canvas.addEventListener('mousemove', Input.updateMousePos);

  var repeat = false;

  document.addEventListener('keydown', Input.keyPressed);
  document.addEventListener('keyup', Input.keyReleased);

  document.addEventListener("keyup", function() {
    repeat = false;
  });
  document.addEventListener("keydown", function() {
  });

  
}

Input.updateMousePos =function updateMousePos(evt) {
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

//this is a work around from when Marcus setup webpack. 
//TODO: refractor keySet so this isn't needed. 
var ship = {}
Input.setShip = function setShip(shipRef){
  ship = shipRef
}

//I'm getting tired. I'm sorry for this
//I'm just going to overwrite it in main
//and use it as a function elsewhere...
Input.setScene = null


Input.keySet =function keySet(keyEvent, setTo) {
  //TODO:? refract ship stufffff out?
  if (keyEvent.keyCode == ship.controlKeyLeft) {
    ship.keyHeld_TurnLeft = setTo;
  }
  if (keyEvent.keyCode == ship.controlKeyRight) {
    ship.keyHeld_TurnRight = setTo;
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
    if (keyEvent.keyCode == Input.KEY_ENTER) {
        Input.setScene()

    }
    if(keyEvent.keyCode == Input.KEY_C){
      config.testingCheats = !config.testingCheats;
      console.log('config.testingCheats is ' + config.testingCheats);
    }
  }
}


Input.keyPressed =function keyPressed(evt) {
  // console.log("Key pressed: "+evt.keyCode);
  Input.keySet(evt, true);
  if (!repeat) {
    if (evt.keyCode == ship.controlKeyForShotFire) {
      ship.cannon.cannonFire(ship);
    }
    repeat = true;
  }
  //console.log(evt.keyCode);
  evt.preventDefault();
}

Input.keyReleased =function keyReleased(evt) {
  // console.log("Key pressed: "+evt.keyCode);
  Input.keySet(evt, false);
  repeat = false;
}

module.exports = Input
