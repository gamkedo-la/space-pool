const RAIL_SPEED = 18.0;
const RAIL_LIFE = 3000;
const RAIL_DISPLAY_RADIUS = 3;
const SHOT_OFFSET = 30;

railSlugClass.prototype = new movingWrapPositionClass();

function railSlugClass() {
	this.attackValue = 4;
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.xv = 0;
	this.yv = 0;
	this.deltaX = 0;
	this.deltaY = 0;

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

		/*
		this.deltaX = SHOT_OFFSET - shipFiring.x;
		this.deltaY = SHOT_OFFSET - shipFiring.y;

		this.x = Math.sqrt(this.deltaX*this.deltaX);
		this.y = Math.sqrt(this.deltaY*this.deltaY);
		*/

		/*TODO drawing an offset bullet lies within here.
		var deltaX = testX-this.x;
		var deltaY = testY-this.y;
		var dist = Math.sqrt( (deltaX*deltaX) + (deltaY*deltaY) );
		*/

		/*TODO drawing an offset bullet lies within here.
		var deltaX = testX-this.x;
		var deltaY = testY-this.y;
		var dist = Math.sqrt( (deltaX*deltaX) + (deltaY*deltaY) );
		*/
		this.xv = Math.cos(shipFiring.ang) * RAIL_SPEED + shipFiring.xv;
		this.yv = Math.sin(shipFiring.ang) * RAIL_SPEED + shipFiring.yv;

		this.shotLife = RAIL_LIFE;
	}

	this.superClassMove	=	this.move; //saving reference to parent class' move.
	this.move = function() {
		if(this.shotLife > 0){
			this.shotLife--;
			this.superClassMove();
		}
		if(this.x > canvas.width){
			scoreMultiplier*2;
		}
		if(this.x < 0){
			console.log(scoreMultiplier);
		}
		if(this.y < 0){
			console.log(scoreMultiplier);
		}
		if(this.y > canvas.height){
			console.log(scoreMultiplier);
		}
	}

	this.hitTest = function(thisEnemy) {
		if(this.shotLife <= 0){
			return false;
		}
		if(this.timeUntilCanHitAgain != 0){
			return false;
		}
		return thisEnemy.isOverlappingPoint(this.x, this.y);
	}

	this.draw = function() {
		if(this.shotLife > 0){
			//colorCircle(this.x,this.y, RAIL_DISPLAY_RADIUS, "red");
			colorRect(this.x,this.y,40,3,"red", ship.ang);
		}
	}
}
