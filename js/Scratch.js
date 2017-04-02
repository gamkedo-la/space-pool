function testObject(){
  this.width = 50;
  this.halfWidth = this.width/2;
  this.testProp = 'meow';

  this.updateHalfWidth = function(){
    this.halfWidth = this.width/2;
  }
}

var sampleObject = new testObject();
console.log(sampleObject.halfWidth);
sampleObject.width += 25;
sampleObject.updateHalfWidth();
console.log(sampleObject.halfWidth);
