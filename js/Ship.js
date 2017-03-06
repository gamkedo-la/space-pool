const SPACESPEED_DECAY_MULT = 0.99;
const THRUST_POWER = 0.15;
const TURN_RATE = 0.03;
const SHIP_COLLISION_RADIUS = 30;

const MULTIPLIER_LIFESPAN = 150;

var endScore;
var scoreMultiplier = 1;
var scoreMultiplierLifeSpan = MULTIPLIER_LIFESPAN;

shipClass.prototype = new movingWrapPositionClass();

function shipClass() {

	this.cannon = new cannonClass();

	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.ang = 0;
	this.xv = 0;
	this.yv = 0;
	this.myShipPic; // which picture to use
	this.name = "Untitled Ship";

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
	}

	this.superClassReset = this.reset;
	this.reset = function(whichImage) {
		this.superClassReset();
		this.myShipPic = whichImage;
		this.speed = 0;
		this.x = canvas.width/2;
		this.y = canvas.height/2;
	} // end of shipReset func

	this.isOverlappingPoint = function(testX, testY){
		var deltaX = testX-this.x;
		var deltaY = testY-this.y;
		var dist = Math.sqrt( (deltaX*deltaX) + (deltaY*deltaY) );
		return (dist <= SHIP_COLLISION_RADIUS);
	}

  this.checkMyShipCollisonAgainst = function(colliders) {
		for(var c = 0; c < colliders.length; c++){
			if( colliders[c].isOverlappingPoint(this.x,this.y) ) {
				resetGame();
			}
		}
  }

	this.superClassMove = this.move;
	this.move = function(colliders) {

		if(scoreMultiplierLifeSpan > 0){
			scoreMultiplierLifeSpan--;
		}
		if(scoreMultiplierLifeSpan == 0){
			scoreMultiplier = 0;
		}

		if(this.keyHeld_Gas) {
			this.xv += Math.cos(this.ang) * THRUST_POWER;
			this.yv += Math.sin(this.ang) * THRUST_POWER;
		}
		if(this.keyHeld_TurnLeft) {
      this.ang -= TURN_RATE*Math.PI;
    }
    if(this.keyHeld_TurnRight) {
      this.ang += TURN_RATE*Math.PI;
    }

		this.xv *= SPACESPEED_DECAY_MULT;
    this.yv *= SPACESPEED_DECAY_MULT;

		this.superClassMove();
		this.checkMyShipCollisonAgainst(colliders);
    //this.cannon.iterateThroughEnemyArray(colliders, this);
		this.cannon.iterateShotsandColliders(colliders, this);
	}

	this.draw = function() {
		this.cannon.drawShots(this.myShotArray);
		drawBitmapCenteredWithRotation(this.myShipPic, this.x,this.y, this.ang);
	}
}
