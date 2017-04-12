//ball subtle puff on wall bounce
var particleList=[];
var PARTICLESNUM=5;
var CYCLEANCHOR=4;//MINCYCLE + 1*CYCLEANCHOR = max cyclesLeft
var MINCYCLE=1;
var MINPARTICLESIZE=3;
var GRAVITY_PER_CYCLE=0.1;


function createParticles(){
		for(var i=0;i<PARTICLESNUM;i++){
			var particlesClass = new ParticlesTwoClass();
			if(ship.keyHeld_Gas){
			particlesClass.x=ship.x+ship.x2;
			particlesClass.y=ship.y+ship.y2;	
			particlesClass.x2=ship.x+ship.x3;
			particlesClass.y2=ship.y+ship.y3;
			}
			if(ship.keyHeld_TurnLeft){
			particlesClass.x=ship.x+ship.x2;
			particlesClass.y=ship.y+ship.y2;	
			particlesClass.x2=ship.x+ship.x3;
			particlesClass.y2=ship.y+ship.y3;	
			}
			if(ship.keyHeld_TurnRight){
			particlesClass.x=ship.x+ship.x2;
			particlesClass.y=ship.y+ship.y2;
			particlesClass.x2=ship.x+ship.x3;
			particlesClass.y2=ship.y+ship.y3;
			}
			
			particlesClass.cyclesLeft=MINCYCLE+Math.random()*CYCLEANCHOR;
			particleList.push(particlesClass);

			if(Math.random()<0.5){
				particlesClass.myColor="#7f7677";//burnt red
			} else {
				particlesClass.myColor="#7f7f76";//burnt yellow
			}
			/*particlesClass.random = Math.random();
			var interval=particlesClass.random* (0.7 - 0.3) + 0.3;
			
				if(particlesClass.random<0.3){
					particlesClass.myColor="#e8a3e4";//burnt blue5C5D91
				} else if (interval>0.3 && interval<0.7){
					particlesClass.myColor="#67eaf3"//burnt redA0372D
				} else {
					particlesClass.myColor="red"//burnt yellowA0372D
				}*/
		}
	}

function moveAllParticles(){
	
		for(var i=0;i<particleList.length;i++){
			particleList[i].move();
		}
		for(var i=particleList.length-1;i>=0;i--){
			if(particleList[i].readyToRemove){
				particleList.splice(i,1);			
			}
		}
	}


function drawAllParticles(){

		for(var i=0;i<particleList.length;i++){
			particleList[i].draw();
		}
	}

/*function removeParticles(){
	for(var i=0;i<particleList.length;i++){
		particleList[i].readyToRemove=true;
	}
}*/

function ParticlesTwoClass (){
/*var shipLocation=Ship.move();
		var shipX=shipLocation.shipX;
		var shipY=shipLocation.shipY;*/

//Location for Thrust
this.x;
this.y;
this.x2;
this.y2;
this.myColor;
this.cyclesLeft;
this.velX=2-Math.random()*4;
this.velY=2-Math.random()*4;
this.random=Math.random();

this.readyToRemove=false;

	this.move=function(){
		this.cyclesLeft--;
		if(this.cyclesLeft <0){
			this.readyToRemove=true;
		}
		this.velY+=GRAVITY_PER_CYCLE;
		this.x+=this.velX;
		this.y+=this.velY;
		this.x2+=this.velX;
		this.y2+=this.velY;

		if(this.x<0){
			this.velX*=-1;
		}
		if (this.x>canvas.width){
			this.velX*=-1;
		}
		if(this.y<0){
			this.velY*=-1;
		}
		if(this.y>canvas.height){
			this.velY*=-1;
		}
	}

	this.draw=function(){
		colorRect(this.x,this.y,2,2,this.myColor,ship.ang);
		colorRect(this.x2,this.y2,2,2,this.myColor,ship.ang);
		//MINPARTICLESIZE*this.cyclesLeft/(MINCYCLE+CYCLEANCHOR)
	}
}
