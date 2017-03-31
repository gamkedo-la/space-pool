// allows the game to go in slow motion
var Tools = {}
Tools.randomInteger =function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

Tools.randomFloat =function randomFloat(min, max) {
  return (Math.random() * (max - min)) + min;
}

module.exports = Tools;
