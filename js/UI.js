function drawUI(){
	var scoreText = score.toString() + ' ' + scoreMultiplier.toString() + 'x';
	canvasContext.font = "14px Arial";
	colorText(scoreText, canvas.width-50, 50, 'white');
}

function titleScreen(){
	var titleText = "asteroids clone!"
	var subText = "up to increase speed, left and right to turn"
	var subSubText = "space to fire, enter to start"
	canvasContext.fillStyle = "white";
	canvasContext.textAlign="center";
	canvasContext.font = "14px Arial";
	canvasContext.fillText((subText), canvas.width/2, 270);
	canvasContext.font = "14px Arial";
	canvasContext.fillText((subSubText), canvas.width/2, 300);
	canvasContext.font = "20px Arial";
	canvasContext.fillText((titleText), canvas.width/2, 250);
}

function gameOverScreen(){
	var titleText = "game over"
	var subText = "score: " + endScore;
	var subSubText = "press enter to reset"
	canvasContext.fillStyle = "white";
	canvasContext.textAlign="center";
	canvasContext.font = "14px Arial";
	canvasContext.fillText((subText), canvas.width/2, 270);
	canvasContext.font = "14px Arial";
	canvasContext.fillText((subSubText), canvas.width/2, 300);
	canvasContext.font = "20px Arial";
	canvasContext.fillText((titleText), canvas.width/2, 250);
}
