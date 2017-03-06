var shipPic = document.createElement("img");
var UFOPic = document.createElement("img");
var asteroidPic = document.createElement("img");
var asteroidPic2 = document.createElement("img");
var explosionPic = document.createElement("img");
var worldPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	if(picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/"+fileName;
}

function loadImageForWorldCode(worldCode, fileName) {
	worldPics[worldCode] = document.createElement("img");
	beginLoadingImage(worldPics[worldCode], fileName);
}

function loadImages() {
	var imageList = [
		{varName: shipPic, theFile: "player1.png"},
		{varName: UFOPic, theFile: "ufo.png"},
		{varName: asteroidPic, theFile: "asteroid.png"},
		{varName: asteroidPic2, theFile: "asteroid-2.png"},
		{varName: explosionPic, theFile: "explosion.png"},
		];

	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile);
		}
	}
}
