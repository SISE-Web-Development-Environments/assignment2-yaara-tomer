$(document).ready(function () {
	// Get the element with id="defaultOpen" and click on it
	document.getElementById("defaultOpen").click();

	localStorage.setItem("p","p");

});

function openPage(pageName, elmnt, color) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].style.backgroundColor = "";
	}
	document.getElementById(pageName).style.display = "block";
	elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
$(document).ready(function () {
	document.getElementById("defaultOpen").click();
});

//$("#myBtn").click(function(){

//	var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
//var span = document.getElementsByClassName("close")[0];

// Get the button that opens the modal
//var btn = document.getElementById("myBtn");

//});
function moveToTabReg(){
	openPage('Register', this, ' #ca5349');
}
function moveToTabLogin(){
	openPage('Login', this, '#ca5349');
}

function switchDiv(divName){
	openPage(divName, this, ' #ca5349');

}


function about(){
	document.getElementById("About").showModal();
	var span = document.getElementsByClassName("close")[0];
	span.onclick = function() {
		document.getElementById("About").close();
	};
}
function closeDialog() {
	document.getElementById("About").close();
}

window.onclick = function(e) {
	if (e.target == document.getElementById("About"))
		document.getElementById("About").close();
};

function showSetting(){
	document.getElementById("settingdialog").showModal();
	var span = document.getElementsByClassName("close")[0];
	span.onclick = function() {
		document.getElementById("settingdialog").close();
	};	
}
function closeDialog() {
	document.getElementById("settingdialog").close();
}

window.onclick = function(e) {
	if (e.target == document.getElementById("settingdialog"))
		document.getElementById("settingdialog").close();
};
var leftKey;
var rightKey
var upKey;
var DownKey;
var minBalls=50;
var maxBalls=90;
var numOfBalls;
var color5score;
var color15score;
var color25score;
var minGhost=4;
var maxGhost=1;
var numOfGhost;
var timeOfGame;


function setLeftKey(){
	leftKey = event.code;
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

$('#setting_form').validate({
	rules: {
		time:{
			required: true
		}
	},
	messages: {
		time:{
			required: "please set time for the game",
		}
	}

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


	numOfBalls = document.getElementById("vol").value;
	color5score = document.getElementById("5color").value;
	color15score = document.getElementById("15color").value;
	color25score = document.getElementById("25color").value;
	timeOfGame = document.getElementById("time").value;
	numOfGhost = document.getElementById("time").value;
}

function resetSetting(){

}