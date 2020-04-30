

var currentUser;
var isLoggedIn = false;

$(document).ready(function () {
	//default user - p
	var defaultUser = new User("p","p","","","","","","");
	sessionStorage.setItem(defaultUser.username, JSON.stringify(defaultUser));
	console.log("ppppp user  added: ");


});

function login(username, password) {
	let user=JSON.parse(sessionStorage.getItem(username));
	console.log(user);
	console.log(user.password);
	console.log(password);

	if(user.password == password){
		console.log("Welcome!! logged in username  " + username);
		switchDiv("Setting");
		currentUser=user;
		isLoggedIn=true;
		return true;

	}
	else {
		alert("bad deatals!!"); // ToDo delete
		return false;

	}

}

function isUserNameExist(username) {
	let ans = sessionStorage.hasOwnProperty(username);
	console.log("username  " + username + "  exist: " + ans);
	return ans;
}

function addUserToSessionStorage(username,password,firstname,lastname,email,day,month,year) {
	let newUser = new User(username,password,firstname,lastname,email,day,month,year);
    sessionStorage.setItem(newUser.username, JSON.stringify(newUser));
	console.log("user  added: " + username);

}

function RegisterFormSubmit() {
	// get all the inputs into an array.
	let RuserName =$("#Rusername").val();
	let Rpassword =$("#Rpassword").val();
	let RfirstName =$("#Rfirstname").val();
	let RlastName =$("#Rlastname").val();
	let Remail =$("#Remail").val();
	let Rday =$("#day").val();
	let Rmonth =$("#month").val();
	let Ryear =$("#year").val();

	addUserToSessionStorage(RuserName, Rpassword,RfirstName,RlastName,Remail,Rday,Rmonth,Ryear);
	login(RuserName, Rpassword);
}



class User{
    username;
    password;
	firstname;
	lastname;
    email;
    day;
    month;
    year;

    constructor( username,password,firstname,lastname,email,day,month,year) {
        this.username = username;
        this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
        this.email = email;
        this.day = day;
        this.month = month;
        this.year = year;
	}

}
