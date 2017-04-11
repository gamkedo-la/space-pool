var srcX, srcY, copyW, copyH, destX, destY;
srcX = 200;
srcY = 50;
copyW = 150; //canvas.width/2;
copyH = 150; //canvas.height/2;
destX = 300; //canvas.width/2;
destY = 250; //canvas.height/2;

function basicBlit(){
  hiddenCanvasContext.drawImage(canvas, destX, destY, copyW, copyH,
    srcX, srcY, copyW, copyH);
  canvasContext.drawImage(canvas, srcX, srcY, copyW, copyH,
    destX, destY, copyW, copyH);

  /*
  canvasContext.drawImage(hiddenCanvas, 0, 0, copyW, copyH,
    srcX, srcY, copyW, copyH);
  */
}
