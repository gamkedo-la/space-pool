//ball subtle puff on wall bounce
var particleList=[];
var PARTICLESNUM=60;
var GRAVITY_PER_CYCLE=0.1;
const MINCYCLE=1;
const CYCLEANCHOR=4;//MINCYCLE + 1*CYCLEANCHOR = max cyclesLeft


function createParticles(x1, y1, lifeCycles, speedMult=1.0){
		if(lifeCycles === undefined){
			lifeCycles = MINCYCLE+Math.random()*CYCLEANCHOR;
		}
		for(var i=0;i<PARTICLESNUM;i++){
			var particlesClass = new ParticlesTwoClass(speedMult);
			particlesClass.x=x1;
			particlesClass.y=y1;

			particlesClass.cyclesLeft=lifeCycles;
			particleList.push(particlesClass);

			if(Math.random()<0.5){
				particlesClass.myColor="#ED1313";//red
			} else {
				particlesClass.myColor="#E4E418  ";//yellow
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

function ParticlesTwoClass (speedMult){
/*var shipLocation=Ship.move();
		var shipX=shipLocation.shipX;
		var shipY=shipLocation.shipY;*/

//Location for Thrust
this.x;
this.y;

this.myColor;
this.cyclesLeft;
this.velX=(2-Math.random()*4)*speedMult;
this.velY=(2-Math.random()*4)*speedMult;
this.random=Math.random();

this.readyToRemove=false;

	this.move=function(){
		this.cyclesLeft--;
		if(this.cyclesLeft <0){
			this.readyToRemove=true;
		}
		//this.velY+=GRAVITY_PER_CYCLE;
		this.x+=this.velX;
		this.y+=this.velY;

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
		const MINPARTICLESIZE=3;
		const RECTWIDTH=-(4+MINPARTICLESIZE*this.cyclesLeft/(MINCYCLE+CYCLEANCHOR));
		const RECTHEIGHT=MINPARTICLESIZE*this.cyclesLeft/(MINCYCLE+CYCLEANCHOR);

		colorRect(this.x,this.y,RECTWIDTH,RECTHEIGHT,this.myColor,0);
	}
}
