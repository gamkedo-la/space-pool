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

  this.verticies = [];

  this.hp = 3;

  this.generateVectorPolygon = function(){
    //Math.random()
    for(var i = 0; i < 6; i++){
      var x = randomInteger(-50, 50);
      var y = randomInteger(-50, 50);
      var theta = Math.atan2(y, x);
      this.verticies.push({x:x, y:y, theta:theta});
    }
    this.verticies.sort(function(a, b){
      return a.theta - b.theta;
    });
    console.log(this.verticies);
  }

  this.generateVectorPolygon();

  this.getPolygon = function(){
    var tempVertices = [];
    for(var i = 0; i < this.verticies.length; i++){
      tempVertices.push({x:this.verticies[i].x+this.x, y:this.verticies[i].y+this.y})
    }
    return tempVertices;
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
    drawBitmapCenteredWithRotation(this.myAsteroidPic, this.x, this.y, this.ang);
    //draw verticies
    drawLines('red', this.getPolygon());
  }
}
