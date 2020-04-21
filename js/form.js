$(document).ready(function () {

	$('#registerForm').validate({ // initialize the plugin
		rules: {
			username: "required",
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

			day:{
				required: true
			},
			month:{
				required: true
			},
			year:{
				required: true
			}
		},
		// Specify validation error messages
		messages: {
			firstname: {
				required: "Please enter your firstname",
				regex: "only letters please!"

			},
			lastname: "Please enter your lastname",
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 6 characters long",
				regex: "Your password must contains at least one letter and one number"
			},
			email: "Please enter a valid email address"
		},

		errorPlacement: function (error, element) {
			error.insertBefore(element);
		},
		submitHandler: function (form) { // for demo
			alert('valid form submitted'); // for demo
			return false; // for demo
		}
	});

	$('#LoginForm').validate({ // initialize the plugin
		rules: {
			username: {
				required: true

			},
			password: {
				required: true,
			}
		},
		// Specify validation error messages
		messages: {
			username: {
				required: "Please provide a user"
			},
			password: {
				required: "Please provide a password"
			}

		},
		submitHandler: function (form) { // for demo
			alert('valid  login form submitted'); // for demo
			return false; // for demo
		}
	});



});

//set regex check
$(function () {
	$.validator.addMethod("regex", function (value, element, regexpr) {
		return regexpr.test(value);
	});
});

// for birthday picker
$(document).ready(function () {
	$.dobPicker({
		daySelector: '#Rday', /* Required */
		monthSelector: '#Rmonth', /* Required */
		yearSelector: '#Ryear', /* Required */
		dayDefault: 'Day', /* Optional */
		monthDefault: 'Month', /* Optional */
		yearDefault: 'Year', /* Optional */
		minimumAge: 12, /* Optional */
		maximumAge: 100 /* Optional */
	});
});








