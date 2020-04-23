
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
	openPage('Register', this, ' #777');
}
function moveToTabLogin(){
	openPage('Login', this, ' #777');
}

function switchDiv(divName){
	openPage(divName, this, ' #777');

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
