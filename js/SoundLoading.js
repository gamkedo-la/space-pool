/*
  Sound class to manage the loading, playing, etc. of html5 audio elements
*/
var Sound = {};

//list of path, file name
Sound.queue = [
  ["music/", "spacepool.wav"]
];

//for load checking
Sound.numLoaded = 0;

//cache of loaded sound assets
Sound.cache = {};

//load sounds
Sound.load = function( callBack ) {

  /*
    array.map works with => as if you were looping over an anonymous function.
    The same could have been done with:
    for ( var i = 0; i < this.queue.length; ++i ) {
      var s = this.queue[ i ];
      //do stuff with s
    }

    OR:
    this.queue.map(function( s ) {
     //do stuff with s
    });
  */
  this.queue.map( s => {
    var filePath = s,
        //getting file name e.g. _spacepool.wav
        fileName = filePath[1].split('.')[0],
        audio = new Audio();

    /*
      setting source as you would to an element
      created by document.createElement("audio")
    */
    audio.src = filePath[0] + filePath[1];

    /*
      Audio elements in html5 have a "canplaythrough" property which
      can be used much like the load property for img elements.

      Using the same syntax as above to invoke an anonymous function
      as shorthand to execute whatever function is passed as the
      "callback" parameter within our Sound.load method when the
      elements that can play through equal our initial queue length.
    */
    audio.addEventListener( "canplaythrough", () => {
      ++this.numLoaded;
      if (this.numLoaded == this.queue.length) {
        callBack();
      }
    }, false);

    /*
      Adding the modified Audio element to our cache of loaded sounds
      so we can reference it easily by file name without the extension,
      e.g. _spacepool.wav becomes just _spacepool
    */
		this.cache[fileName] = audio;
  });
}

/*
  A last minute nicety, as volume tends to be something
  we want to easily manipulate.

  Audio.volume is controlled by a normal:
  e.g. volume = 1 is the loudest, volume = 0 is mute
*/
Sound.volume = function(fileName, vol = .5) {
  this.cache[fileName].volume = vol;
}

/*
  Audio elements have a loop property that when set to true
  will play the sound on loop
*/
Sound.loop = function(fileName, toggle = true) {
  this.cache[fileName].loop = toggle;
}

/*
  For simplicity sake we have a Sound.play function which
  gets the Audio element from the cache and sets its currentTime
  to 0 which brings the audio back to the beginning before playing
  if trigged again before finishing its playthrough.

  Leveraging the volume control from above.
*/
Sound.play = function(fileName, volume = .5) {
  this.volume(fileName, volume);
  this.cache[fileName].currentTime = 0;
  this.cache[fileName].play();
}
