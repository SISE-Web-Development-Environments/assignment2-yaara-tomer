//Board : food=11/12/13  Time=15  heart=16 bonus=17  packman=2 ghost=31/32/33/34  wall=4
var context;
var shape = {};
var board;
var pac_color;
var packmanInterval;
var ghostInterval
var bonusInterval;
var lastDirection = 4;
var ghosts = [{}, {}, {}, {}];
var bonus = {};
var bonusDone = false;
//=======Setting=============
var numberOfGhosts;// = 4;
var numberOfBalls;// = 90;
var numOf5points;// = Math.floor(0.6 * numberOfBalls);
var numOf15points;// = Math.floor(0.3 * numberOfBalls);
var numOf25points;// = Math.floor(0.1 * numberOfBalls);
var foodColor5;
var foodColor15;
var foodColor25;
var timeForGame;

var UpCode;// = 38;
var DownCode;// = 40;
var RightCode;// = 39;
var LeftCode;// = 37;
//================music===============

//=======music========
var startsound;
var foodSound;
var collisionSound;
var bonusSound;
var ismusic = true;

//======images============
var pacIcon = new Image();
var ghostImageArray = [];
var wallIcon = new Image();
var heartIcon = new Image();
var hourglassIcon = new Image();
var bonusIcon = new Image();
wallIcon.src = "images/brick3.png";
heartIcon.src = "images/heart1.png";
hourglassIcon.src = "images/hourglass2.png";
bonusIcon.src = "images/bonus1.png";
//=============Game==================
var lives = 5;
var foodEatenCounter = 0;
var score;
var start_time;
var time_left;

$(document).ready(function () {
    context = canvas.getContext("2d");
    setGhostsImage();
    startsound = new sound("resources/start.mp3");
    foodSound = new sound("resources/food.mp3");
    collisionSound = new sound("resources/collision.mp3");
    bonusSound = new sound("resources/bonus.mp3");
});

function startGame() {
    numOf5points = Math.floor(0.6 * numberOfBalls);
    numOf15points = Math.floor(0.3 * numberOfBalls);
    numOf25points = Math.floor(0.1 * numberOfBalls);
    lives = 5;
    foodEatenCounter = 0;
    score = 0;
    clearAllIntervals();

    console.log("up: sb38....." + UpCode);
    console.log("down: sb40..." + DownCode);
    console.log("left: sb37..." + LeftCode);
    console.log("right: sb39" + RightCode);
    console.log("balls: " + numberOfBalls);
    console.log("ghosts: " + numberOfGhosts);
    console.log("numberOf5Balls: " + numOf5points);
    console.log("numberOf15Balls: " + numOf15points);
    console.log("numberOf25Balls: " + numOf25points);
    console.log("color5: " + foodColor5);
    console.log("color15: " + foodColor15);
    console.log("color25: " + foodColor25);


    Start();
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

    var ghost_remain = numberOfGhosts;
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
            } else if (GameBoard[j][i] === 3 && ghost_remain > 0) {
                board[i][j] = 30 + ghost_remain; //ghost
                ghosts[ghost_remain - 1].i = i;
                ghosts[ghost_remain - 1].j = j;
                ghosts[ghost_remain - 1].bellow = 0;
                ghosts[ghost_remain - 1].init_i = i;
                ghosts[ghost_remain - 1].init_j = j;
                ghosts[ghost_remain - 1].id = 30 + ghost_remain;
                ghosts[ghost_remain - 1].lastMove = 0;

                ghost_remain--;
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

    //set packman location if not set yet
    if (typeof shape.i == "undefined") {
        var emptyCell = findRandomEmptyCell(board);
        shape.i = emptyCell[0];
        shape.j = emptyCell[1];
        board[emptyCell[0]][emptyCell[1]] = 2;
        pacman_remain--;
    }

    //set food left to locate
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

    //set Time object
    let emptyCellForTime = findRandomEmptyCell(board);
    board[emptyCellForTime[0]][emptyCellForTime[1]] = 15;

    //set heart object
    let emptyCellForHeart = findRandomEmptyCell(board);
    board[emptyCellForHeart[0]][emptyCellForHeart[1]] = 16;

    //set bonus object
    let emptyCellForBonus = findRandomEmptyCell(board);
    board[emptyCellForBonus[0]][emptyCellForBonus[1]] = 17;
    bonus.i = emptyCellForBonus[0];
    bonus.j = emptyCellForBonus[1];
    bonus.bellow = 0;
    bonus.lastMove = 1;

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

    Draw();
    showAlive();

    startsound.play();
    setTimeout(function () { //wait until sound finished
        runAllIntervals();
        timeForGame += 5;
    }, 5000);
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

    lblTime.value = time_left;
    for (var i = 0; i < 40; i++) {
        for (var j = 0; j < 20; j++) {
            var center = {};
            center.x = i * 24 + 12;
            center.y = j * 24 + 12;
            if (board[i][j] == 2) { //packman
                pacIcon.src = "images/icons/pac" + lastDirection + ".ico";//".png"; //
                context.drawImage(pacIcon, i * 24, j * 24, 24, 24);

            } else if (board[i][j] == 11) { //food
                context.beginPath();
                context.arc(center.x, center.y, 4.85, 0, 2 * Math.PI); // circle
                context.fillStyle = foodColor5; //"black"; //color
                context.fill();
            } else if (board[i][j] == 12) { //food
                context.beginPath();
                context.arc(center.x, center.y, 5.5, 0, 2 * Math.PI); // circle
                context.fillStyle = foodColor15;//"red"; //color
                context.fill();
            } else if (board[i][j] == 13) { //food
                context.beginPath();
                context.arc(center.x, center.y, 6.3, 0, 2 * Math.PI); // circle
                context.fillStyle = foodColor25;//"blue"; //color
                context.fill();
            } else if (board[i][j] == 15) { //time
                context.drawImage(hourglassIcon, i * 24, j * 24, 24, 24);
            } else if (board[i][j] == 16) { //heart
                context.drawImage(heartIcon, i * 24, j * 24, 24, 24);
            } else if (board[i][j] == 17) { //bonus
                context.drawImage(bonusIcon, i * 24, j * 24, 24, 24);
            } else if (board[i][j] == 4) { //wall
                context.drawImage(wallIcon, i * 24, j * 24, 24, 24);
            } else if (board[i][j] > 30) { //ghost
                context.drawImage(ghostImageArray[board[i][j] - 30], i * 24, j * 24, 24, 24);
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
        foodEatenCounter++;
        foodSound.play();
    }

    if (board[shape.i][shape.j] === 15) {
        timeForGame += 30;
        bonusSound.play();
    }//ToDo time

    if (board[shape.i][shape.j] === 16) {
        bonusSound.play();
        lives++; //ToDo animation?
        showAlive();
    }


    if (board[shape.i][shape.j] === 17 && !bonusDone) {
        getBonus(shape.i, shape.j); //ToDo animation?
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_left = (timeForGame - (currentTime - start_time) / 1000).toFixed(2);
    if (time_left < 0) {
        time_left = 0;
        if (score < 100) {
            console.log("You are better than " + score + " points!");
            gameOver();
        } else {
            console.log("Nice job! You got " + score + " points!");
            winningLook();
        }

    }

    if (foodEatenCounter == numOf5points + numOf15points + numOf25points) {
        clearAllIntervals();
        startsound.play();
        winningLook();

    } else {
        checkCollision();
        Draw();
    }
}

function UpdateGhostPosition() {
    ghosts.forEach(function (ghost) {
        if (!jQuery.isEmptyObject(ghost)) {
            let x = getNextDirection(ghost);
            let currentGhost = board[ghost.i][ghost.j]
            if (x == 1) { //up
                if (ghost.j > 0 && board[ghost.i][ghost.j - 1] != 4 && !isGhost(ghost.i, ghost.j - 1) && !isBonus(ghost.i, ghost.j - 1)) {
                    board[ghost.i][ghost.j] = ghost.bellow;
                    ghost.bellow = board[ghost.i][ghost.j - 1];

                    board[ghost.i][ghost.j - 1] = currentGhost;
                    ghost.j--;
                }
            }
            if (x == 2) {//down
                if (ghost.j < 19 && board[ghost.i][ghost.j + 1] != 4 && !isGhost(ghost.i, ghost.j + 1) && !isBonus(ghost.i, ghost.j + 1)) {
                    board[ghost.i][ghost.j] = ghost.bellow;
                    ghost.bellow = board[ghost.i][ghost.j + 1];

                    board[ghost.i][ghost.j + 1] = currentGhost;
                    ghost.j++;
                }
            }
            if (x == 3) {//left
                if (ghost.i == 0 && ghost.j == 5 && !isGhost(39, ghost.j) && !isBonus(39, ghost.j)) {
                    board[ghost.i][ghost.j] = ghost.bellow;
                    ghost.bellow = board[39][ghost.j];

                    board[39][ghost.j] = currentGhost;
                    ghost.i = 39;
                } else if (ghost.i > 0 && board[ghost.i - 1][ghost.j] != 4 && !isGhost(ghost.i - 1, ghost.j) && !isBonus(ghost.i - 1, ghost.j)) {
                    board[ghost.i][ghost.j] = ghost.bellow;
                    ghost.bellow = board[ghost.i - 1][ghost.j];

                    board[ghost.i - 1][ghost.j] = currentGhost;
                    ghost.i--;
                }
            }
            if (x == 4) {//right
                if (ghost.i == 39 && ghost.j == 5 && !isGhost(0, ghost.j - 1) && !isBonus(0, ghost.j - 1)) {
                    board[ghost.i][ghost.j] = ghost.bellow;
                    ghost.bellow = board[0][ghost.j];

                    board[0][ghost.j] = currentGhost;
                    ghost.i = 0;
                }
                if (ghost.i < 39 && board[ghost.i + 1][ghost.j] != 4 && !isGhost(ghost.i + 1, ghost.j) && !isBonus(ghost.i + 1, ghost.j)) {
                    board[ghost.i][ghost.j] = ghost.bellow;
                    ghost.bellow = board[ghost.i + 1][ghost.j];

                    board[ghost.i + 1][ghost.j] = currentGhost;
                    ghost.i++;
                }
            }
        }
    });
    checkCollision();
    Draw();


}

function UpdateBonusPosition() {
    //get next direction to move
    let isFree = false;
    let nextDir = bonus.lastMove;
    if (isPossibleMove(bonus.i, bonus.j, nextDir)) isFree = true;
    while (!isFree) {
        nextDir = getRandomInt(4) + 1;
        isFree = isPossibleMove(bonus.i, bonus.j, nextDir);
    }

    //set new location
    if (nextDir === 1) { //up
        if (bonus.j > 0 && !isGhost(bonus.i, bonus.j - 1)) {
            board[bonus.i][bonus.j] = bonus.bellow;
            bonus.bellow = board[bonus.i][bonus.j - 1];

            board[bonus.i][bonus.j - 1] = 17;
            bonus.j--;
            bonus.lastMove = 1;
        }
    }
    if (nextDir === 2) {//down
        if (bonus.j < 19 && !isGhost(bonus.i, bonus.j + 1)) {
            board[bonus.i][bonus.j] = bonus.bellow;
            bonus.bellow = board[bonus.i][bonus.j + 1];

            board[bonus.i][bonus.j + 1] = 17;
            bonus.j++;
            bonus.lastMove = 2;

        }
    }
    if (nextDir === 3) {//left
        if (bonus.i == 0 && bonus.j == 5 && !isGhost(39, ghost.j)) {
            board[bonus.i][bonus.j] = bonus.bellow;
            bonus.bellow = board[39][bonus.j];

            board[39][bonus.j] = 17;
            bonus.i = 39;
            bonus.lastMove = 3;

        } else if (bonus.i > 0 && !isGhost(bonus.i - 1, bonus.j)) {
            board[bonus.i][bonus.j] = bonus.bellow;
            bonus.bellow = board[bonus.i - 1][bonus.j];

            board[bonus.i - 1][bonus.j] = 17;
            bonus.i--
            bonus.lastMove = 3;

        }
    }
    if (nextDir === 4) {//right
        if (bonus.i == 39 && bonus.j == 5 && !isGhost(0, bonus.j - 1)) {
            board[bonus.i][bonus.j] = bonus.bellow;
            bonus.bellow = board[0][bonus.j];

            board[0][bonus.j] = 17;
            bonus.i = 0;
            bonus.lastMove = 4;

        }
        if (bonus.i < 39 && !isGhost(bonus.i + 1, bonus.j)) {
            board[bonus.i][bonus.j] = bonus.bellow;
            bonus.bellow = board[bonus.i + 1][bonus.j];

            board[bonus.i + 1][bonus.j] = 17;
            bonus.i++;
            bonus.lastMove = 4;

        } else {
            bonus.lastMove = 0;

        }
    }

    if (bonus.i === shape.i && bonus.j === shape.j && !bonusDone) {
        getBonus(bonus.i, bonus.j);
    }
    Draw();

}

function getBonus(i, j) {
    bonusSound.play();
    bonusDone = true;
    score += 50;
    clearInterval(bonusInterval);
}

function isPossibleMove(i, j, direction) {
    if (direction === 1 && board[i][j - 1] !== 4) return true;
    if (direction === 2 && board[i][j + 1] !== 4) return true;
    if (direction === 3 && board[i - 1][j] !== 4) return true;
    if (direction === 4 && board[i + 1][j] !== 4) return true;
    return false;
}

function getNextDirection(ghost) {
    let wantedDirection = getManhattanDistance(ghost);
    let randomDirection = getRandomInt(4) + 1;
    let a = Math.random();
    if (a > 0.65) { //ToDo change
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

function isBonus(i, j) {
    return (board[i][j] === 17);
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
    // ghostImageArray[1] = new Image();
    // ghostImageArray[1].src = "images/icons/g1.png";
    //
    // ghostImageArray[2] = new Image();
    // ghostImageArray[2].src = "images/icons/g2.png";
    //
    // ghostImageArray[3] = new Image();
    // ghostImageArray[3].src = "images/icons/g3.png";
    //
    // ghostImageArray[4] = new Image();
    // ghostImageArray[4].src = "images/icons/g4.png";


}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getManhattanDistance(ghost) {

    let upDist = Math.abs(ghost.i - shape.i) + Math.abs(ghost.j - 1 - shape.j);
    let DownDist = Math.abs(ghost.i - shape.i) + Math.abs(ghost.j + 1 - shape.j);
    let LeftDist = Math.abs(ghost.i - 1 - shape.i) + Math.abs(ghost.j - shape.j);
    let RightDist = Math.abs(ghost.i + 1 - shape.i) + Math.abs(ghost.j - shape.j);
    let dirs = [999, upDist, DownDist, LeftDist, RightDist];

    //give priority to last move direction
    //dirs[ghost.lastMove] -= 2;

    //remove if wall
    if (board[ghost.i][ghost.j - 1] === 4) dirs[1] = 99;
    if (board[ghost.i][ghost.j + 1] === 4) dirs[2] = 99;
    if (board[ghost.i - 1][ghost.j] === 4) dirs[3] = 99;
    if (board[ghost.i + 1][ghost.j] === 4) dirs[4] = 99;

    return dirs.indexOf(Math.min(...dirs));
}

function gameOver() {
    clearAllIntervals();
    collisionSound.play();
    Draw();
    setTimeout(function () { //wait until sound finished
        gameOverLook();
    }, 3000);

}

function resetGhostLocation() {
    ghosts.forEach(function (ghost) {
        if (!jQuery.isEmptyObject(ghost)) {
            board[ghost.i][ghost.j] = ghost.bellow;
            board[ghost.init_i][ghost.init_j] = ghost.id;
            ghost.i = ghost.init_i;
            ghost.j = ghost.init_j;

            ghost.bellow = 0;
        }
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
    //ghosts.forEach(function (ghost) {
    for (let i = 0; i < ghosts.length; i++) {
        let ghost = ghosts[i];
        if (ghost.i === shape.i && ghost.j === shape.j) {
            clearAllIntervals();
            score -= 10;
            lives--;
            showAlive();
            console.log("lives left: " + lives);
            if (lives === 0) {
                console.log("Loser!!");
                gameOver();
                break;
            }
            collisionSound.play();
            setTimeout(function () { //wait until sound finished
                resetGhostLocation();
                resetPackmanLocation();
                Draw();
                timeForGame += 8;
                startsound.play();
                setTimeout(function () { //wait until sound finished
                    runAllIntervals();
                }, 5000);
            }, 3000);
            break;
        }
    }
}

function muteMusic() {
    if (ismusic) { // do mute
        startsound.stop();
        ismusic = false;
        document.getElementById("music").src = "images/mute-512.png";
    } else {
        startsound.play();
        ismusic = true;
        document.getElementById("music").src = "images/volume-512.png";
    }

}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

function showAlive() {
    if (lives === 1) {
        document.getElementById("one").style.display = "";
        document.getElementById("two").style.display = "none";
        document.getElementById("three").style.display = "none";
        document.getElementById("four").style.display = "none";
        document.getElementById("five").style.display = "none";
        document.getElementById("six").style.display = "none";
    }
    if (lives === 2) {
        document.getElementById("one").style.display = "";
        document.getElementById("two").style.display = "";
        document.getElementById("three").style.display = "none";
        document.getElementById("four").style.display = "none";
        document.getElementById("five").style.display = "none";
        document.getElementById("six").style.display = "none";
    }
    if (lives === 3) {
        document.getElementById("one").style.display = "";
        document.getElementById("two").style.display = "";
        document.getElementById("three").style.display = "";
        document.getElementById("four").style.display = "none";
        document.getElementById("five").style.display = "none";
        document.getElementById("six").style.display = "none";
    }
    if (lives === 4) {
        document.getElementById("one").style.display = "";
        document.getElementById("two").style.display = "";
        document.getElementById("three").style.display = "";
        document.getElementById("four").style.display = "";
        document.getElementById("five").style.display = "none";
        document.getElementById("six").style.display = "none";
    }
    if (lives === 5) {
        document.getElementById("one").style.display = "";
        document.getElementById("two").style.display = "";
        document.getElementById("three").style.display = "";
        document.getElementById("four").style.display = "";
        document.getElementById("five").style.display = "";
        document.getElementById("six").style.display = "none";
    }
    if (lives === 6) {
        document.getElementById("one").style.display = "";
        document.getElementById("two").style.display = "";
        document.getElementById("three").style.display = "";
        document.getElementById("four").style.display = "";
        document.getElementById("five").style.display = "";
        document.getElementById("six").style.display = "";
    }
}

function runAllIntervals() {
    packmanInterval = setInterval(UpdatePackmanPosition, 200);
    ghostInterval = setInterval(UpdateGhostPosition, 150);
    if (!bonusDone) bonusInterval = setInterval(UpdateBonusPosition, 100);
}

function clearAllIntervals() {
    window.clearInterval(packmanInterval);
    window.clearInterval(ghostInterval);
    window.clearInterval(bonusInterval);

}

function gameOverLook() {
    document.getElementById("gameoverdialog").showModal();
}

function winningLook() {
    document.getElementById("win_look").showModal();
}

function startNewGameAfterGameOver() {
    document.getElementById("gameoverdialog").close();
    sentToGameAndStart();
}

function logoutAfterGameOver() {
    document.getElementById("gameoverdialog").close();
    logout();
    switchDiv('Welcome')
}

function startNewGameAfterWin() {
    document.getElementById("win_look").close();
    sentToGameAndStart();
}

function logoutAfterWin() {
    document.getElementById("win_look").close();
    logout();
    switchDiv('Welcome')
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
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 3, 3, 0, 0, 3, 3, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],//0
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],//1
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
