function drawUI() {
  var upperRightText = 'lives: ' + lives + ' ' + 'score: ' + ' ' + score.toString() + ' ' + scoreMultiplier.toString() + 'x';
  canvasContext.font = "14px Arial";
  colorText(upperRightText, canvas.width - 100, 50, 'white');
  if(testingCheats){
    canvasContext.textAlign = 'left';
    colorText('CHEATS ENABLED, C KEY TO TOGGLE', 80, 50, 'red');
    canvasContext.textAlign = 'center';
  }
}

function titleScreen() {
  var titleText = "space pool";
  var subText = "up to increase speed, left and right to turn";
  var subSubText = "space to fire, enter to start";
  canvasContext.fillStyle = "white";
  canvasContext.textAlign = "center";
  canvasContext.font = "14px Arial";
  canvasContext.fillText((subText), canvas.width / 2, 270);
  canvasContext.font = "14px Arial";
  canvasContext.fillText((subSubText), canvas.width / 2, 300);
  canvasContext.font = "20px Arial";
  canvasContext.fillText((titleText), canvas.width / 2, 250);
}

function gameOverScreen() {
  var titleText;
  if (lives == 0) {
    titleText = "game over"
  }
  else {
    titleText = "ouch you died!"
  }
  var subText = "score: " + endScore + " waves reached: " + endWave;
  var subSubText = "press enter to reset";
  canvasContext.fillStyle = "white";
  canvasContext.textAlign = "center";
  canvasContext.font = "14px Arial";
  if (lives == 0) {
    canvasContext.fillText((subText), canvas.width / 2, 270);
  }
  canvasContext.font = "14px Arial";
  canvasContext.fillText((subSubText), canvas.width / 2, 300);
  canvasContext.font = "20px Arial";
  canvasContext.fillText((titleText), canvas.width / 2, 250);
  Stats();
  console.log('Number of Astroids Destroyed: ' + asteroidsHit);
  console.log('Number of Shots Fired: '+timesShot);
  console.log('Game Average Shots Wrapped: '+Math.floor(avgTimesShotsWrapped));
  console.log('FuelUsed: ' + fuelUsed);
  console.log('Accuracy: ' + Math.floor(accuracy*100) + '%');
  timesShotWrap=0;
  timesShot=0;
  asteroidsHit=0;
  fuelUsed=0;
  accuracy=0;
}
