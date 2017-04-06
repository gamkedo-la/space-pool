function MovingWrapPosition() {
  this.x = 150;
  this.y = 150;
  this.xv = 0;
  this.yv = 0;

  this.ang = 0;
  this.radius = 0;
  this.verts = [];

  this.reset = function() {
    //this.xv = this.yv = 0.0;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
  }; // end of reset func

  this.handleScreenWrap = function() {
    if (this.x > canvas.width) {
      this.x -= canvas.width;
    }
    if (this.x < 0) {
      this.x += canvas.width;
    }
    if (this.y < 0) {
      this.y += canvas.height;
    }
    if (this.y > canvas.height) {
      this.y -= canvas.height;
    }
  };

  this.move = function() {
    this.x += this.xv;
    this.y += this.yv;
    this.handleScreenWrap();
  };

  this.bounds = function() {
    var bounds = [];
    var cos = Math.cos(this.ang);
    var sin = Math.sin(this.ang);
    for (var i = 0; i < this.verts.length; i++) {
      var rotatedX = this.verts[i].x * cos - this.verts[i].y * sin;
      var rotatedY = this.verts[i].x * sin + this.verts[i].y * cos;

      bounds.push({ x: rotatedX + this.x, y: rotatedY + this.y })
    }
    return bounds;
  };

  this.draw = function() {
    if (DEBUG) {
      var bounds = this.bounds();
      for (var i = 0; i < bounds.length; i++) {
        colorCircle(bounds[i].x, bounds[i].y, 5, 'red');
		// TODO: render on opposide screen edge if overlapping wrap - see Asteroid draw
      }
    }
  }
}
