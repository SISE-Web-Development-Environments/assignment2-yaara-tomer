var leftKey;
var rightKey
var upKey;
var DownKey;
var minBalls=50;
var maxBalls=90;
var numOfBalls;
var color5score = "#FB9902";
var color15score = "#C21460";
var color25score = "#8601AF";
var minGhost=4;
var maxGhost=1;
var numOfGhost;
var timeOfGame;
var validcolor=undefined;
var validkeys = undefined;
var validNumber = undefined;
var validnumofghost = undefined;

var keyMovesWhich = {left:undefined, right:undefined,up:undefined,down:undefined};
var keyMovesCode = {left:undefined, right:undefined,up:undefined,down:undefined};

function setLeftKey(){
    document.getElementById("left_key").addEventListener('keydown', function (event) {
        if (!event.metaKey) {
            event.preventDefault();
        }
        keyMovesWhich.left = event.which;
        this.value = event.key;
        keyMovesCode.left = event.key;
    });

}
function setRightKey(){
    document.getElementById("right_key").addEventListener('keydown', function (event) {
        if (!event.metaKey) {
            event.preventDefault();
        }
        keyMovesWhich.right = event.which;
        this.value = event.key;
        keyMovesCode.right = event.key;
    });
}
function setUpKey(){
    document.getElementById("up_key").addEventListener('keydown', function (event) {
        if (!event.metaKey) {
            event.preventDefault();
        }
        keyMovesWhich.up = event.which;
        this.value = event.key;
        keyMovesCode.up = event.key;
    });
}
function setDownKey(){
    document.getElementById("down_key").addEventListener('keydown', function (event) {
        if (!event.metaKey) {
            event.preventDefault();
        }
        keyMovesWhich.down = event.which;
        this.value = event.key;
        keyMovesCode.down = event.key;
    });
}
$(document).ready(function () {
    setLeftKey();
    setRightKey();
    setUpKey();
    setDownKey();
    shownumber();


});

function checkForSameKeys(){

            if (keyMovesWhich.left ===keyMovesWhich.right ||keyMovesWhich.left ===keyMovesWhich.up || keyMovesWhich.left ===keyMovesWhich.down ||
            keyMovesWhich.right === keyMovesWhich.up ||  keyMovesWhich.right === keyMovesWhich.down || keyMovesWhich.up === keyMovesWhich.down ){
                alert("you need to choose different keys for moves");
                validkeys=false;
                return;
            }

  validkeys=true;
}
function checkForSameColor() {
    if (color5score === color15score || color15score === color25score || color5score === color25score) {
        alert("you need to choose different colors");
        validcolor = false;
        return;
    }
    validcolor = true;
}
function submitSetting(){
    var validSettings = false;

    checkForSameKeys();
    color5score = document.getElementById("5color").value;
    color15score = document.getElementById("15color").value;
    color25score = document.getElementById("25color").value;
    checkForSameColor();
    numOfBalls = parseInt(document.getElementById("vol").value);
    timeOfGame = document.getElementById("time1").value;
    if (timeOfGame<60){
        alert("you need to put value bigger than 60 sec");
        validNumber = false;
        return;
    }
    else{
        validNumber = true;
    }
    numOfGhost = document.getElementById("select_bar").value;
    if(numOfGhost==0){
        alert("you need to choose value for number of ghosts");
        validnumofghost = false;
        return;
    }
    else{
        validnumofghost = true;
    }
    validSettings = (validNumber && validkeys && validcolor && validnumofghost)
    if (validSettings){

        switchDiv('Game')
        SettingViewFill();
    }
}


function setRandomSetting() {
    //up down etc...
    keyMovesWhich.left = 37;
    keyMovesWhich.right = 38;
    keyMovesWhich.up = 39;
    keyMovesWhich.down = 40;
    keyMovesCode.left = 'ArrowLeft';
    keyMovesCode.right = 'ArrowRight';
    keyMovesCode.up = 'ArrowUp';
    keyMovesCode.down = 'ArrowDown';

    // should be random
    color5score = "#" + Math.floor(Math.random()*16777215).toString(16);
    color15score = "#" +Math.floor(Math.random()*16777215).toString(16);
    color25score ="#" + Math.floor(Math.random()*16777215).toString(16);
    let dif = (color5score === color15score || color15score === color25score || color5score === color25score);
    while(dif===true){
        color5score = "#" + Math.floor(Math.random()*16777215).toString(16);
        color15score = "#" +Math.floor(Math.random()*16777215).toString(16);
        color25score ="#" + Math.floor(Math.random()*16777215).toString(16);
        dif = (color5score === color15score || color15score === color25score || color5score === color25score);
    }
   // document.getElementById("5color").value = color5score ;
    //document.getElementById("15color").value = color15score;
    // document.getElementById("25color").value = color25score;


    numOfBalls = Math.floor(Math.random() * (90 - 50 + 1)) + 50;
    timeOfGame = Math.floor(Math.random() * (240 - 60 + 1)) + 60;
    numOfGhost = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

    switchDiv('Game');
    SettingViewFill();
}

 function resetSetting(){
     keyMovesWhich.left = undefined;
     keyMovesWhich.right = undefined;
     keyMovesWhich.up = undefined;
     keyMovesWhich.down =undefined;
     keyMovesCode.left = undefined;
     keyMovesCode.right = undefined;
     keyMovesCode.up = undefined;
     keyMovesCode.down = undefined;
     //ToDo other reset maybe?
}

function SettingViewFill(){
    document.getElementById("showNumberMonster").innerHTML =numOfGhost ;
    document.getElementById("showNumberballs").innerHTML =numOfBalls ;
    document.getElementById("showTimeGame").innerHTML =timeOfGame ;
   // document.getElementById("showNumberMonster").innerHTML =timeOfGame ;
   // document.getElementById("showNumberMonster").value = timeOfGame;
    document.getElementById("show5point").style.color = color5score;
    document.getElementById("show15point").style.color = color15score;
    document.getElementById("show25point").style.color = color25score;

    document.getElementById("showLeftMove").innerHTML = keyMovesCode.left;
    document.getElementById("showRightMove").innerText = keyMovesCode.right;
    document.getElementById("showUpMove").innerHTML = keyMovesCode.up;
    document.getElementById("showDoenMove").innerText = keyMovesCode.down;
    document.getElementById("showuserName").innerText = currentUser;
}

function shownumber() {
    document.getElementById("vol").addEventListener("input", () => {
        document.getElementById("showvol").innerHTML = document.getElementById("vol").value;
    });
}