$(document).ready(function () {
	//set registration form
	$('#registerForm').validate({ // initialize the plugin
		rules: {
			username: {
				required: true,
				checkUserName: true
			},
			password: {
				required: true,
				minlength: 6,
				regex: /^(?=.*\d)(?=.*[a-zA-z]).{6,16}$/
			},
			firstname: {
				required: true,
				regex: /^([^0-9]*)$/
			},
			lastname: {
				required: true,
				regex: /^([^0-9]*)$/
			},
			email: {
				required: true,
				email: true
			},
			month: {
				required: true
			},
			day: {
				required: true
			},
			year: {
				required: true
			}
		},
		messages: {
			username: {
				required: "Please enter your user name",
				checkUserName: "username already exist"
			},
			firstname: {
				required: "Please enter your first name",
				regex: "only letters please!"

			},
			lastname: {
				required: "Please enter your last name",
				regex: "only letters please!"

			},
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 6 characters long",
				regex: "Your password must contains at least one letter and one number"
			},
			email: "Please enter a valid email address",
			month: {
				required: "Month required",
			},
			day: {
				required: "Day required",
			},
			year: {
				required: "Year required",
			}
		},
		errorPlacement: function (error, element) {
			if (element.attr("name") == "day") {
				error.appendTo($('#birthday1'));
			} else if (element.attr("name") == "month") {
				error.appendTo($('#birthday1'));

			} else if (element.attr("name") == "year") {
				error.appendTo($('#birthday1'));

			} else {
				error.insertBefore(element);
			}
		},
		submitHandler: function () { // for demo
			var isvalid = $("#registerForm").valid();
			if (isvalid) {
				// alert('reg sumbit validated!'); 
				RegisterFormSubmit();
			}
		}
	});

	//set login form
	$('#LoginForm').validate({ // initialize the plugin
		rules: {
			username: {
				required: true

			},
			password: {
				required: true,
			}
		},
		messages: {
			username: {
				required: "Please provide a user"
			},
			password: {
				required: "Please provide a password"
			}

		},
		errorPlacement: function (error, element) {
				error.insertBefore(element);
		},
		submitHandler: function () { // for demo
			var isvalid = $("#registerForm").valid();
			if (isvalid) {
				alert('login sumbit validated!'); 
				let RuserName =$("#Lusername").val();
				let Rpassword =$("#Lpassword").val();

				checklogin(RuserName,Rpassword);
			}
		}
	});

	//set birthday picker
	$.dobPicker({
		daySelector: '#day', /* Required */
		monthSelector: '#month', /* Required */
		yearSelector: '#year', /* Required */
		dayDefault: 'Day', /* Optional */
		monthDefault: 'Month', /* Optional */
		yearDefault: 'Year', /* Optional */
		minimumAge: 12, /* Optional */
		maximumAge: 100 /* Optional */
	});

});

//set regex check
$(function () {
	$.validator.addMethod("regex", function (value, element, regexpr) {
		return regexpr.test(value);
	});
});

//check unuiqe username
$(function () {
	$.validator.addMethod("checkUserName", function (value, element) {
		return !(isUserNameExist(value));
	});
});


function isUserNameExist(username) {
	let ans = localStorage.hasOwnProperty(username);
	console.log("username  " + username + "  exist: " + ans);
	return ans;
}

function addUserToLocalStorage(username, password) {
	localStorage.setItem(username,password);
	console.log("username  added: " + username+ " ,pass: "+ password);

}

function RegisterFormSubmit() {
	// get all the inputs into an array.
	let RuserName =$("#Rusername").val();
	let Rpassword =$("#Rpassword").val();

	// alert("RegisterForm userName " + RuserName  ); // ToDo delete
	// alert(" RegisterForm password " + Rpassword  ); // ToDo delete

	addUserToLocalStorage(RuserName, Rpassword);
	checklogin(RuserName, Rpassword);
}


function checklogin(username, password) {
	if(localStorage.getItem(username) == password){
		console.log("Welcome!! logged in username  " + username + "  pass: " + password);

		// alert("Welcome " + username + ". \nYou are now logged in"); // ToDo delete
	}
	else {
		alert("bad deatals!!"); // ToDo delete

	}

}









