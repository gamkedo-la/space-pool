function movingWrapPositionClass() {
	this.x = 150;
	this.y = 150;
	this.xv = 0;
	this.yv = 0;

	this.reset = function() {
		this.xv	=	this.yv	=	0.0;
		this.x = canvas.width/2;
		this.y = canvas.height/2;
	} // end of reset func

	this.handleScreenWrap = function(){
		if(this.x > canvas.width){
			this.x = 0;
		}
		if(this.x < 0){
			this.x = canvas.width;
		}
		if(this.y < 0){
			this.y = canvas.height;
		}
		if(this.y > canvas.height){
			this.y = 0;
		}
	}

	this.move = function() {
		this.x += this.xv;
		this.y += this.yv;
		this.handleScreenWrap();
	}
}
