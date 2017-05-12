var hyperSpaceThreshold = 2;
var sceneAudio = false
var isJumping = false;
function canHasScene(){
  if(asteroidsDestroyedThisRound > hyperSpaceThreshold && !isJumping ){
    Sound.volume('drift', 0.2);
    Sound.play('drift');
    isJumping = true;
  }
  if(asteroidsDestroyedThisRound > hyperSpaceThreshold && cutsceneTimer >= 0){
    isInHyperSpace = true;
		startSliding(-1, 1);
    setTimeout(slideScreen, 500);
    cutsceneTimer--;
    if (cutsceneTimer == 0) {
      roundCounter++;
      if(roundCounter == 1){
        sceneAudio = "mark-1"
      }
      if(roundCounter == 2){
        sceneAudio = "mark-2"
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
        sceneAudio = "mirror-4"
        //colorRect(0, 0, canvas.width, canvas.height, "rgba(255,255,255,0.5)");
        //throw "ᗠ‪ᠬƽ━ᒣǁᑦ૙ቬᶩᘰจۤỴͰ⅖ћ";
      }

      Sound.volume("spacepool-low-volume", .5);
      Sound.volume(sceneAudio, 0.2);
      Sound.play(sceneAudio);
      hyperSpaceThreshold++;
      waveController.startSingleWave();
      resetRound();
    }
  } else if(sceneAudio && Sound.cache[sceneAudio] && Sound.cache[sceneAudio].ended){
    //every, please don't do this. I'm just tired and need to make progress v.v
    //this polymorphism, in this case, is bad
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
