function drawBlits(){
  for(var i = 0; i < blits.length; i++){
    blits[i].draw();
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
  }

  this.draw = function(){
    //hiddenCanvasContext.drawImage(canvas, this.destX, this.destY, this.copyW, this.copyH, 0, 0, this.copyW, this.copyH );
    canvasContext.drawImage(canvas, this.srcX, this.srcY, this.copyW, this.copyH,
      this.destX, this.destY, this.copyW, this.copyH);
    // canvasContext.drawImage(hiddenCanvas, 0, 0, this.copyW, this.copyH,
    //   this.srcX, this.srcY, this.copyW, this.copyH);

    if(this.blitTimer < this.lifespan){
      this.blitTimer = this.blitTimer + 1;
      this.destX = this.destX + randomInteger(1, 10)
      
    } else if (this.blitTimer == this.lifespan) {
      this.destX = randomInteger(1, 600);
      console.log("DestX: " + this.destX)
      this.lifespan = randomInteger(1, 200);
      colorRect(this.destX, this.destY, this.copyW, this.copyH, "rgba(255,255,255,0.5)");
      this.blitTimer = 0;
    }
  }
}
