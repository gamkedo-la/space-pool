const UFO_SPEED = 1.9;
const UFO_TIME_BETWEEN_CHANGE_DIR = 85;
const UFO_COLLISION_RADIUS = 30;

UFOClass.prototype = new movingWrapPositionClass();

function UFOClass() {

	this.type = 'ufo';
	this.myShot	=	new	shotClass();
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.xv = 0;
	this.yv = 0;
	this.myUFOPic; // which picture to use
	this.name = "Untitled UFO";

	this.superClassReset = this.reset;
	this.reset = function(whichImage) {
		this.superClassReset();
		this.myUFOPic = whichImage;
		this.speed = 0;
		//this.x = Math.random()*canvas.width;
		//this.y = Math.random()*canvas.height;
		this.x = 300;
		this.y = 300;
		this.cyclesTilDirectionChange = 0;
	} // end of UFOReset func

	this.superClassMove = this.move;
	this.move = function() {
		this.superClassMove();

		this.cyclesTilDirectionChange--;
		if(this.cyclesTilDirectionChange <= 0){
			var randAng = Math.random()*Math.PI*2.0;
			this.xv = Math.cos(randAng) * UFO_SPEED;
			this.yv = Math.sin(randAng) * UFO_SPEED;
			this.cyclesTilDirectionChange = UFO_TIME_BETWEEN_CHANGE_DIR;
		}
	}

	this.isOverlappingPoint = function(testX, testY){
		var deltaX = testX-this.x;
		var deltaY = testY-this.y;
		var dist = Math.sqrt( (deltaX*deltaX) + (deltaY*deltaY) );
		return (dist <= UFO_COLLISION_RADIUS);
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myUFOPic, this.x,this.y, 0);
	}
}
