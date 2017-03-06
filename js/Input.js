const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_SPACEBAR = 32;
const KEY_ENTER = 13;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;

var peaShooterActive = false;
var railGunActive = true;
var shotSnakeActive = false;

var mouseX = 0;
var mouseY = 0;
var repeat;

function setupInput() {
	canvas.addEventListener('mousemove', updateMousePos);

	var repeat = false;

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	document.addEventListener("keyup", function() { repeat = false; });
	document.addEventListener("keydown", function() {

	});

	ship.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_SPACEBAR);
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	// cheat / hack to test car in any position
	/*carX = mouseX;
	carY = mouseY;
	carSpeedX = 4;
	carSpeedY = -4;*/
}

function keySet(keyEvent, setTo) {
	if(keyEvent.keyCode == ship.controlKeyLeft) {
		ship.keyHeld_TurnLeft = setTo;
	}
	if(keyEvent.keyCode == ship.controlKeyRight) {
		ship.keyHeld_TurnRight = setTo;
	}
	if(keyEvent.keyCode == ship.controlKeyUp) {
		ship.keyHeld_Gas = setTo;
	}
	if(keyEvent.keyCode == ship.controlKeyDown) {
		ship.keyHeld_Reverse = setTo;
	}
	if(keyEvent.keyCode	== ship.controlKeyForShotFire) {
		ship.keyHeld_Fire = setTo;
	}
	if(keyEvent.keyCode	== KEY_ENTER) {
		if(showingTitleScreen){
			showingTitleScreen = false;
		}
		if(showingGameOverScreen){
			showingGameOverScreen = false;
		}
	}
}


function keyPressed(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, true);
	if (!repeat) {
		if(evt.keyCode	== ship.controlKeyForShotFire) {
			ship.cannon.cannonFire(ship);
		}
		repeat = true;
	}
	//console.log(evt.keyCode);
	evt.preventDefault();
}

function keyReleased(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, false);
	repeat = false;
}
