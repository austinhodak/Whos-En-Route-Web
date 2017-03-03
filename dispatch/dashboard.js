initFirebase();
var loaded = false;
var agencies = [];
startTime();
$('.ui.dropdown').dropdown({fullTextSearch: true});

$('.ui.checkbox').checkbox();

$('#prefilldropdown')
	.dropdown({
	onChange(value, text, $choice) {
		console.log(text);
		if (!$('#prefilldropdown').dropdown('get text').trim()) {

		} else {
			$('#notify_text_form').val($('#prefilldropdown').dropdown('get text').trim());
		}
	}
});

$('#notify_text_form').on('input', function() {
	// do something
	$('#prefilldropdown').dropdown('restore defaults');
});

$('#DispatchAgencyDropdownDiv').dropdown({allowAdditions:true});

$('#quick_dispatch_prefill')
	.dropdown({
	onChange(value, text, $choice) {
		console.log(text);
		if (!$('#quick_dispatch_prefill').dropdown('get text').trim()) {

		} else {
			$('#dispatch_type_field').val($('#quick_dispatch_prefill').dropdown('get text').trim());
		}
	}
});

$('#dispatch_type_field').on('input', function() {
	// do something
	$('#quick_dispatch_prefill').dropdown('restore defaults');
});

$(function () {
	$('#alarmTime, #dispatchTime').datetimepicker({
		sideBySide:true,
		format: 'MM/DD/YYYY HH:mm:ss',
		useCurrent: true,
		defaultDate: new Date()
	});
});

function initFirebase() {
	this.auth = firebase.auth();
	this.database = firebase.database();
	this.storage = firebase.storage();
	// Initiates Firebase auth and listen to auth state changes.
	auth.onAuthStateChanged(function(user) {
		if (user) {
			console.log(user);
			if (loaded) {

			} else {
				loaded = true;
				loadUserInformation(user);
			}
		} else {
			firebase.auth().signInWithEmailAndPassword("dispatch@warren-county.net", "warrenco").catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// ...
			});
		}
	});
}

$('#sign_out').click(function(){
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
	}, function(error) {
		// An error happened.
	});
});

var departments = {};

function loadUserInformation(user) {
	var userId = user.uid;
	firebase.database().ref('/dispatchers/' + userId).once('value').then(function(snapshot) {
		var countyID = snapshot.val().county;
		$('.user_name').text(snapshot.val().name);
		firebase.database().ref('/counties/' + countyID).once('value').then(function(snapshotCounty) {
			$('#county_name').html('<i class="fa fa-circle text-success"></i> ' + snapshotCounty.val().name);
		});

		var agencyNumber = 0;
		var countyData;
		//Load Departments
		var countyReference = firebase.database().ref('counties/' + countyID).child('departments').orderByValue();
		// countyReference.on('child_added', function(data) {
		//   firebase.database().ref('departments').child(data.key).once('value', setDepartment);
		// });

		countyReference.once('value').then(function(snapshot) {
			countyData = snapshot;
			snapshot.forEach(function(snap) {
				departments[snap.key] = {snapshot: snap};
				firebase.database().ref('departments').child(snap.key).once('value', setDepartment);
			});
		});

		var setDepartment = function(data) {
			agencyNumber ++;

			var departmentVal = data.val();
			//$('.loader').hide();
			agencies.push(data);
			if (agencyNumber == countyData.numChildren()) {
				sortAgencies();
				console.log('Sorting');
			}
		}.bind(this);
	});
}

function sortAgencies() {
	agencies.sort(function(a, b) {
		if (a.val().name > b.val().name) {
			return -1;
		}
		if (a.val().name < b.val().name) {
			return 1;
		}
		return 0;
	});

	for (i = 0; i < agencies.length; i++) {
		loadDepartment(agencies[i]);
	}
}


function loadDepartment(departmentData) {
	$('.loader').hide();
	var membersList = {};
	var memberNumber = 0;

	var departmentVal = departmentData.val();
	var agency = '<li id="'+departmentData.key+'"><a href="#'+departmentData.key+'"><i class="text-green">'+departmentVal.stationNumber+'</i> <span>'+departmentVal.dispatchIdentifier+'</span></a></li>'
	$(agency).insertAfter('#agency_header');

	$('#quickNotifySendToDropdown').prepend('<option value="'+departmentData.key+'">'+departmentVal.dispatchIdentifier+" "+departmentVal.stationNumber+'</option>');

	$('#DispatchAgencyDropdown').prepend('<div class="item" data-value="'+departmentData.key+'">'+departmentVal.dispatchIdentifier+" "+departmentVal.stationNumber+'</div>');

	var dashboardDeptCard = '<div class="col-md-3" id="'+departmentData.key+'">' +
		'<div class="box box-success collapsed-box">' +
		'<div class="box-header with-border">' +
		'<h3 class="box-title">'+departmentVal.dispatchIdentifier+" "+departmentVal.stationNumber+'</h3>' +
		'<div class="box-tools pull-right">' +
		'<span class="ui label small white circular" style="margin-right:12px"><i class="car icon"></i> 0</span>' + 
		'<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i></button>' +
		'</div>' +
		'</div>' +
		'<div class="box-body">' +
		'<ul class="nav nav-stacked">'+
		'</ul></div></div></div>';

	$('#db_dept_cards').prepend(dashboardDeptCard);

	var departmentRef = firebase.database().ref('departments/' + departmentData.key).child('members');
	departmentRef.on('child_added', function(data) {
		memberNumber ++;
		firebase.database().ref('users').child(data.key).on('value', setUser);
	});

	var setUser = function(data) {
		var respondingListItemTemplate =  '<li id="'+data.key+'" data-toggle="tooltip" data-placement="left"><a>'+data.val().name+' <small class="text-green">'+ data.val().respondingTo +'</small> <span class="pull-right"></span></a></li>';
		console.log(data.val().name);
		//CHANGE
		if (data.val().isResponding && data.val().respondingAgency == departmentData.key) {
			departments[departmentData.key].hasRespondingMembers = true;

			$('#'+data.val().respondingAgency+' .box').removeClass('box-success').addClass('box-warning');
			$('.sidebar-menu #'+data.val().respondingAgency+' i').removeClass('text-green').addClass('text-yellow');

			$('#'+data.val().respondingAgency+' .box .nav').append(respondingListItemTemplate);
			$('#'+data.val().respondingAgency+' .box .nav #' + data.key).attr('title', data.val().position);

			if (data.val().positions.officer) {
				$('#'+data.val().respondingAgency+' .box .nav #' + data.key + ' .pull-right').append('<i class="ui red empty circular label" data-toggle="tooltip" title="OFFICER"></i>');
			}
			if (data.val().positions.medical) {
				$('#'+data.val().respondingAgency+' .box .nav #' + data.key + ' .pull-right').append('<i class="ui blue empty circular label" data-toggle="tooltip" title="MEDICAL"></i>');
			}
			if (data.val().positions.firefighter) {
				$('#'+data.val().respondingAgency+' .box .nav #' + data.key + ' .pull-right').append('<i class="ui green empty circular label" data-toggle="tooltip" title="FIREFIGHTER"></i>');
			}
			if (data.val().positions.driver) {
				$('#'+data.val().respondingAgency+' .box .nav #' + data.key + ' .pull-right').append('<i class="ui teal empty circular label" data-toggle="tooltip" title="DRIVER"></i>');
			}
			if (data.val().positions.other) {
				$('#'+data.val().respondingAgency+' .box .nav #' + data.key + ' .pull-right').append('<i class="ui orange empty circular label" data-toggle="tooltip" title="OTHER"></i>');
			}
		} else if (!data.val().isResponding || data.val().respondingAgency != departmentData.key) {
			$('.box .nav #' + data.key).remove();
		}

		if ($('#'+departmentData.key+' .box .nav li').length == 0) {
			$('#'+departmentData.key+' .box').addClass('box-success').removeClass('box-warning').removeClass('box-danger');
			$('.sidebar-menu #'+departmentData.key+' i').addClass('text-green').removeClass('text-yellow').removeClass('text-danger');
		}

		//IF ONSCENE... IF ANY MEMBER HAS FIRE, INJURIES, OR ENTRAPMENT, USE RED.
		//IF ALS BLUE; IF CAUTION ORANGE

		if (data.val().on_scene) {
			if (data.val().on_scene.EMS && !data.val().on_scene.MVA && !data.val().on_scene.STRUCTF) {
				if (data.val().on_scene.EMS.indexOf('ALS') != -1) {
					//ALS REQUESTED.
					$('#'+departmentData.key+' .box').addClass('box-info box-solid').removeClass('box-warning box-success').removeClass('box-danger');
					
					$('.sidebar-menu #'+departmentData.key+' i').addClass('text-info').removeClass('text-yellow').removeClass('text-success').removeClass('text-danger');
					
					$('#'+data.val().respondingAgency+' .box .nav #' + data.key + ' .pull-right').append('<a class="ui blue circular label" data-toggle="tooltip" title="ALS REQUESTED">ALS</a>');
				} else if (data.val().on_scene.EMS.indexOf('SIGN') != -1) {
					//SIGN OFF
					$('#'+departmentData.key+' .box').addClass('box-info box-solid').removeClass('box-warning box-success').removeClass('box-danger');
					
					$('.sidebar-menu #'+departmentData.key+' i').addClass('text-info').removeClass('text-yellow').removeClass('text-success').removeClass('text-danger');
					
					$('#'+data.val().respondingAgency+' .box .nav #' + data.key + ' .pull-right').append('<a class="ui blue circular label" data-toggle="tooltip" title="POSSIBLE SIGN OFF">SIGN OFF</a>');
				}
			}
			
			if (data.val().on_scene.MVA) {
				if (data.val().on_scene.MVA.indexOf('ENTRAPMENT') != -1) {
					//ALS REQUESTED.
					$('#'+departmentData.key+' .box').addClass('box-danger box-solid').removeClass('box-warning box-info box-success');
					
					$('.sidebar-menu #'+departmentData.key+' i').addClass('text-danger').removeClass('text-yellow').removeClass('text-success').removeClass('text-info');
					
					$('#'+data.val().respondingAgency+' .box .nav #' + data.key + ' .pull-right').append('<a class="ui red circular label" data-toggle="tooltip" title="ENTRAPMENT">TRAP</a>');
				} else if (data.val().on_scene.EMS.indexOf('FIRE') != -1) {
					//SIGN OFF
					$('#'+departmentData.key+' .box').addClass('box-danger box-solid').removeClass('box-warning box-info box-success');
					
					$('.sidebar-menu #'+departmentData.key+' i').addClass('text-danger').removeClass('text-yellow').removeClass('text-success').removeClass('text-info');
					
					$('#'+data.val().respondingAgency+' .box .nav #' + data.key + ' .pull-right').append('<a class="ui red circular label" data-toggle="tooltip" title="FIRE">FIRE</a>');
				} else if (data.val().on_scene.EMS.indexOf('INJURIES') != -1) {
					//SIGN OFF
					$('#'+departmentData.key+' .box').addClass('box-danger box-solid').removeClass('box-warning box-info box-success');
					
					$('.sidebar-menu #'+departmentData.key+' i').addClass('text-danger').removeClass('text-yellow').removeClass('text-success').removeClass('text-info');
					
					$('#'+data.val().respondingAgency+' .box .nav #' + data.key + ' .pull-right').append('<a class="ui red circular label" data-toggle="tooltip" title="INJURIES">INJ</a>');
				}
			}
		}

		$('#' + departmentData.key + ' .box-tools span').html('<i class="car icon"></i> ' + $('#'+departmentData.key+' .box .nav li').length);

	}.bind(this);
}

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('clock').innerHTML =
		h + ":" + m + ":" + s;
	var t = setTimeout(startTime, 500);
}
function checkTime(i) {
	if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	return i;
}