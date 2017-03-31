const NUMBER_OF_SHOTS = 1;
var railGunActive = true; //POSSIBILTURU OF MOAR WEAPONS?! :D
const Stat = require("./Stats");
const RailSlug = require("./RailSlug");
function Cannon() {
  this.shotArray = [];

  this.clearShots = function() {
    this.shotArray = [];
  };

  this.cannonFire = function(ship) {
    Stat.totalNumberOfShotsFired++;

    if (this.shotArray.length < NUMBER_OF_SHOTS) {
      if (railGunActive) {
        var tempShot = new RailSlug();
      }
      this.shotArray.push(tempShot);
      tempShot.reset();
    }
  };

  this.iterateShotsandColliders = function(colliders, ship) {
    this.iterateThroughShotArray(colliders, ship);
    this.removeDeadShots(this.shotArray);
  };

  this.iterateThroughShotArray = function(colliders, ship) {
    for (var i = 0; i < this.shotArray.length; i++) {
      if (this.shotArray[i].isShotReadyToFire()) {
        this.shotArray[i].shootFrom(ship);
      }

      if (this.shotArray[i].hitTest(ship)) {
        if (Stat.lives == 0) {
          resetGame();
        }
        else {
          resetRound();
          if (Stat.lives > 0) {
            Stat.lives--;
          }
        }
        return; // bail to avoid null this.shotArray[i]
      }

      for (var currentCollider = 0; currentCollider < colliders.length; currentCollider++) {
        if (this.shotArray[i].hitTest(colliders[currentCollider]) && colliders[currentCollider].invincibilityTimer == 0) {

          colliders[currentCollider].hp -= this.shotArray[i].attackValue;
          if (colliders[currentCollider].hp < 0) {
            this.shotArray[i].countdownTimeUntilCanHitAgain();
            colliders[currentCollider].explode(colliders);
            Stat.numberOfSuccessfulShots++;
          }

          //allows 2nd wrapped shot to keep going
          if (colliders[currentCollider].radius >= config.ASTEROID_MIN_RADIUS_TO_EXPLODE_INTO_ASTEROIDS && Stat.scoreMultiplier != 4) {
            this.shotArray[i].reset();
          }

          score += 100 * Stat.scoreMultiplier;
        }
      }//loop through colliders.
      if (this.shotArray[i].shotLife > 0) {
        this.shotArray[i].move();
      }
    }
  };

  this.removeDeadShots = function() {
    for (var i = this.shotArray.length - 1; i >= 0; i--) {
      if (this.shotArray[i].shotLife < 1) {
        this.shotArray.splice(i, 1);
      }
    }
  };

  this.drawShots = function() {
    for (var i = 0; i < this.shotArray.length; i++) {
      if (this.shotArray[i].shotLife > 0) {
        this.shotArray[i].draw();
      }
    }
  };
}

module.exports = Cannon;
