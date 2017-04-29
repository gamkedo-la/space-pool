var sceneAudio = false
function canHasScene(){
  if(blits.length > 10 && cutsceneTimer >= 0){
		startSliding(-1, 1);
    setTimeout(slideScreen, 500);
    cutsceneTimer--;
    console.log("cutsceneTimer: "+cutsceneTimer);
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
      resetRound();
    }
  } else if(sceneAudio && Sound.cache[sceneAudio] && Sound.cache[sceneAudio].ended){
    //every, please don't do this. I'm just tired and need to make progress v.v
    //this polymorphism, in this case, is bad
    Sound.volume("spacepool-low-volume", 1);
    sceneAudio = false;
    breakRecursion = true;
    console.log("Round: ", roundCounter);
  }else {
    cutsceneTimer = 300;
//    console.log(cutsceneTimer);
  }
}
