function setDrawColors(canvasContext) {
  canvasContext.lineWidth = 2;
  canvasContext.strokeStyle = 'rgba(255,255,255,0.3)';
  canvasContext.fillStyle = 'rgba(200,200,255,0.035)';
  canvasContext.shadowColor = '#ffffff';
  canvasContext.shadowBlur = 8;
  canvasContext.shadowOffsetX = 0;
  canvasContext.shadowOffsetY = 0;
}

function drawBitmapCenteredWithRotation(useBitmap, atX,atY, withAng) {
  canvasContext.save();
  canvasContext.translate(atX,atY);
  canvasContext.rotate(withAng);
  canvasContext.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
  canvasContext.restore();
}

function darkenRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor, withAng) {
  canvasContext.save();
  canvasContext.globalCompositeOperation = 'darken';
  canvasContext.fillStyle = fillColor;
  canvasContext.translate(topLeftX,topLeftY); // added, sets position 'after' rotation
  canvasContext.rotate(withAng);
  canvasContext.fillRect(0, 0, boxWidth,boxHeight);
  canvasContext.restore();
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor, withAng) {
  canvasContext.save();
  canvasContext.fillStyle = fillColor;
  canvasContext.translate(topLeftX,topLeftY); // added, sets position 'after' rotation
  canvasContext.rotate(withAng);
  canvasContext.fillRect(0, 0, boxWidth,boxHeight);
  canvasContext.restore();
}

function colorRotatedRect(centerX,centerY, boxWidth,boxHeight, fillColor, withAng) {
  canvasContext.save();
  canvasContext.fillStyle = fillColor;
  canvasContext.translate(centerX,centerY); // added, sets position 'after' rotation
  canvasContext.rotate(withAng);
  canvasContext.fillRect(-boxWidth / 2,-boxHeight / 2, boxWidth,boxHeight);
  canvasContext.restore();
}

function colorCircle(centerX,centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function strokeCircle(centerX,centerY, radius, fillColor) {
  canvasContext.strokeStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY, radius, 0, Math.PI * 2, true);
  canvasContext.stroke();
}

function colorText(showWords, textX,textY, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX,textY);
}

function drawLines(fillColor, pointArray) {
  canvasContext.beginPath();
  canvasContext.moveTo(pointArray[0].x, pointArray[0].y);
  for (var i = 1; i < pointArray.length; i++) {
    canvasContext.lineTo(pointArray[i].x, pointArray[i].y);
  }
  canvasContext.strokeStyle = fillColor;
  canvasContext.closePath();
  canvasContext.stroke();
}
