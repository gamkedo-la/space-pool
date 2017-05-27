var hyperSpaceThreshold = 2;
var sceneAudio = false
var isJumping = false;
var playEnding = false;
var endingTimer = 300;
var poemIntroCounter = 200;

function endingGlitch(){
  endingTimer--;
  if(endingTimer == 0){
    showingEndingScreen = true;
  }
  var tempBlit = new Blit(randomInteger(1, canvas.width), randomInteger(0, canvas.height), canvas.width, randomInteger(1, 150), randomInteger(1, 600), randomInteger(0, canvas.height));
  blits.push(tempBlit);
  var tempBlit = new Blit(randomInteger(1, 600), 0, randomInteger(1, 150), canvas.height, randomInteger(1, 600), 0);
  blits.push(tempBlit);
}

function canHasScene(){
  console.log(roundCounter);
  if(showingPoemIntro){
    poemIntroCounter--;
  }
  if(poemIntroCounter == 0){
    showingPoemIntro = false;
    poemIntroCounter = 300;
  }
  if(playEnding){
    endingGlitch();
  }
  if(largeAsteroidsDestroyedThisRound > hyperSpaceThreshold && !isJumping ){
    Sound.volume('drift', 0.2);
    Sound.play('drift');
    isJumping = true;
  }
  if(isInHyperSpace == false){
    if(largeAsteroidsDestroyedThisRound > hyperSpaceThreshold){
      startHyperSpace();
    }
  }
  else if(cutsceneTimer >= 0){
    updateHyperSpace();
  } else if(sceneAudio && Sound.cache[sceneAudio] && Sound.cache[sceneAudio].ended){
    //BOOLEAN FOR ISIN HYPERSPACE
    Sound.volume("spacepool-low-volume", 1);
    sceneAudio = false;
    breakRecursion = true;
    isJumping = false;
    stopSliding();
  }else {
    cutsceneTimer = 500;
    isInHyperSpace = false;
  }
}

function startHyperSpace(){
  if(isInHyperSpace){
    return;
  }

  setTimeout(startSlideScreen, 500);

  cutsceneTimer = 500;
  isInHyperSpace = true;

}

function startSlideScreen(){
  if(debugBoolTurnOffSlide == false){
      startSliding(-1, 1);
  }
}

function updateHyperSpace(){
  cutsceneTimer--;
  if (cutsceneTimer == 0) {
    roundCounter++;
    if(roundCounter == 1){
      sceneAudio = "mark-1"
    }
    if(roundCounter == 2){
      sceneAudio = "mark-2"
      window.localStorage.setItem('enableLevelSelect', 'Yeah, sure');
    }
    if(roundCounter == 3){
      sceneAudio = "mark-3"
    }
    if(roundCounter == 4){
      sceneAudio = "mark-4"
    }
    if(roundCounter == 5){
      sceneAudio = "tape-1"
    }
    if(roundCounter == 6){
      sceneAudio = "tape-2"
    }
    if(roundCounter == 7){
      sceneAudio = "tape-3"
    }
    if(roundCounter == 8){
      sceneAudio = "tape-4"
    }
    if(roundCounter == 9){
      sceneAudio = "mirror-1"
    }
    if(roundCounter == 10){
      sceneAudio = "mirror-2"
    }
    if(roundCounter == 11){
      sceneAudio = "mirror-3"
    }
    if(roundCounter == 12){
      playEnding = true;
      sceneAudio = "mirror-4"
      colorRect(0, 0, canvas.width, canvas.height, "rgba(255,255,255,0.5)");
      //throw "ᗠ‪ᠬƽ━ᒣǁᑦ૙ቬᶩᘰจۤỴͰ⅖ћ";
    }

    Sound.volume("spacepool-low-volume", .5);
    Sound.volume(sceneAudio, 0.2);
    Sound.play(sceneAudio);
    hyperSpaceThreshold++;
    if(playEnding == false){
      showingPoemIntro = true;
      if(poemSubThoughtCounter > 3){
        poemThoughtCounter++;
        poemSubThoughtCounter = 0;
      }
      poemSubThoughtCounter++;
      waveController.startSingleWave();
      resetRound();
    }
  }
}
