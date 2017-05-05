/*
  Sound class to manage the loading, playing, etc. of html5 audio elements
*/
var Sound = {};

//list of path, file name
Sound.queue = [
  ["music/", "spacepool-low-volume.wav"],
  ["music/", "tape-1.wav"],
  ["music/", "tape-2.wav"],
  ["music/", "tape-3.wav"],
  ["music/", "tape-4.wav"],
  ["music/", "mark-1.wav"],
  ["music/", "mark-2.wav"],
  ["music/", "mark-3.wav"],
  ["music/", "mark-4.wav"],
  ["music/", "mirror-1.wav"],
  ["music/", "mirror-2.wav"],
  ["music/", "mirror-3.wav"],
  ["music/", "mirror-4.wav"],
  ["music/", "drift.wav"]
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
  Audio.playbackRate modifies the speed at which
  the audio is played. playbackRate takes a value between 0.5 and 4:
  e.g. playbackRate = .5 will play at half speed,
       playbackRate = 2 will play at double
*/
Sound.playbackRate = function(fileName, playbackRate) {
  if( this.cache[fileName] == null ) return;

  if(playbackRate != undefined)
    this.cache[fileName].playbackRate = playbackRate;
}

/*
  Audio.volume is controlled by a value between 0 - 1:
  e.g. volume = 1 is the loudest, volume = 0 is mute
*/
Sound.volume = function(fileName, volume) {
  if( this.cache[fileName] == null ) return;

  if(volume != undefined)
    this.cache[fileName].volume = volume;
}

/*
  Audio elements have a loop property that when set to true
  will play the sound on loop
*/
Sound.loop = function(fileName, loop) {
  if( this.cache[fileName] == null ) return;

  if(loop != undefined)
    this.cache[fileName].loop = loop;
}

/*
  For simplicity sake we have a Sound.play function which
  gets the Audio element from the cache and sets its currentTime
  to 0 which brings the audio back to the beginning before playing
  if trigged again before finishing its playthrough.

  Leveraging the volume control from above.
*/
Sound.play = function(fileName, volume, loop, playbackRate) {
  if( this.cache[fileName] == null ) return;

  this.volume(fileName, volume);
  this.loop(fileName, loop);
  this.playbackRate(fileName, playbackRate);

  var audio = this.cache[fileName];
  audio.currentTime = 0;
  audio.play();
}
