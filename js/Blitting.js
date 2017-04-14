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

  this.srcX = srcX;
  this.srcY = srcY;
  this.copyW = copyW;
  this.copyH = copyH;
  this.destX = destX;
  this.destY = destY;

  this.reset = function(){};

  this.move = function(){
    if(this.blitTimer < 60){
      this.blitTimer++;
      console.log(this.blitTimer);
    } else if (this.blitTimer == 60) {
      colorRect(this.srcX, this.srcY, this.copyW, this.copyH, "rgba(255,255,255,0.5)");
      this.blitTimer = 0;
    }
  }

  this.draw = function(){
    console.log('I should be called lots and lots, no love?');
    hiddenCanvasContext.drawImage(canvas, this.destX, this.destY, this.copyW, this.copyH, 0, 0, this.copyW, this.copyH );
    canvasContext.drawImage(canvas, this.srcX, this.srcY, this.copyW, this.copyH,
      this.destX, this.destY, this.copyW, this.copyH);
    canvasContext.drawImage(hiddenCanvas, 0, 0, this.copyW, this.copyH,
      this.srcX, this.srcY, this.copyW, this.copyH);
  }
}
