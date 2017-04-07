const SPACESPEED_DECAY_MULT = 0.99;
const THRUST_POWER = 0.075;
const TURN_RATE = 0.015;
const SHIP_COLLISION_RADIUS = 30;

const MULTIPLIER_LIFESPAN = 150;

var shipCanMove = true;
var endScore;
var endWave;
var scoreMultiplier = 1;
var scoreMultiplierLifeSpan = MULTIPLIER_LIFESPAN;

Ship.prototype = new MovingWrapPosition();

function Ship() {

  this.cannon = new Cannon();

  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
  // image is 48x32
  this.verts = [
    { x: -16, y: -13 },
    { x: -16, y: 13 },
    { x: 16, y: 0 }
  ];
  this.radius = 21;
  this.ang = 0;
  this.xv = 0;
  this.yv = 0;

  this.keyHeld_Gas = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;

  this.keyHeld_Fire = false;

  this.controlKeyUp;
  this.controlKeyRight;
  this.controlKeyDown;
  this.controlKeyLeft;

  this.setupInput = function(upKey, rightKey, downKey, leftKey, shotKey) {
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyDown = downKey;
    this.controlKeyLeft = leftKey;
    this.controlKeyForShotFire = shotKey;
  };

  this.superClassReset = this.reset;
  this.reset = function() {
    this.superClassReset();
    this.xv = this.yv = 0.0;
    this.cannon.clearShots();
  }; // end of shipReset func

  this.checkMyShipCollisonAgainst = function(colliders) {
    for (var c = 0; c < colliders.length; c++) {
      if (checkCollisionShapes(this, colliders[c])) {
        if (testingCheats) {
          console.log('player collison detected - cheatmode on!');
          return;
        }
        if (lives === 0) {
          resetGame();
        } //if the player runs out of lives, end the game
        else {
          resetRound();
          if (lives > 0) {
            lives--;
          }
        } //if lives > 0, reset the round
      } // check if the current collider is overlapping the ship
    } //loop through colliders
  }; //end of checkMyShipCollisonAgainst functions

  this.superClassMove = this.move;
  this.move = function(colliders) {

    if (scoreMultiplierLifeSpan > 0) {
      scoreMultiplierLifeSpan--;
    }
    if (scoreMultiplierLifeSpan == 0) {
      scoreMultiplier = 1;
    }

    if (this.keyHeld_Gas && shipCanMove == true) {
      fuelUsed++;
      this.xv += Math.cos(this.ang) * THRUST_POWER;
      this.yv += Math.sin(this.ang) * THRUST_POWER;
    }
    if (this.keyHeld_TurnLeft && shipCanMove == true) {
      this.ang -= TURN_RATE * Math.PI;
    }
    if (this.keyHeld_TurnRight && shipCanMove == true) {
      this.ang += TURN_RATE * Math.PI;
    }

    this.xv *= SPACESPEED_DECAY_MULT;
    this.yv *= SPACESPEED_DECAY_MULT;

    this.superClassMove();
    this.checkMyShipCollisonAgainst(colliders);
    //this.cannon.iterateThroughEnemyArray(colliders, this);
    this.cannon.iterateShotsandColliders(colliders, this);
  };

  this.superClassDraw = this.draw;
  this.draw = function() {
    this.cannon.drawShots();

    setDrawColors();
    var shipLines = [
      [{ x: -16, y: -13 }, { x: 16, y: 0 }],
      [{ x: 16, y: 0 }, { x: -16, y: 13 }],
      [{ x: -9, y: -10 }, { x: -9, y: 10 }]
    ];

    var cos = Math.cos(this.ang);
    var sin = Math.sin(this.ang);
    canvasContext.beginPath();
    for (var i = 0; i < shipLines.length; i++) {
      var fromX = shipLines[i][0].x * cos - shipLines[i][0].y * sin;
      var fromY = shipLines[i][0].x * sin + shipLines[i][0].y * cos;
      var toX = shipLines[i][1].x * cos - shipLines[i][1].y * sin;
      var toY = shipLines[i][1].x * sin + shipLines[i][1].y * cos;
      canvasContext.moveTo(fromX + this.x, fromY + this.y);
      canvasContext.lineTo(toX + this.x, toY + this.y);
    }
    canvasContext.closePath();
    canvasContext.fill();
    canvasContext.stroke();

    this.superClassDraw();
  };
}
