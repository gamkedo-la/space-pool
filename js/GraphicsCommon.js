var gfx = {}
var canvas = document.getElementById('gameCanvas');
var canvasContext = canvas.getContext('2d');
gfx.drawBitmapCenteredWithRotation = function drawBitmapCenteredWithRotation(useBitmap, atX,atY, withAng) {
  canvasContext.save();
  canvasContext.translate(atX,atY);
  canvasContext.rotate(withAng);
  canvasContext.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
  canvasContext.restore();
}

gfx.darkenRect = function darkenRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor, withAng) {
  canvasContext.save();
  canvasContext.globalCompositeOperation = 'darken';
  canvasContext.fillStyle = fillColor;
  canvasContext.translate(topLeftX,topLeftY); // added, sets position 'after' rotation
  canvasContext.rotate(withAng);
  canvasContext.fillRect(0, 0, boxWidth,boxHeight);
  canvasContext.restore();
}

gfx.colorRect = function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor, withAng) {
  canvasContext.save();
  canvasContext.fillStyle = fillColor;
  canvasContext.translate(topLeftX,topLeftY); // added, sets position 'after' rotation
  canvasContext.rotate(withAng);
  canvasContext.fillRect(0, 0, boxWidth,boxHeight);
  canvasContext.restore();
}

gfx.colorCircle = function colorCircle(centerX,centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

gfx.colorText = function colorText(showWords, textX,textY, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX,textY);
}

gfx.drawLines = function drawLines(fillColor, pointArray) {
  canvasContext.beginPath();
  canvasContext.moveTo(pointArray[0].x, pointArray[0].y);
  for (var i = 1; i < pointArray.length; i++) {
    canvasContext.lineTo(pointArray[i].x, pointArray[i].y);
  }
  canvasContext.strokeStyle = fillColor;
  canvasContext.closePath();
  canvasContext.stroke();
}

module.exports = gfx;
