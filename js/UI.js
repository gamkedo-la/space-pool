var UI = {}
var canvas = document.getElementById('gameCanvas');
var canvasContext = canvas.getContext('2d');
const Stat = require("./Stats");
const Graphics = require("./GraphicsCommon");
const config = require("./config")
UI.drawUI = function drawUI(score, waves, lives) {
  var upperRightText = 'lives: ' + lives + ' ' + 'score: ' + ' ' + score.toString() + ' ' + Stat.scoreMultiplier.toString() + 'x';
  canvasContext.font = "14px Arial";
  Graphics.colorText(upperRightText, canvas.width - 100, 50, 'white');

  if(config.testingCheats){
    canvasContext.textAlign = 'left';
    Graphics.colorText('CHEATS ENABLED, C KEY TO TOGGLE', 80, 50, 'red');
    canvasContext.textAlign = 'center';
  }
}

UI.titleScreen = function titleScreen() {
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
  console.log('Number of Astroids Destroyed: ' + Stat.asteroidsHit);
  console.log('Number of Shots Fired: '+timesShot);
  console.log('Game Average Shots Wrapped: '+Math.floor(avgTimesShotsWrapped));
  console.log('Stat.fuelUsed: ' + Stat.fuelUsed);
  console.log('Accuracy: ' + Math.floor(accuracy*100) + '%');
  //console.log('totalNumberOfShotsFired' + totalNumberOfShotsFired);
  timesShotWrap=0;
  timesShot=0;
  Stat.asteroidsHit=0;
  Stat.fuelUsed=0;
  accuracy=0;
}

module.exports = UI;