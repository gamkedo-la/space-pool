var hyperSpaceThreshold = 20;
var sceneAudio = false
var isJumping = false;
function canHasScene(){
  console.log(blits.length);
  if(blits.length > hyperSpaceThreshold && !isJumping ){
    console.log('y u no work =<');
    Sound.volume('drift', 1);
    Sound.play('drift');
    isJumping = true;
  }
  if(blits.length > hyperSpaceThreshold && cutsceneTimer >= 0){
    isInHyperSpace = true;
		startSliding(-1, 1);
    setTimeout(slideScreen, 500);
    cutsceneTimer--;
    if (cutsceneTimer == 0) {
      roundCounter++;
      if(roundCounter == 1){
        sceneAudio = "tape-1"
      }
      if(roundCounter == 2){
        sceneAudio = "tape-2"
      }
      if(roundCounter == 3){
        sceneAudio = "tape-3"
      }

      if(roundCounter == 4){
        sceneAudio = "tape-4"
        //colorRect(0, 0, canvas.width, canvas.height, "rgba(255,255,255,0.5)");
        //throw "ᗠ‪ᠬƽ━ᒣǁᑦ૙ቬᶩᘰจۤỴͰ⅖ћ";
      }

      Sound.volume("spacepool-low-volume", .5);
      Sound.volume(sceneAudio, 1);
      Sound.play(sceneAudio);
      hyperSpaceThreshold+=10;
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
