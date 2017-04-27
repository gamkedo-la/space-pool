function drawBlits(){
	hiddenCanvasContext.drawImage(canvas, 0, 0);
  for(var i = 0; i < blits.length; i++){
    blits[i].draw();
    if(blits.length > maxBlits && randomInteger(1,100) > 80){
      //blits.splice(i, 1);
      console.log(blits.length);
    }
  }
}

function moveBlits(){
  for(var i = 0; i < blits.length; i++){
    blits[i].move();
  }
}

function clearAllBlits(){
  blits = [];
}

function Blit(srcX, srcY, copyW, copyH, destX, destY){
  this.blitTimer = 0;
  this.lifespan = 60
  this.srcX = srcX;
  this.srcY = srcY;
  this.copyW = copyW;
  this.copyH = copyH;
  this.destX = destX;
  this.destY = destY;
  this.reset = function(){};

  this.move = function(){
    if(this.blitTimer < this.lifespan){
      this.blitTimer = this.blitTimer + 1;
      this.destX = this.destX + randomInteger(1, 10);

    } else if (this.blitTimer == this.lifespan) {
      this.destX = randomInteger(1, canvas.width);

      this.lifespan = randomInteger(1, 200);
      this.blitTimer = 0;
    }
  }

  this.draw = function(){
    if(this.blitTimer == this.lifespan){
      colorRect(this.destX, this.destY, this.copyW, this.copyH, "rgba(255,255,255,0.5)");
    } else {
      canvasContext.drawImage(hiddenCanvas, this.srcX, this.srcY, this.copyW, this.copyH,
        this.destX, this.destY, this.copyW, this.copyH);
    }
  }
}
