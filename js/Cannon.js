const NUMBER_OF_SHOTS = 1;

function cannonClass(){
  this.shotArray = [];

  this.cannonFire = function(ship){
    if(this.shotArray.length < NUMBER_OF_SHOTS) {
      if(railGunActive){
        var tempShot = new railSlugClass(ship);
      }
      this.shotArray.push(tempShot);
      tempShot.reset();
    }
  }

  this.iterateShotsandColliders = function(colliders, ship){
    this.iterateThroughShotArray(colliders, ship);
    this.removeDeadShots(this.shotArray);
  }

  this.iterateThroughShotArray = function(colliders, ship){
    if(colliders.length < (START_NUMBER_OF_ASTEROIDS/2)){
      spawnAndResetAsteroids();
    }
    for(var i = 0; i < this.shotArray.length; i++){
      if(this.shotArray[i].isShotReadyToFire()){
        this.shotArray[i].shootFrom(ship);
      }

      if( this.shotArray[i].hitTest(ship) ) {
        resetGame();
      }

      for(var currentCollider = 0; currentCollider < colliders.length; currentCollider++){
        if( this.shotArray[i].hitTest(colliders[currentCollider]) && colliders[currentCollider].invicibilityTimer == 0) {

          scoreMultiplierLifeSpan = MULTIPLIER_LIFESPAN;

          colliders[currentCollider].hp -= this.shotArray[i].attackValue;
          if(colliders[currentCollider].hp < 0){
            this.shotArray[i].countdownTimeUntilCanHitAgain();

            destroyAsteroid(colliders, colliders[currentCollider], currentCollider);
          }

          if(colliders[currentCollider].size == 'big'){
            this.shotArray[i].reset();
          }

          score += 100 * scoreMultiplier;
        }
      }//loop through colliders.
      if(this.shotArray[i].shotLife > 0){
        this.shotArray[i].move();
      }
    }
  }

  this.removeDeadShots = function(){
    for(var i = this.shotArray.length-1; i >= 0; i--){
     if(this.shotArray[i].shotLife < 1){
       this.shotArray.splice(i,1);
     }
    }
  }

  this.drawShots = function(){
    for(var i = 0; i< this.shotArray.length; i++){
      if(this.shotArray[i].shotLife > 0){
        this.shotArray[i].draw();
      }
    }
  }
}
