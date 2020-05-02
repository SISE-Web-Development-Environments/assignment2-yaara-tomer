//test
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
		}
		// submitHandler: function () { // for demo
		// 	var isvalid = $("#registerForm").valid();
		// 	if (isvalid) {
		// 		// alert('reg sumbit validated!');
		// 		RegisterFormSubmit();
		// 		document.getElementById("registerForm").reset();


		// 	}
		// }
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
		}
		// submitHandler: function () { // for demo
		// 	var isvalid = $("#LoginForm").valid();
		// 	if (isvalid) {
		// 		alert('login sumbit validated!');
		// 		let RuserName = $("#Lusername").val();
		// 		let Rpassword = $("#Lpassword").val();

		// 		if (login(RuserName, Rpassword)) {
		// 			document.getElementById("LoginForm").reset();
		// 		}

		// 	}
		// }
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

function RegisterSumbit() {
	var isvalid = $("#registerForm").valid();
	if (isvalid) {
		RegisterFormSubmit();
		document.getElementById("registerForm").reset();
	}
}

function LoginSumbit() {
	var isvalid = $("#LoginForm").valid();
	if (isvalid) {
		let RuserName = $("#Lusername").val();
		let Rpassword = $("#Lpassword").val();

		if (login(RuserName, Rpassword)) {
			document.getElementById("LoginForm").reset();
		}

	}
}


