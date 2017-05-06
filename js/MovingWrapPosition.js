function MovingWrapPosition() {
  this.x = 150;
  this.y = 150;
  this.xv = 0;
  this.yv = 0;

  this.width = 0;
  this.height = 0;
  this.ang = 0;
  this.radius = 0;
  this.verts = [];

  this.img;

  this.reset = function() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
  }; // end of reset func

  this.handleScreenWrap = function() {
    if (this.x > canvas.width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = canvas.width;
    }
    if (this.y < 0) {
      this.y = canvas.height;
    }
    if (this.y > canvas.height) {
      this.y = 0;
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

  this.buildCanvas = function() {
    this.img = document.createElement('canvas');
    this.img.width = this.width;
    this.img.height = this.height;
    var ctx = this.img.getContext('2d');
    ctx.translate(this.width / 2, this.height / 2);
    this.drawCanvas(ctx);
  };

  this.drawCanvas = function(ctx) {
    // fillColor is optional - see setDrawColors() in GraphicsCommoin.js
    setDrawColors(ctx,this.fillColor); // it's okay if fillColor is undefined. see Asteroid() for example
    ctx.beginPath();
    ctx.moveTo(this.verts[0].x, this.verts[0].y);
    for (var i = 0; i < this.verts.length; i++) {
      ctx.lineTo(this.verts[i].x, this.verts[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  this.draw = function() {
    /*
    canvasContext.fillStyle = "white";
    canvasContext.textAlign = "center";
    canvasContext.font = "14px Arial";
    canvasContext.fillText(this.isLargeAsteroid, this.x, this.y);
    */

    if (this.img) {
      drawBitmapCenteredWithRotation(this.img, this.x, this.y, this.ang);

      if (DRAW_ASTEROIDS_WRAPPED) {
        var onEdge = false;
        var clone_offset_x = 0;
        var clone_offset_y = 0;
        var maxx = canvas.width - this.radius;
        var maxy = canvas.height - this.radius;
        var minx = this.radius;
        var miny = this.radius;
        if (this.x > maxx) { clone_offset_x = -canvas.width; onEdge = true; }
        if (this.x < minx) { clone_offset_x = canvas.width; onEdge = true; }
        if (this.y > maxy) { clone_offset_y = -canvas.height; onEdge = true; }
        if (this.y < miny) { clone_offset_y = canvas.height; onEdge = true; }
        if (onEdge) {
          drawBitmapCenteredWithRotation(this.img, this.x + clone_offset_x, this.y + clone_offset_y, this.ang);
        }
      }
    }

    if (DEBUG) {
      var bounds = this.bounds();
      for (var i = 0; i < bounds.length; i++) {
        strokeCircle(bounds[i].x, bounds[i].y, 5, 'red');
      }

      if (this.radius) {
        strokeCircle(this.x, this.y, this.radius, 'green');
      }
    }
  }
}
