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

var keyMoves = {left:undefined, right:undefined,up:undefined,down:undefined};


function setLeftKey(){
    leftKey = $('left_key').val();

}
function setRightKey(){
    rightKey = event.code;
}
function setUpKey(){
    upKey = event.code;
}
function setDownKey(){
    DownKey = event.code;
}
$(document).ready(function () {
    $('#setting_form').validate({
        rules: {
            time:{
                required: true,
                regex: /([5-8][0-9]|90)/
                //ToDo change to right regex
            }

        },
        messages: {
            time:{
                required: "please set time for the game",
                regex: "please insert value above 60"
            }
        },
        submitHandler:function () {
            var validSettings = $('setting_form').valid();
            if (validSettings==true){
                setMySetting();
                switchDiv('Game1')
            }

        }



    });
});


function setRandomSetting(){
    //up down etc...

    leftKey = 37;
    rightKey = 39;
    upKey = 38;
    DownKey = 40;
    // should be random

    color5score = document.getElementById("5color").value;
    color15score = document.getElementById("15color").value;
    color25score = document.getElementById("25color").value;
    numOfBalls = Math.floor(Math.random() * (90 - 50 + 1) ) + 50;
    timeOfGame = Math.floor(Math.random() * (240 - 60 + 1) ) + 60;
    numOfGhost = Math.floor(Math.random() * (4 - 1 + 1) ) +1;


}


function setMySetting(){
    // up down etc...


    numOfBalls = parseInt(document.getElementById("vol").value);
    color5score = document.getElementById("5color").value;
    color15score = document.getElementById("15color").value;
    color25score = document.getElementById("25color").value;
    timeOfGame = document.getElementById("time").value;
    numOfGhost = document.getElementById("time").value;
}

function resetSetting(){

}


