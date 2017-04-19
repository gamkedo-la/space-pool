function canHasScene(){
  if(blits.length > 10 && cutsceneTimer > 0){
    breakRecursion = true;
    setTimeout(slideScreen, 500);
    resetRound();
    cutsceneTimer--;
    console.log(cutsceneTimer);
  } else {
    cutsceneTimer = 30;
  }
}
