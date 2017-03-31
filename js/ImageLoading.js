module.exports = function(imageLoadingDoneSoStartGame){
  var Images = {}
  Images.shipPic = document.createElement("img");
  Images.asteroidPic = document.createElement("img");
  Images.asteroidPic2 = document.createElement("img");

  var worldPics = [];

  var picsToLoad = 0; // set automatically based on imageList in loadImages()
  Images.countLoadedImagesAndLaunchIfReady =function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    if (picsToLoad == 0) {
      imageLoadingDoneSoStartGame();
    }
  }

  Images.beginLoadingImage =function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = Images.countLoadedImagesAndLaunchIfReady;
    imgVar.src = "images/" + fileName;
  }

  Images.loadImageForWorldCode =function loadImageForWorldCode(worldCode, fileName) {
    worldPics[worldCode] = document.createElement("img");
    Images.beginLoadingImage(worldPics[worldCode], fileName);
  }

  Images.loadImages =function loadImages() {
    var imageList = [
      { varName: Images.shipPic, theFile: "player1.png" },
      { varName: Images.asteroidPic, theFile: "asteroid.png" },
      { varName: Images.asteroidPic2, theFile: "asteroid-2.png" }
    ];

    require('../images/player1.png')
    require('../images/asteroid.png')
    require('../images/asteroid-2.png')

    picsToLoad = imageList.length;

    for (var i = 0; i < imageList.length; i++) {
      if (imageList[i].varName != undefined) {
        Images.beginLoadingImage(imageList[i].varName, imageList[i].theFile);
      }
      else {
        Images.loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile);
      }
    }
  }
  return Images;
}
