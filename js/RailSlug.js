const RAIL_SPEED = 15.0;
const RAIL_LIFE = 3000;
const SHOT_OFFSET = 30;

RailSlug.prototype = new MovingWrapPosition();

function RailSlug() {
  this.attackValue = 4;

  this.width = 40;
  this.height = 5;
  this.halfWidth = this.width / 2;
  this.halfHeight = this.height / 2;

  this.verts = [];

  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
  this.xv = 0;
  this.yv = 0;

  this.deltaX = 0;
  this.deltaY = 0;

  this.edgeCrossCount = 0;

  this.railColor = 'red';

  this.shotLife = 30;
  this.timeUntilCanHitAgain = 0;

  this.ang = 0;

  this.superClassReset = this.reset;
  this.reset = function() {
    this.superClassReset();
    this.shotLife = 0;
    //shipCanMove = false;
  }; // end of shotReset func

  this.isShotReadyToFire = function() {
    if (this.shotLife <= 0) {
      return true;
    }
  };

  this.countdownTimeUntilCanHitAgain = function() {
    if (this.timeUntilCanHitAgain > 0) {
      this.timeUntilCanHitAgain--;
      //console.log(this.timeUntilCanHitAgain);
    }
  };

  this.shootFrom = function(shipFiring) {
    Stats();
    var shotDistFromShipCenter = SHIP_COLLISION_RADIUS + 2;
    this.x = shipFiring.x + Math.cos(shipFiring.ang) * shotDistFromShipCenter;
    this.y = shipFiring.y + Math.sin(shipFiring.ang) * shotDistFromShipCenter;

    this.xv = Math.cos(shipFiring.ang) * RAIL_SPEED + shipFiring.xv;
    this.yv = Math.sin(shipFiring.ang) * RAIL_SPEED + shipFiring.yv;

    this.ang = shipFiring.ang;

    this.shotLife = RAIL_LIFE;
    scoreMultiplier = 2;
    timesShot++;
    //console.log(timesShot)
  };

  this.increaseScoreMultiplier = function() {
    if (scoreMultiplier < 4) {
      scoreMultiplier *= 2;
      timesShotWrap++;
    }
    else {
      shipCanMove = true;
      this.shotLife = 0;
    }
  };

  this.handleScreenWrap = function() {
    var edgeCrossed = false;
    if (this.x > canvas.width) {
      this.x = 0;
      edgeCrossed = true;
    }
    if (this.x < 0) {
      this.x = canvas.width;
      edgeCrossed = true;
    }
    if (this.y < 0) {
      this.y = canvas.height;
      edgeCrossed = true;
    }
    if (this.y > canvas.height) {
      this.y = 0;
      edgeCrossed = true;
    }
    if (edgeCrossed) {
      this.edgeCrossCount++;
      this.increaseScoreMultiplier();
    }
  };

  this.recalcVerts = function() {
    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;

    this.verts = [
      { x: -this.halfWidth, y: this.halfHeight },
      { x: this.halfWidth, y: this.halfHeight },
      { x: this.halfWidth, y: -this.halfHeight },
      { x: -this.halfWidth, y: -this.halfHeight }
    ];
  };
  // Make sure we have some verts to start with.
  this.recalcVerts();

  //this.superClassMove	=	this.move; //saving reference to parent class' move.
  this.move = function() {
    //console.log(this.shotLife);
    if (this.shotLife == 0) {
      //console.log('can move again');
      scoreMultiplier = 1;
    }
    if (this.shotLife > 0) {
      //console.log('cannot move right now');
      this.shotLife--;
      this.x += this.xv;
      this.y += this.yv;
      this.handleScreenWrap();
    }
  };

  this.superClassDraw = this.draw;
  this.draw = function() {
    if (scoreMultiplier == 1) {
      this.railColor = 'white';
      scoreMultiplierLifeSpan = MULTIPLIER_LIFESPAN;
    }

    if (scoreMultiplier == 2) {
      this.railColor = 'green';
      scoreMultiplierLifeSpan = MULTIPLIER_LIFESPAN;
      this.width = 240;
      this.height = 30;
      this.recalcVerts();
    }

    if (testingCheats == true || scoreMultiplier == 4) {
      this.railColor = 'blue';
      scoreMultiplierLifeSpan = MULTIPLIER_LIFESPAN;
      this.height = 50;
      this.width = 400;
      this.recalcVerts();
    }

    if (this.shotLife > 0) {
      colorRotatedRect(this.x, this.y, this.width, this.height, this.railColor, this.ang);
      this.superClassDraw();
    }
  };
}
