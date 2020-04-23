
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

//===========registers users================
var users={"p": "p"};

function addUser(username,password){
	users[username] = password;
}

function RegisterForm(){
	// get all the inputs into an array.
	let RuserName =""+ $("#Rusername").val();
	let Rpassword =""+$("#Rpassword").val();

	// alert("RegisterForm userName " + RuserName  ); // ToDo delete
	// alert(" RegisterForm password " + Rpassword  ); // ToDo delete

	addUser(Rusername,Rpassword);
	checklogin(Rusername,Rpassword);

	
}

function isUserNameExist(username){
	let ans = username in users;
	console.log("username  "+username+ "  exist: " +ans );
	return ans;
}

function checklogin(username,password){
	if(users[username]==password){
		alert("Welcome "+username + ". \nYou are now logged in"); // ToDo delete
	}
	else{
		alert("bad deatals!!"); // ToDo delete

	}

}


