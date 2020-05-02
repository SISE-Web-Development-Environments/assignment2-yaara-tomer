//Board : food=11/12/13  packman=2 ghost=31/32/33/34  wall=4
var context;
var shape = {};
var board;
var pac_color;
var packmanInterval;
var ghostInterval
var lastDirection = 4;
var ghosts = [{}, {}, {}, {}];
//=======Setting=============
var numOfGhosts = 4;
var numOfBalls = 90;
var numOf5points = Math.floor(0.6 * numOfBalls);
var numOf15points = Math.floor(0.3 * numOfBalls);
var numOf25points = Math.floor(0.1 * numOfBalls);
var UpCode = 38;
var DownCode = 40;
var RightCode = 39;
var LeftCode = 37;

//======images============
var pacIcon = new Image();
var ghostImageArray = [];

//=============Game==================
var lives = 4;
var foodCounter = 0;
var score;
var start_time;
var time_elapsed;

$(document).ready(function () {
	context = canvas.getContext("2d");
	setGhostsImage();
	Start();
});

function setInitialGhostPosition() {

}

function Start() {
	board = [];
	score = 0;
	pac_color = "yellow";
	var cnt = 810;
	var food_remain5 = numOf5points;
	var food_remain15 = numOf15points;
	var food_remain25 = numOf25points;
	var food_remain = food_remain5 + food_remain15 + food_remain25;

	var ghost_remain = numOfGhosts;
	var pacman_remain = 1;
	start_time = new Date();
	//setGhostsOnBoard();

	for (var i = 0; i < 40; i++) {
		board[i] = [];
		for (var j = 0; j < 20; j++) {
			if (GameBoard[j][i] === 1) {
				//set Wall
				board[i][j] = 4; //wall
				cnt--;
			} else if (GameBoard[j][i] >= 3) {
				if (GameBoard[j][i] === 4 && ghost_remain > 0) {
					board[i][j] = 30 + ghost_remain; //ghost
					ghosts[ghost_remain - 1].i = i;
					ghosts[ghost_remain - 1].j = j;
					ghosts[ghost_remain - 1].bellow = 0;
					ghosts[ghost_remain - 1].init_i = i;
					ghosts[ghost_remain - 1].init_j = j;
					ghosts[ghost_remain - 1].id = 30 + ghost_remain;
					ghosts[ghost_remain - 1].lastMove = 0;

					ghost_remain--;
				} else {
					board[i][j] = 0; //saved
				}
				cnt--;

			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					let rand = getRandomInt(3) + 1;
					if (rand == 1 && food_remain5 > 0) {
						board[i][j] = 11;
						food_remain5--;
						food_remain--;

					} else if (rand == 2 && food_remain15 > 0) {
						board[i][j] = 12;
						food_remain15--;
						food_remain--;

					} else if (rand == 3 && food_remain25 > 0) {
						board[i][j] = 13;
						food_remain25--;
						food_remain--;
					} else {
						board[i][j] = 0;
					}
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	if (typeof shape.i == "undefined") {
		var emptyCell = findRandomEmptyCell(board);
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
		board[emptyCell[0]][emptyCell[1]] = 2;
		pacman_remain--;
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		let rand2 = getRandomInt(3) + 1;
		if (rand2 == 1 && food_remain5 > 0) {
			board[emptyCell[0]][emptyCell[1]] = 11;
			food_remain5--;
			food_remain--;
		} else if (rand2 == 2 && food_remain15 > 0) {
			board[emptyCell[0]][emptyCell[1]] = 12;
			food_remain15--;
			food_remain--;

		} else if (rand2 == 3 && food_remain25 > 0) {
			board[emptyCell[0]][emptyCell[1]] = 13;
			food_remain25--;
			food_remain--;

		}
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	packmanInterval = setInterval(UpdatePackmanPosition, 200);
	ghostInterval = setInterval(UpdateGhostPosition, 200);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 39 + 1);
	var j = Math.floor(Math.random() * 19 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 19 + 1);
		j = Math.floor(Math.random() * 39 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[UpCode]) {
		lastDirection = 1;
		return 1;
	}
	if (keysDown[DownCode]) {
		lastDirection = 2;
		return 2;
	}
	if (keysDown[LeftCode]) {
		lastDirection = 3;
		return 3;
	}
	if (keysDown[RightCode]) {
		lastDirection = 4;
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 40; i++) {
		for (var j = 0; j < 20; j++) {
			var center = {};
			center.x = i * 26 + 13;
			center.y = j * 26 + 13;
			if (board[i][j] == 2) { //packman
				pacIcon.src = "images/icons/pac" + lastDirection + ".ico";
				context.drawImage(pacIcon, i * 26, j * 26, 26, 26);
			} else if (board[i][j] == 11) { //food
				context.beginPath();
				context.arc(center.x, center.y, 3, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 12) { //food
				context.beginPath();
				context.arc(center.x, center.y, 3, 0, 2 * Math.PI); // circle
				context.fillStyle = "red"; //color
				context.fill();
			} else if (board[i][j] == 13) { //food
				context.beginPath();
				context.arc(center.x, center.y, 3, 0, 2 * Math.PI); // circle
				context.fillStyle = "blue"; //color
				context.fill();
			} else if (board[i][j] == 4) { //wall
				context.beginPath();
				context.rect(center.x - 13, center.y - 13, 26, 26);
				context.fillStyle = "grey"; //color
				context.fill();
			} else if (board[i][j] > 30) { //ghost
				context.drawImage(ghostImageArray[board[i][j] - 30], i * 26, j * 26, 26, 26);
				//context.drawImage(ghostArray[i - 17], i * 30, j * 30, 30, 30);

			}
		}
	}
}

function UpdatePackmanPosition() {
	//console.log("i:" + shape.i + "   j:" + shape.j);
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) { //up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {//down
		if (shape.j < 19 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {//left
		if (shape.i == 0 && shape.j == 5) {
			shape.i = 39;
		} else if (shape.i == 0 && shape.j == 14) {
			shape.i = 39;
		} else if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {//right
		if (shape.i == 39 && shape.j == 5) {
			shape.i = 0;
		} else if (shape.i == 39 && shape.j == 14) {
			shape.i = 0;
		}
		if (shape.i < 39 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] > 10 && board[shape.i][shape.j] < 14) {
		if (board[shape.i][shape.j] === 11) score += 5;
		if (board[shape.i][shape.j] === 12) score += 15;
		if (board[shape.i][shape.j] === 13) score += 25;

		//score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;

	if (score == numOf5points*5 + numOf15points*15 + numOf25points*25) {
		window.alert("Game completed");
		window.clearInterval(packmanInterval);
	} else {
		Draw();
	}
}

function UpdateGhostPosition() {
	ghosts.forEach(function (ghost) {
		let x = getNextDirection(ghost);
		let currentGhost = board[ghost.i][ghost.j]

		if (x == 1) { //up
			if (ghost.j > 0 && board[ghost.i][ghost.j - 1] != 4 && !isGhost(ghost.i, ghost.j - 1)) {
				board[ghost.i][ghost.j] = ghost.bellow;
				ghost.bellow = board[ghost.i][ghost.j - 1];

				board[ghost.i][ghost.j - 1] = currentGhost;
				ghost.j--;
			}
		}
		if (x == 2) {//down
			if (ghost.j < 19 && board[ghost.i][ghost.j + 1] != 4 && !isGhost(ghost.i, ghost.j + 1)) {
				board[ghost.i][ghost.j] = ghost.bellow;
				ghost.bellow = board[ghost.i][ghost.j + 1];

				board[ghost.i][ghost.j + 1] = currentGhost;
				ghost.j++;
			}
		}
		if (x == 3) {//left
			if (ghost.i == 0 && ghost.j == 5 && !isGhost(39, ghost.j)) {
				board[ghost.i][ghost.j] = ghost.bellow;
				ghost.bellow = board[39][ghost.j];

				board[39][ghost.j] = currentGhost;
				ghost.i = 39;
			} else if (ghost.i > 0 && board[ghost.i - 1][ghost.j] != 4 && !isGhost(ghost.i - 1, ghost.j)) {
				board[ghost.i][ghost.j] = ghost.bellow;
				ghost.bellow = board[ghost.i - 1][ghost.j];

				board[ghost.i - 1][ghost.j] = currentGhost;
				ghost.i--;
			}
		}
		if (x == 4) {//right
			if (ghost.i == 39 && ghost.j == 5 && !isGhost(0, ghost.j - 1)) {
				board[ghost.i][ghost.j] = ghost.bellow;
				ghost.bellow = board[0][ghost.j];

				board[0][ghost.j] = currentGhost;
				ghost.i = 0;
			}
			if (ghost.i < 39 && board[ghost.i + 1][ghost.j] != 4 && !isGhost(ghost.i + 1, ghost.j)) {
				board[ghost.i][ghost.j] = ghost.bellow;
				ghost.bellow = board[ghost.i + 1][ghost.j];

				board[ghost.i + 1][ghost.j] = currentGhost;
				ghost.i++;
			}
		}
		checkCollision();
		Draw();
	});


}

function getNextDirection(ghost) {
	let wantedDirection = getManhattanDistance(ghost);
	let randomDirection = getRandomInt(4) + 1;
	let a = Math.random();
	if (a > 0.35) { //ToDo change
		ghost.lastMove = wantedDirection;
		return wantedDirection;
	} else {
		ghost.lastMove = randomDirection;
		return randomDirection;
	}
}

function isGhost(i, j) {
	return (board[i][j] > 30);
}

function setGhostsImage() {
	ghostImageArray[1] = new Image();
	ghostImageArray[1].src = "images/icons/g1.ico";

	ghostImageArray[2] = new Image();
	ghostImageArray[2].src = "images/icons/g2.ico";

	ghostImageArray[3] = new Image();
	ghostImageArray[3].src = "images/icons/g3.ico";

	ghostImageArray[4] = new Image();
	ghostImageArray[4].src = "images/icons/g4.ico";


}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function getManhattanDistance(ghost) {
	let currDist = Math.abs(ghost.i - shape.i) + Math.abs(ghost.j - shape.j);

	let upDist = Math.abs(ghost.i - shape.i) + Math.abs(ghost.j - 1 - shape.j);
	let DownDist = Math.abs(ghost.i - shape.i) + Math.abs(ghost.j + 1 - shape.j);
	let LeftDist = Math.abs(ghost.i - 1 - shape.i) + Math.abs(ghost.j - shape.j);
	let RightDist = Math.abs(ghost.i + 1 - shape.i) + Math.abs(ghost.j - shape.j);
	let dirs = [999, upDist, DownDist, LeftDist, RightDist];

	//give priority to last move direction
	dirs[ghost.lastMove] -= 2;

	//remove if wall
	if (board[ghost.i][ghost.j - 1] === 4) dirs[1] = 99;
	if (board[ghost.i][ghost.j + 1] === 4) dirs[2] = 99;
	if (board[ghost.i - 1][ghost.j] === 4) dirs[3] = 99;
	if (board[ghost.i + 1][ghost.j] === 4) dirs[4] = 99;

	return dirs.indexOf(Math.min(...dirs));
}

function gameOver() {
	clearInterval(packmanInterval);
	clearInterval(ghostInterval);

	alert("busted");

}

function resetGhostLocation() {
	ghosts.forEach(function (ghost) {
		board[ghost.i][ghost.j] = ghost.bellow;
		board[ghost.init_i][ghost.init_j] = ghost.id;
		ghost.i = ghost.init_i;
		ghost.j = ghost.init_j;

		ghost.bellow = 0;
	});

}

function resetPackmanLocation() {
	board[shape.i][shape.j] = 0;
	var emptyCell = findRandomEmptyCell(board);
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = 2;
}

function checkCollision() {
	ghosts.forEach(function (ghost) {
		if (ghost.i === shape.i && ghost.j === shape.j) {
			lives--;
			console.log("lives: " + lives);
			if (lives === 0) {
				gameOver();
			}


			resetGhostLocation();
			resetPackmanLocation();


		}

	});

}

var GameBoard = [
	// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//0
	[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],//1
	[1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],//2
	[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],//3
	[1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],//5
	[0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],//4
	[1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],//6
	[1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],//7
	[1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],//8
	[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],//9
	[1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 4, 4, 0, 0, 4, 4, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],//0
	[1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 3, 3, 3, 3, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],//1
	[1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1],//2
	[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],//3
	[0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],//4
	[1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],//4
	[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],//6
	[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],//5
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],//4
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//9

	//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//9
]
