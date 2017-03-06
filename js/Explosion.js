const EXPLOSION_SPEED = 6.0;
const EXPLOSION_LIFE = 30;
const EXPLOSION_DISPLAY_RADIUS = 30;

function resetExplosions(){
	for(var i = 0; i < explosions.length; i++){
		explosions[i].reset(explosionPic);
	}
}

function drawExplosions(){
	for(var i = 0; i < explosions.length; i++){
		explosions[i].draw();
	}
}

explosionClass.prototype = new movingWrapPositionClass();

function explosionClass() {
	this.attackValue = 4;
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.xv = 0;
	this.yv = 0;

	this.explosionLife = 30

	this.superClassReset = this.reset;
	this.reset = function(whichImage) {
		this.superClassReset();
    this.myExplosionPic = whichImage;
		this.explosionLife = 0;
	} // end of explosionReset func

	this.isExplosionReadyToFire = function(){
		if(this.explosionLife <= 0){
			return true;
		}
	}

	this.explodeAtPoint = function(point){
		this.x = point.x;
		this.y = point.y;
	}

	this.superClassMove	=	this.move; //saving reference to parent class' move.
	this.move = function() {
		if(this.explosionLife > 0){
			this.explosionLife--;
			this.superClassMove();
		}
	}

	this.hitTest = function(thisEnemy) {
		if(this.explosionLife <= 0){
			return false;
		}
		return thisEnemy.isOverlappingPoint(this.x, this.y);
	}

	this.draw = function() {
		//if(this.explosionLife > 0){
			console.log('meow');
			drawBitmapCenteredWithRotation(this.myExplosionPic, this.x,this.y, this.ang);
			//colorCircle(this.x, this.y, 10, 'yellow');
		//}
	}
}
