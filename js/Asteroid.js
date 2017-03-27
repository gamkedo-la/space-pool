const ASTEROID_SPEED = 0.01;
const ASTEROID_COLLISION_RADIUS = 50;
const START_NUMBER_OF_ASTEROIDS = 5;

const NUMBER_OF_ASTEROID_FRAGMENTS = 10;
const ASTEROID_CHILD_SPEED = 1.5;

const INVINCIBILITY_TIMER = 4;

function destroyAsteroid(colliders, currentAsteroid, currentAsteroidOffset) {
  //TODO when this is done by # of wrap it'll need to be 3, not 4.
  if (currentAsteroid.size == 'big' && scoreMultiplier < 4) {
    colliders.splice(currentAsteroidOffset, 1);
    for (var i = 0; i < NUMBER_OF_ASTEROID_FRAGMENTS; i++) {
      var tempAsteroid = new Asteroid('small');
      tempAsteroid.reset(asteroidPic2);
      tempAsteroid.shootFrom(currentAsteroid);
      colliders.push(tempAsteroid);
    }
    currentAsteroid.isReadyToRemove = true;
  }
  else {
    currentAsteroid.isReadyToRemove = true;
  }
}

function sweepAsteroidsReadyForRemoval() {
  for (var i = colliders.length - 1; i >= 0; i--) {
    if (colliders[i].isReadyToRemove) {
      colliders.splice(i, 1);
    }
  }
}
function clearAllAsteroids(colliders) {
  for (var i = colliders.length - 1; i >= 0; i--) {
    colliders.splice(colliders[i], 1);
  }
}

function spawnAndResetAsteroids() {
  var i;
  var tempAsteroidWave = [];
  for (i = 0; i <= START_NUMBER_OF_ASTEROIDS; i++) {
    var tempAsteroid = new Asteroid('big');
    colliders.push(tempAsteroid);
    tempAsteroidWave.push(tempAsteroid);
  }
  for (i = 0; i < tempAsteroidWave.length; i++) {
    tempAsteroidWave[i].reset(asteroidPic);
  }
} //spawns the initial set of asteroids?

function moveAsteroids() {
  for (var i = 0; i < colliders.length; i++) {
    colliders[i].move();
  }
}

function drawAsteroids() {
  for (var i = 0; i < colliders.length; i++) {
    colliders[i].draw();
  }
}

Asteroid.prototype = new MovingWrapPosition();

function Asteroid(size) {
  this.type = 'asteroid';
  this.size = size;
  this.x = 100;
  this.y = 100;
  this.xv = 0;
  this.yv = 0;
  this.ang = Math.random() * Math.PI;

  //this.verticies = [];

  this.hp = 3;

  // Tweak these numbers a bit to change the shape of the asteroid
  this.num_verts = randomFloat(6, 10);
  this.vectorAsteroidSize = randomFloat(20, 30);
  // This makes the irregular shape of the asteroid
  this.sizeNoise = randomFloat(this.vectorAsteroidSize * 0.4, this.vectorAsteroidSize * 0.5);

  this.drawAsteroid = function(x, y) {
    console.log('drawAsteroid is being called');
    var i;
    var strokeColor = 'white';
    var fillColor = 'rgba(200,200,255,0.07)';
    var verts = [];

    // Generate the asteroid verticies
    var ang = (Math.PI * 2) / this.num_verts;
    for (i = 0; i < this.num_verts; i++) {
      verts.push({
        x: Math.cos(ang * i) * (this.vectorAsteroidSize + randomFloat(-this.sizeNoise, this.sizeNoise)) + x,
        y: Math.sin(ang * i) * (this.vectorAsteroidSize + randomFloat(-this.sizeNoise, this.sizeNoise)) + y
      });
    }

    // Draw the asteroid
    canvasContext.beginPath();
    canvasContext.moveTo(verts[0].x, verts[0].y);
    for (i = 1; i < verts.length; i++) {
      canvasContext.lineTo(verts[i].x, verts[i].y);
    }
    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = strokeColor;
    canvasContext.fillStyle = fillColor;

  // make the lines glow
    canvasContext.shadowColor = '#ffffff';
    canvasContext.shadowBlur = 8;
    canvasContext.shadowOffsetX = 0;
    canvasContext.shadowOffsetY = 0;

    canvasContext.closePath();
    canvasContext.fill();
    canvasContext.stroke();
  }

  this.isReadyToRemove = false;
  this.invincibilityTimer = INVINCIBILITY_TIMER;

  this.superClassReset = this.reset;
  this.reset = function(whichImage) {
    this.superClassReset();
    this.myAsteroidPic = whichImage;
    this.speed = 0;
    //the formula to spawn an asteroid between x and 1
    //SPAWN RANDOMLY ON THE TOP SIDE
    this.randomSide = randomInteger(1, 4);
    if (this.randomSide == 1) {
      this.x = -100;
      this.y = randomInteger(1, 600);
    }
    if (this.randomSide == 2) {
      this.x = randomInteger(1, 600);
      this.y = -100;
    }
    if (this.randomSide == 3) {
      this.x = randomInteger(1, 600);
      this.y = 700;
    }
    if (this.randomSide == 4) {
      this.x = 700;
      this.y = randomInteger(1, 600);
    }
  }; // end of asteroidReset func

  this.isOverlappingPoint = function(testX, testY) {
    var deltaX = testX - this.x;
    var deltaY = testY - this.y;
    var dist = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
    return (dist <= ASTEROID_COLLISION_RADIUS);
  };

  this.shootFrom = function(asteroidDestroyed) {
    var distFromCenter = 20 + Math.random() * 30;
    var randAng = Math.PI * 2.0 * Math.random();
    this.x = asteroidDestroyed.x + distFromCenter * Math.cos(randAng);
    this.y = asteroidDestroyed.y + distFromCenter * Math.sin(randAng);
    this.xv = 0;
    this.yv = 0;
    //TODO you can maybe have the child asteroids fire out in a random direction based on the rock's ang variable.
    this.xv = Math.random() * ASTEROID_CHILD_SPEED + asteroidDestroyed.xv;
    this.yv = Math.random() * ASTEROID_CHILD_SPEED + asteroidDestroyed.yv;
    //this.xv = ASTEROID_CHILD_SPEED + asteroidDestroyed.xv;
    //this.yv = ASTEROID_CHILD_SPEED + asteroidDestroyed.yv;
  };

  this.superClassMove = this.move; //saving reference to parent class' move.
  this.move = function() {
    this.xv += Math.cos(this.ang) * ASTEROID_SPEED;
    this.yv += Math.sin(this.ang) * ASTEROID_SPEED;
    this.xv *= SPACESPEED_DECAY_MULT;
    this.yv *= SPACESPEED_DECAY_MULT;
    if (this.invincibilityTimer > 0) {
      this.invincibilityTimer--;
    }
    this.superClassMove();
  };

  this.draw = function() {
    this.drawAsteroid(this.x, this.y);
  }
}
