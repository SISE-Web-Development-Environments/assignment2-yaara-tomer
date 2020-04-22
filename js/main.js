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


function about(){
	var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

}




// When the user clicks the button, open the modal 
btn.onclick = function () {
	modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
