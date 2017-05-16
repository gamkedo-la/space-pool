var credits = [
  {
    name: 'alright',
    work: 'particle system implementation'
  },
  {
    name: 'ashcatmeowmeow',
    work: 'project lead, programming, game design, writing'
  },
  {
    name: 'ccolongames',
    work: 'title screen imagery'
  },
  {
    name: 'chreeshendolo',
    work: 'sound system creation'
  },
  {
    name: 'chris_deleon',
    work: 'debugging assisting, coaching'
  },
  {
    name: 'dedricksarzaba',
    work: 'SFX creation, implementation'
  },
  {
    name: 'mcfunkypants',
    work: 'gamepad support, retro overlay fx, sfx, asteroid wrapping mechanic'
  },
  {
    name: 'nick',
    work: 'performance enhancements, wave effect, glitching'
  },
  {
    name: 'sdonai',
    work: 'writing, shot wrapping, project compilation, performance enhancements, cutscene implementation'
  },
  {
    name: 'spadxiii',
    work: 'proceedurally drawn asteroids, collision detection, vector ship'
  },
  {
    name: 'thelegendarysquare',
    work: 'background music track'
  },
  {
    name: 'zak-a',
    work: 'pause menu, quit button'
  }
]



/*
alright - particle system implementation
ashcatmeowmeow - project lead, programming, game design, writing
ccolongames - title screen imagery
chreeshendolo - sound system creation

dedricksarzaba - SFX creation, implementation
mcfunkypants - gamepad support, retro overlay fx, sfx, asteroid wrapping mechanic
*nick - performance enhancements, wave effect, glitching
sdonai - writing, shot wrapping, project compilation, performance enhancements, cutscene implementation
spadxiii - proceedurally drawn asteroids, collision detection, vector ship
thelegendarysquare - music
zak-a - pause menu (edited)
*/


var cursorOnStartGame = true;
var poemThoughtCounter = 1;
var poemSubThoughtCounter = 0;
function poemIntros(roundCounter){
  var poemIntroText = 'T H O U G H T '+ poemThoughtCounter + '.' + poemSubThoughtCounter;
  canvasContext.fillStyle = "white";
  canvasContext.textAlign = "center";
  canvasContext.font = "14px Arial";
  canvasContext.fillText(poemIntroText, canvas.width / 2, canvas.height/2 - 30);
}

function endingScreen(){
  var endingText = "‪ᠬ  ƽ  ᒣ  ǁ  ᑦ  ૙   E  N  D   ቬ ᶩ ᘰ จ ۤỴ Ͱ⅖ ћ";
  canvasContext.fillStyle = "white";
  canvasContext.textAlign = "center";
  canvasContext.font = "14px Arial";
  canvasContext.fillText(endingText, canvas.width / 2, canvas.height/2);
}

function creditsScreen(){
  //console.log(credits[0].name);
  var title = "CREDITS";
  var namePos = 100;
  var workPos = 120;
  var leftPos = 20;
  canvasContext.fillStyle = "white";
  canvasContext.textAlign = "left";
  canvasContext.font = "36px Arial";
  canvasContext.fillText(title, 20, 50);
  for(var i = 0; i < credits.length/2; i++){
    canvasContext.font = "18px Arial";
    canvasContext.fillText(credits[i].name.toUpperCase(), leftPos, namePos);
    canvasContext.font = "14px Arial";
    canvasContext.fillText(credits[i].work, leftPos, workPos);
    namePos += 60;
    workPos += 60;
  }
  leftPos = 500;
  var namePos = 100;
  var workPos = 120;
  for(var i = credits.length/2; i < credits.length; i++){
    canvasContext.font = "18px Arial";
    canvasContext.fillText(credits[i].name.toUpperCase(), leftPos, namePos);
    canvasContext.font = "14px Arial";
    canvasContext.fillText(credits[i].work, leftPos, workPos);
    namePos += 60;
    workPos += 60;
  }
}

function drawUI() {
  var upperRightText = 'lives: ' + lives + ' ' + 'score: ' + ' ' + score.toString() + ' ' + scoreMultiplier.toString() + 'x';
  canvasContext.font = "14px Arial";
  //colorText(upperRightText, canvas.width - 100, 50, 'white'); //REMOVING SCORE TEMPORARILY TO DEGAMIFY
  if(testingCheats){
    canvasContext.textAlign = 'left';
    colorText('CHEATS ENABLED, C KEY TO TOGGLE', 80, 50, 'red');
    canvasContext.textAlign = 'center';
  }
}

function titleScreen() {
  var cursorX = 0;
  var cursorY = 0;
  var titleText = "Drift Bravely";
  var subText = "CONTENT WARNING: FLASHING IMAGES, DISORIENTING GRAPHICS";
  var subSubText = "START";
  var subSubSubText = "CREDITS";
  drawBitmapCenteredWithRotation(titlePic, canvas.width / 2, 250);
  if(cursorOnStartGame){
    cursorX = (canvas.width / 2) - 60;
    cursorY = 390;
  }
  if(!cursorOnStartGame){
    cursorX = (canvas.width / 2) - 70;
    cursorY = 420;
  }
  drawBitmapCenteredWithRotation(shipPic, cursorX , cursorY);
  canvasContext.fillStyle = "white";
  canvasContext.textAlign = "center";
  canvasContext.font = "14px Arial";
  canvasContext.fillText((subText), canvas.width / 2, 300);
  canvasContext.font = "20px Arial";
  canvasContext.fillText((subSubText), canvas.width / 2, 400);
  canvasContext.fillText((subSubSubText), canvas.width / 2, 430);

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
  /*
  timesShotWrap=0;
  timesShot=0;
  asteroidsHit=0;
  fuelUsed=0;
  accuracy=0;
  */
}

function inGameMenu (titleText, subText){
  colorRotatedRect(canvas.width/2, canvas.height/2, canvas.width * 0.90, canvas.height * 0.90, 'rgba(64,64,64,0.1)',0 );
  canvasContext.fillStyle = "white";
  canvasContext.textAlign = "center";
  canvasContext.font = "20px Arial";
  canvasContext.fillText(titleText, canvas.width / 2, 250);
  canvasContext.font = "14px Arial";
  canvasContext.fillText(subText, canvas.width / 2, 270);
}


function pauseScreen() {
  inGameMenu("Game Paused", "press P to continue");
}

function quitScreen() {
  inGameMenu("Quit?","press Q to Quit or ESC to keep drifting bravley");
}
