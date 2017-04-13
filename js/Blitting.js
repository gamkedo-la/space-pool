var blitTimer = 0;

function basicBlit(){
  var srcX, srcY, copyW, copyH, destX, destY;
  srcX = 0;
  srcY = 0;
  copyW = 150; //canvas.width/2;
  copyH = canvas.height; //canvas.height/2;
  destX = 300; //canvas.width/2;
  destY = 0; //canvas.height/2;

  hiddenCanvasContext.drawImage(canvas, destX, destY, copyW, copyH, 0, 0, copyW, copyH );
  canvasContext.drawImage(canvas, srcX, srcY, copyW, copyH,
    destX, destY, copyW, copyH);
  canvasContext.drawImage(hiddenCanvas, 0, 0, copyW, copyH,
    srcX, srcY, copyW, copyH);

  if(blitTimer < 60){
    blitTimer++;
    console.log(blitTimer);
  } else if (blitTimer == 60) {
    colorRect(srcX, srcY, 150, canvas.height, "rgba(255,255,255,0.5)");
    blitTimer = 0;
  }
}
