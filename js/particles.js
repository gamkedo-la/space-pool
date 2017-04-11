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
			//particlesClass.x=0.5*canvas.width;
			//particlesClass.y=0.5*canvas.height;
			particlesClass.cyclesLeft=MINCYCLE+Math.random()*CYCLEANCHOR;
			particleList.push(particlesClass);
				if(Math.random()<0.5){
					particlesClass.myColor="red";
				} else {
					particlesClass.myColor="red"
				}
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
this.x=Ship.x;
this.y=Ship.y;
this.myColor;
this.cyclesLeft;
this.velX=2-Math.random()*4;
this.velY=2-Math.random()*4;

this.readyToRemove=false;

	this.move=function(){
		this.cyclesLeft--;
		if(this.cyclesLeft <0){
			this.readyToRemove=true;
		}
		this.velY+=GRAVITY_PER_CYCLE;
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
		//colorRect(this.x,this.y,MINPARTICLESIZE*this.cyclesLeft/(MINCYCLE+CYCLEANCHOR),this.myColor);
	}
}
