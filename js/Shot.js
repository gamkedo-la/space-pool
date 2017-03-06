const SHOT_SPEED = 6.0;
const SHOT_LIFE = 30;
const SHOT_DISPLAY_RADIUS = 3;

shotClass.prototype = new movingWrapPositionClass();

function shotClass() {
	this.attackValue = 1;
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.xv = 0;
	this.yv = 0;

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

	this.shootFrom = function(shipFiring){
		this.x = shipFiring.x;
		this.y = shipFiring.y;
		if(this.shotLife){
			this.x = shipFiring.x;
			this.y = shipFiring.y;
		}

		this.xv = 0;
		this.yv = 0;
		this.xv = Math.cos(shipFiring.ang) * SHOT_SPEED + shipFiring.xv;
		this.yv = Math.sin(shipFiring.ang) * SHOT_SPEED + shipFiring.yv;

		this.shotLife = SHOT_LIFE;
	}

	this.superClassMove	=	this.move; //saving reference to parent class' move.
	this.move = function() {
		if(this.shotLife > 0){
			this.shotLife--;
			this.superClassMove();
		}
	}

	this.hitTest = function(thisEnemy) {
		if(this.shotLife <= 0){
			return false;
		}
		return thisEnemy.isOverlappingPoint(this.x, this.y);
	}

	this.draw = function() {
		if(this.shotLife > 0){
			//colorCircle(this.x,this.y, SHOT_DISPLAY_RADIUS, "red");
			colorRect(this.x,this.y,10,2,"red");
		}
	}
}
