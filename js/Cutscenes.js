function canHasScene(){
  if(blits.length > 10 && cutsceneTimer >= 0){
    /*
    breakRecursion = true;
    setTimeout(slideScreen, 500);
    */
    cutsceneTimer--;
    console.log(cutsceneTimer);
    if (cutsceneTimer == 0) {
      roundCounter++;
      if(roundCounter == 1){
        Sound.volume("daeve-2", .2);
        Sound.play("daeve-2");
      }
      if(roundCounter == 2){
        Sound.volume("daeve-3", .2);
        Sound.play("daeve-3");
      }
      if(roundCounter == 3){
        Sound.volume("daeve-4", .2);
        Sound.play("daeve-4");  
      }
      resetRound();
    }
  } else {
    cutsceneTimer = 300;
    console.log(cutsceneTimer);
  }
}
