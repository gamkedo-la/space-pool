var sceneAudio = false
function canHasScene(){
  if(blits.length > 10 && cutsceneTimer >= 0){
    breakRecursion = false;
    setTimeout(slideScreen, 500);
    cutsceneTimer--;
    console.log(cutsceneTimer);
    if (cutsceneTimer == 0) {
      roundCounter++;
      if(roundCounter == 1){
        sceneAudio = "daeve-2" 
      }
      if(roundCounter == 2){
        sceneAudio = "daeve-3"
      }
      if(roundCounter == 3){
        sceneAudio = "daeve-4"
      } 

      if(roundCounter == 4){
        colorRect(0, 0, canvas.width, canvas.height, "rgba(255,255,255,0.5)");
        throw "ᗠ‪ᠬƽ━ᒣǁᑦ૙ቬᶩᘰจۤỴͰ⅖ћ"
      }

      Sound.volume(sceneAudio, .2);
      Sound.play(sceneAudio);
      resetRound();
    }
  } else if(sceneAudio && Sound.cache[sceneAudio] && Sound.cache[sceneAudio].ended){
    //every, please don't do this. I'm just tired and need to make progress v.v
    //this polymorphism, in this case, is bad
    sceneAudio = false;
    breakRecursion = true;
    console.log("Round: ", roundCounter)
  }else {
    cutsceneTimer = 300;
    console.log(cutsceneTimer);
    

    //if()
  }
}
