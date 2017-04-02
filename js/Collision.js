function Collision(){
  this.height = 0;
  this.width = 0;

  this.halfWidth = this.width / 2;
  this.quarterWidth = this.width / 4;
  this.eighthWidth = this.width / 8;
  this.halfHeight = this.height / 2;
  this.quarterHeight = this.height / 4;
  this.eighthHeight = this.height / 8;

  this.updatePartialDimensions = function(){
    this.halfWidth = this.width / 2;
    this.quarterWidth = this.width / 4;
    this.eighthWidth = this.width / 8;
    this.halfHeight = this.height / 2;
    this.quarterHeight = this.height / 4;
    this.eighthHeight = this.height / 8;
  }

  this.boundingBox = function() {
    return {
      left: this.x - this.halfWidth,
      top: this.y - this.halfHeight,
      right: this.x + this.halfWidth,
      bottom: this.y + this.halfHeight
    };
  }

  this.bounds = function() {
    return [
      // Upper halfway right
      { x: this.x + this.quarterWidth, y: this.y - this.halfHeight },
      // Upper halfway left
      { x: this.x, y: this.y - this.halfHeight },
      // Upper left
      { x: this.x - this.quarterWidth, y: this.y - this.halfHeight },
      // Middle left
      { x: this.x - this.quarterWidth, y: this.y },
      // Lower left
      { x: this.x - this.quarterWidth, y: this.y + this.halfHeight },
      // Lower middle
      { x: this.x, y: this.y + this.halfHeight },
      // Lower halfway right
      { x: this.x + this.quarterWidth, y: this.y + this.halfHeight },
      // Middle right
      { x: this.x + this.halfWidth, y: this.y }
    ];
  }
}
