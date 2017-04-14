const ASTEROID_SPEED_MIN = 0.25;
const ASTEROID_SPEED_MAX = 1.25;//2.0
const ASTEROID_SPIN_MAX = 0.01;
const ASTEROID_DEFAULT_RADIUS = 100;
const ASTEROID_MIN_RADIUS_TO_EXPLODE_INTO_ASTEROIDS = 20;
const START_NUMBER_OF_ASTEROIDS = 5;
const DRAW_ASTEROIDS_WRAPPED = true; // render a 2nd asteroid on opposite screen edge of overlapping?

const NUMBER_OF_ASTEROID_FRAGMENTS = 10;
const ASTEROID_CHILD_SPEED = .75;

const INVINCIBILITY_TIMER = 4;

function sweepAsteroidsReadyForRemoval() {
  for (var i = colliders.length - 1; i >= 0; i--) {
    if (colliders[i].isReadyToRemove) {
      colliders.splice(i, 1);
    }
  }
}
function clearAllAsteroids() {
  colliders = [];
}

function spawnAndResetAsteroids() {
  var i;
  for (i = 0; i <= START_NUMBER_OF_ASTEROIDS; i++) {
    var tempAsteroid = new Asteroid();
    colliders.push(tempAsteroid);
    tempAsteroid.reset();
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

function Asteroid(max_radius) {
  if (max_radius == undefined) {
    max_radius = ASTEROID_DEFAULT_RADIUS;
  }
  this.spin = randomFloat(-ASTEROID_SPIN_MAX, ASTEROID_SPIN_MAX);
  this.ang = Math.random() * Math.PI;
  this.hp = 3;

  var randSpeed = randomFloat(ASTEROID_SPEED_MIN, ASTEROID_SPEED_MAX);

  var driftAngle = Math.PI * 2.0 * Math.random();
  this.xv = Math.cos(driftAngle) * randSpeed;
  this.yv = Math.sin(driftAngle) * randSpeed;

  // Tweak these numbers a bit to change the shape of the asteroid
  this.radius = randomInteger(max_radius * .8, max_radius);
  var min_verts = Math.round(lerp(5, 6, this.radius / ASTEROID_DEFAULT_RADIUS));
  var max_verts = Math.round(lerp(7, 10, this.radius / ASTEROID_DEFAULT_RADIUS));
  var num_verts = randomInteger(min_verts, max_verts);
  // This makes the irregular shape of the asteroid
  var sizeNoise = randomFloat(this.radius * 0.4, this.radius * 0.5);

  this.verts = [];

  // Generate the asteroid verticies
  var ang = (Math.PI * 2) / num_verts;
  for (var i = 0; i < num_verts; i++) {
    this.verts.push({
      x: Math.cos(ang * i) * (this.radius + randomFloat(-sizeNoise, 0)),
      y: Math.sin(ang * i) * (this.radius + randomFloat(-sizeNoise, 0))
    });
  }

  //set the width, height, and update the partial dimensions after the asteroid is generated
  this.width = this.radius*2;
  this.height = this.radius*2;

  this.buildCanvas();

  this.isReadyToRemove = false;
  this.invincibilityTimer = INVINCIBILITY_TIMER;

  this.superClassReset = this.reset;
  this.reset = function() {
    this.superClassReset();
    //the formula to spawn an asteroid between x and 1
    //SPAWN RANDOMLY ON THE TOP SIDE
    this.randomSide = randomInteger(1, 4);
    if (this.randomSide == 1) {
      this.x = -100;
      this.y = randomInteger(1, 600);
    }
    else if (this.randomSide == 2) {
      this.x = randomInteger(1, 600);
      this.y = -100;
    }
    else if (this.randomSide == 3) {
      this.x = randomInteger(1, 600);
      this.y = 700;
    }
    else if (this.randomSide == 4) {
      this.x = 700;
      this.y = randomInteger(1, 600);
    }
  }; // end of asteroidReset func

  this.shootFrom = function(asteroidDestroyed) {
    var distFromCenter = 20 + Math.random() * 30;
    var randAng = Math.PI * 2.0 * Math.random();
    this.x = asteroidDestroyed.x + distFromCenter * Math.cos(randAng);
    this.y = asteroidDestroyed.y + distFromCenter * Math.sin(randAng);
    //TODO you can maybe have the child asteroids fire out in a random direction based on the rock's ang variable.
    this.xv = Math.random() * ASTEROID_CHILD_SPEED + asteroidDestroyed.xv;
    this.yv = Math.random() * ASTEROID_CHILD_SPEED + asteroidDestroyed.yv;
    //this.xv = ASTEROID_CHILD_SPEED + asteroidDestroyed.xv;
    //this.yv = ASTEROID_CHILD_SPEED + asteroidDestroyed.yv;
  };

  this.explode = function() {
    //TODO when this is done by # of wrap it'll need to be 3, not 4.
    // Explode into multiple smaller asteroids if still big enough
    if (this.radius >= ASTEROID_MIN_RADIUS_TO_EXPLODE_INTO_ASTEROIDS && scoreMultiplier < 4) { //why is scoreMultiplier in here??? o_0
      for (var i = 0; i < NUMBER_OF_ASTEROID_FRAGMENTS; i++) {
        var tempAsteroid = new Asteroid(this.radius/2);
        tempAsteroid.reset();
        tempAsteroid.shootFrom(this);
        colliders.push(tempAsteroid);
      }
    }
    this.isReadyToRemove = true;
    asteroidsHit++;
    var tempBlit = new Blit(randomInteger(1, 600), 0, randomInteger(1, 150), canvas.height, 0, 0);
    blits.push(tempBlit);
  };

  this.superClassMove = this.move; //saving reference to parent class' move.
  this.move = function() {
    this.ang += this.spin;
    if (this.invincibilityTimer > 0) {
      this.invincibilityTimer--;
    }
    this.superClassMove();
  };
}
