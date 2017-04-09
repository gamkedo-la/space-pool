var context;
var x = 0;
var ind;
var offset

var photos = new Array();

for(var i = 1; i < 4; i++){
  var im = new Image();
  im.src = 'images/p' + i + '.jpg';
  photos.push(im);
}

function init(){
  context = document.getElementById('canvas').getContext('2d');
  slider = document.getElementById('slider');
  console.log(photos);
  setInterval(loop, 10);
}

function loop(){
  x += (slider.value - x) * 0.1;
  ind = Math.floor(x/800);
  //console.log(ind);
  //console.log(photos);
  //console.log(slider.value);
  offset = x % 800;
  context.drawImage(photos[ind], offset, 0, 800-offset, 600, 0, 0, 800-offset, 600);
  context.drawImage(photos[ind+1], 0, 0, 800, 600, 800-offset, 0, 800, 600);
}
