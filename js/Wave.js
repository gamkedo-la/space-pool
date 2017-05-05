var waveController; //Initialized in window.onLoad

function WaveController(){
	this.initialSpeed = 0.03;
	this.speed = this.initialSpeed;
	this.active = false;
	this.scale = 1;
	this.doubleWave = false;
  this.reset = function(){};

	//Setup a new canvas to hold the gradient image
  this.gradientCanvas = document.createElement('canvas');
  this.gradientCanvas.id = 'gradientCanvas';
  this.gradientCanvas.style.display = 'none';
  this.gradientCanvasContext = this.gradientCanvas.getContext('2d');
  this.gradientCanvas.width = canvas.width;
  this.gradientCanvas.height = canvas.width;

	//Draw the gradient to gradientCanvas
	setupGradient(this.gradientCanvasContext);

	//Create a new outbound wave
  this.startSingleWave = function(){
		this.doubleWave = false;
		this.initializeWave();
  };

	//Create a new outbound returning wave
  this.startDoubleWave = function(){
		this.doubleWave = true;
		this.initializeWave();
  };

	//Reset wave parameters and start the wave
	this.initializeWave = function(){
		this.active = true;
		this.scale = 0.01;
		this.speed = this.initialSpeed;
	}

  this.drawWave = function(){
		if(this.active){
			var size = canvas.width * this.scale;
			canvasContext.drawImage(this.gradientCanvas, canvas.width/2 - size/2, canvas.height/2 - size/2, size, size);
			this.scale += this.speed;

			//Wave is at max size
			if(this.scale >= 1.415){//diagonal of a square = sqrt(2)
				stopSliding();
				if(this.doubleWave){ //Returns the wave
					this.speed = -this.initialSpeed;
				}
				else{ //Kills the wave
					this.active = false;
				}
			}
			else if(this.scale < 0){ //Kills the wave and resets parameters for next wave
				this.active = false;
			}
		}
  };
}

function setupGradient(context){
	var coord = canvas.width/2;
	var waveWidth = 30;
  var gradient = context.createRadialGradient(coord, coord, coord - waveWidth, coord, coord, coord);
  gradient.addColorStop(0, "black");
  gradient.addColorStop(1, "white");

  context.arc(coord, coord, coord, 0, 2 * Math.PI);

  context.fillStyle = gradient;
  context.fill();
}
