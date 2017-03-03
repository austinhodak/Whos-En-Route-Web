var config = {
	apiKey: "AIzaSyA4JePuNGuSts3XHCxtpcE6E_IeVWrkoIc",
	authDomain: "fire-department-manager.firebaseapp.com",
	databaseURL: "https://fire-department-manager.firebaseio.com",
	storageBucket: "fire-department-manager.appspot.com",
};

var agencyApp = firebase.initializeApp(config, 'Agency');

initFirebase();
var senderPage;

function initFirebase() {
	this.auth = agencyApp.auth();
	this.database = agencyApp.database();
	this.storage = agencyApp.storage();
	// Initiates Firebase auth and listen to auth state changes.
	auth.onAuthStateChanged(function (user) {
		if (user) {
			$('.ui.submit').removeClass('loading');
			console.log(user);
			window.location.href = 'https://agency.whosenroute.com';
		}
	});
}

$(document).ready(function () {

	var validation = {
		email: {
			identifier: 'email',
			rules: [
				{
					type: 'empty'
				}
      ]
		},
		password: {
			identifier: 'password',
			rules: [
				{
					type: 'empty'
				}
      ]
		}
	};
	var settings = {
		onSuccess: function () {

			login();
			return false;
		} 
	};

	$('.ui.form').form(validation, settings);

});

function login() {
	$form = $('.ui.form');
	$('.ui.submit').addClass('loading');
	agencyApp.auth().signInWithEmailAndPassword($form.form('get value', 'email'), $form.form('get value', 'password')).catch(function (error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		$('.ui.submit').removeClass('loading');
		alert(errorMessage);
	});
}

//function hashChanged() {
//  switch (window.location.hash.substr(1)) {
//    case "dashboard":
//    senderPage = "/dashboard.html"
//    break;
//    case 'dispatch':
//    senderPage = "/dispatch.html"
//    break;
//  }
//  console.log(window.location.hash.substr(1));
//}
//
//$(document).ready(function() {
//  hashChanged();
//});
