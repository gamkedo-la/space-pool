const RAIL_SPEED = 31.0; //18
const RAIL_LIFE = 3000; //3000
const RAIL_DISPLAY_RADIUS = 3;
const SHOT_OFFSET = 30;

RailSlug.prototype = new MovingWrapPosition();

function RailSlug() {
	this.attackValue = 4;
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.xv = 0;
	this.yv = 0;
	this.deltaX = 0;
	this.deltaY = 0;

	this.edgeCrossCount = 0;

	this.railColor = 'red';

	this.shotLife = 30;
	this.timeUntilCanHitAgain = 0;

	this.shotAng;

	this.superClassReset = this.reset;
	this.reset = function() {
		this.superClassReset();
		this.shotLife = 0;
	} // end of shotReset func

	this.isShotReadyToFire = function(){
		if(this.shotLife <= 0){
			return true;
		}
	}

	this.countdownTimeUntilCanHitAgain = function(){
		if(this.timeUntilCanHitAgain > 0 ){
			this.timeUntilCanHitAgain--;
			console.log(this.timeUntilCanHitAgain);
		}
	}

	this.shootFrom = function(shipFiring){

		var shotDistFromShipCenter = SHIP_COLLISION_RADIUS + 2;
		this.x = shipFiring.x + Math.cos(shipFiring.ang) * shotDistFromShipCenter;
		this.y = shipFiring.y + Math.sin(shipFiring.ang) * shotDistFromShipCenter;

		this.xv = Math.cos(shipFiring.ang) * RAIL_SPEED + shipFiring.xv;
		this.yv = Math.sin(shipFiring.ang) * RAIL_SPEED + shipFiring.yv;

		this.shotAng = shipFiring.ang;

		this.shotLife = RAIL_LIFE;
		scoreMultiplier = 1;
	}

	this.increaseScoreMultiplier = function(){
		if(scoreMultiplier < 8){
			scoreMultiplier *= 2;
		} else {
			this.shotLife = 0;
		}
	}

	this.handleScreenWrap = function(){
		var edgeCrossed = false;
		if(this.x > canvas.width){
			this.x = 0;
			edgeCrossed = true;
		}
		if(this.x < 0){
			this.x = canvas.width;
			edgeCrossed = true;
		}
		if(this.y < 0){
			this.y = canvas.height;
			edgeCrossed = true;
		}
		if(this.y > canvas.height){
			this.y = 0;
			edgeCrossed = true;
		}
		if(edgeCrossed){
			this.edgeCrossCount++;
			this.increaseScoreMultiplier();
		}
	}

	//this.superClassMove	=	this.move; //saving reference to parent class' move.
	this.move = function() {
		if(this.shotLife == 0){
			scoreMultiplier = 1;
		}
		if(this.shotLife > 0){
			this.shotLife--;
			this.x += this.xv;
			this.y += this.yv;
			this.handleScreenWrap();
		}
	}

	this.hitTest = function(thisEnemy) {
		if(this.edgeCrossCount == 0){
			return false;
		} // prevent the rail from destroying rocks without wrapping at least once.

		if(this.shotLife <= 0){
			return false;
		}
		if(this.timeUntilCanHitAgain != 0){
			return false;
		}
		return thisEnemy.isOverlappingPoint(this.x, this.y);
	}

	this.draw = function() {
		var shotSize = 3
		if(scoreMultiplier == 1){
			this.railColor = 'white';
			scoreMultiplierLifeSpan = MULTIPLIER_LIFESPAN;
		}

		if(scoreMultiplier == 2){
			this.railColor = 'green';
			scoreMultiplierLifeSpan = MULTIPLIER_LIFESPAN;
			shotSize = 6
		}

		if(scoreMultiplier == 4){
			this.railColor = 'blue';
			scoreMultiplierLifeSpan = MULTIPLIER_LIFESPAN;
			shotSize = 8
		}

		if(scoreMultiplier == 8){
			this.railColor = 'purple';
			scoreMultiplierLifeSpan = MULTIPLIER_LIFESPAN;
			shotSize = 15
		}

		if(this.shotLife > 0){
			//colorCircle(this.x,this.y, RAIL_DISPLAY_RADIUS, "red");
			colorRect(this.x,this.y,40,shotSize,this.railColor, this.shotAng);
		}
	}
}
