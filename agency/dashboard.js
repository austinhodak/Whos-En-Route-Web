var config = {
	apiKey: "AIzaSyA4JePuNGuSts3XHCxtpcE6E_IeVWrkoIc",
	authDomain: "fire-department-manager.firebaseapp.com",
	databaseURL: "https://fire-department-manager.firebaseio.com",
	storageBucket: "fire-department-manager.appspot.com",
};

var agencyApp = firebase.initializeApp(config, 'Agency');

var secondaryLogin = firebase.initializeApp(config, 'Secondary');

initFirebase();

jQuery.fn.insertAt = function(index, element) {
	var lastIndex = this.children().size()
	if (index < 0) {
		index = Math.max(0, lastIndex + 1 + index)
	}
	this.append(element)
	if (index < lastIndex) {
		this.children().eq(index).before(this.children().last())
	}
	return this;
}

function initFirebase() {
	this.auth = agencyApp.auth();
	this.database = agencyApp.database();
	this.storage = agencyApp.storage();
	// Initiates Firebase auth and listen to auth state changes.
	auth.onAuthStateChanged(function (user) {
		if (user) {
			console.log(user);
			if (loaded) {

			} else {
				loaded = true;
				loadUserInformation(user);
			}
		} else {
			//			agencyApp.auth().signInWithEmailAndPassword("ahodak65@gmail.com", "tanker654").catch(function(error) {
			//				// Handle Errors here.
			//				var errorCode = error.code;
			//				var errorMessage = error.message;
			//				// ...
			//			});
			window.location.href = "/login.html"
		}
	});
}



var loaded = false;
var agencies = [];
startTime();
$('.ui.dropdown').dropdown({
	fullTextSearch: true
});

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

$('#notify_text_form').on('input', function () {
	// do something
	$('#prefilldropdown').dropdown('restore defaults');
});

$('#DispatchAgencyDropdownDiv').dropdown({
	allowAdditions: true
});

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

$('#dispatch_type_field').on('input', function () {
	// do something
	$('#quick_dispatch_prefill').dropdown('restore defaults');
});

$(function () {
	$('#alarmTime, #dispatchTime, #newIncidentTimesAlarm').datetimepicker({
		sideBySide: true,
		format: 'MM/DD/YYYY HH:mm:ss',
		useCurrent: true,
		defaultDate: new Date()
	});
	$('#NFIRSIncidentDate').datepicker();
});

$('#respondMemberDropdownD')
	.dropdown({
	onChange(value, text, $choice) {
		var selectedMembers = value.split(',');
		for (i = 0; i < selectedMembers.length; i++) {
			//console.log(selectedMembersName[i]);
		}
	}
});

mapboxgl.accessToken = 'pk.eyJ1IjoiYWhvZGFrIiwiYSI6ImNpcTcwMGJibjAwaWNmbWtreDA2MXpkOXgifQ.vxl9fB06MPmMGuvE4hXotA';
L.mapbox.accessToken = 'pk.eyJ1IjoiYWhvZGFrIiwiYSI6ImNpcTcwMGJibjAwaWNmbWtreDA2MXpkOXgifQ.vxl9fB06MPmMGuvE4hXotA';
var map = new mapboxgl.Map({
	container: 'map',
	center: [-79.318746, 41.849754],
	zoom: 9.5,
	style: 'mapbox://styles/mapbox/streets-v9'
});
var nav = new mapboxgl.Navigation({
	position: 'top-left'
}); // position is optional
map.addControl(nav);

var directions = new mapboxgl.Directions({
	unit: 'imperial',
	profile: 'driving',
	controls: {
		inputs: false,
		instructable: false
	},
	interactive: false
});

map.addControl(directions);

map.on('load', () => {

});

window.onresize = function () {
	setTimeout(function () {
		map.updateSize();
	}, 200);
}

$('#sign_out').click(function () {
	agencyApp.auth().signOut().then(function () {
		// Sign-out successful.
	}, function (error) {
		// An error happened.
	});
});

$('#inven_QA_dop').datetimepicker({
	viewMode: 'years',
	format: 'MM/DD/YYYY'
});

var departments = {};
var agencyIDGlobal;

$('.user_name').text('');

function loadUserInformation(user) {
	var userId = user.uid;
	agencyApp.database().ref('/users/' + userId).once('value').then(function (snapshot) {
		$('.user_name').text(snapshot.val().name);
		var agencyVal;
		agencyIDGlobal = snapshot.val().department;
		var agencyID = snapshot.val().department;
		$('.user_name').text(snapshot.val().name);
		agencyApp.database().ref('/departments/' + agencyID).once('value').then(function (snapshotCounty) {
			$('#county_name').html('<i class="fa fa-circle text-success"></i> ' + snapshotCounty.val().name);
			agencyVal = snapshotCounty.val();

			$(document).prop('title', agencyVal.name + " | Who's En Route?");
			//LOAD UP INCIDENTS AND MAP IF NECCESARY
			var incidentReference = agencyApp.database().ref('departments/' + agencyID).child('records/incidents').limitToLast(1);
			incidentReference.on('child_added', function (data) {
				/* LOAD FOR MAP/CURRENT INCIDENT */
				agencyApp.database().ref('AgencyIncidents').child(data.key).on('value', function (snap) {

					var incidentVal = snap.val();

					if (!incidentVal.activeIncident) {
						$('#active_incident_home').hide();
						return;
					}

					var location;

					if (incidentVal.location != null) {
						if (incidentVal.location.lat != null) {
							directions.setOrigin([agencyVal.location.lng, agencyVal.location.lat]);
							directions.setDestination([incidentVal.location.lng, incidentVal.location.lat]);
						} else {
							directions.setOrigin([]);
							directions.setDestination([]);
						}

						location = ' | ' + incidentVal.location.address;
					} else {
						location = null;
						directions.setOrigin([]);
						directions.setDestination([]);
					}

					var incident = '<a class="close" aria-hidden="true" style="color:white;opacity:0.9;text-decoration:none">' + moment(incidentVal.date, "YYYY/MM/DD HH:mm:ss").format('HH:mm:ss') + '</a>' +
						'<h4 style="font-size:18px;"><i class="icon fa-ambulance"></i> ' + incidentVal.type + location + '</h4>' +
						incidentVal.message;

					$('#active_incident_home').html(incident);
					$('#active_incident_home').show();

				});
				/* LOAD FOR LISTS */
				agencyApp.database().ref('AgencyIncidents').child(data.key).once('value', function (snap) {
					loadHomeIncidents(snap);

					var incidentVal = snap.val();

					var NFIRS1000, NFIRS1005, NFIRS1010;

					NFIRS1000 = incidentVal.NFIRS - 1000;
					NFIRS1005 = incidentVal.NFIRS - 1005;
					//NFIRS1010 = ;

					var timeFormatted, dateFormatted;

					timeFormatted = moment(incidentVal.NFIRSDate, "YYYYMMDDHHmmss").format('HH:mm:ss');
					dateFormatted = moment(incidentVal.NFIRSDate, "YYYYMMDDHHmmss").format('MM/DD/YYYY');

					var address;
					// NUMBER PREFIX NAME TYPE SUFFIX
					address = snap.child('NFIRS-1010/10').val() + ' ' + streetPrefix[snap.child('NFIRS-1010/11').val()] + ' ' + snap.child('NFIRS-1010/12').val() + ' ' + streetTypes[snap.child('NFIRS-1010/13').val()] + ' ' + streetPrefix[snap.child('NFIRS-1010/14').val()] + ' ' + snap.child('NFIRS-1010/16').val() + ' ' + snap.child('NFIRS-1010/17').val() + ' ' + snap.child('NFIRS-1010/18').val();

					address.replace(/\s{2,}/g, ' ');

					var incidentType, incidentCategory;
					incidentType = snap.child('NFIRS-1005/8').val();
					incidentCategory = snap.child('NFIRS-1005/8').val().charAt(0) + "00";

					console.log(streetTypes[snap.child('NFIRS-1010/13').val()]);

					var incidentDIV = '<tr id="incident-' + snap.key + '">' +
						'<td style="vertical-align:middle"><strong>' + incidentVal.IncidentNum + '</strong><br>Disp. #: ' + incidentVal.DispatchNum + '</td>' +
						'<td style="vertical-align:middle">' + dateFormatted + '<br>' + timeFormatted + '</td>' +
						'<td style="vertical-align:middle"><strong>' + incidentType + ' - ' + incidentTypeNew[incidentType] + '</strong><br>' + address + '</td>' +
						'</tr>';

					$('#incidents_table').append(incidentDIV);
				});
			});
		});

		var agencyNumber = 0;
		var countyData;
		//Load Departments
		var messageReference = agencyApp.database().ref('departments/' + agencyID).child('messages').limitToLast(20);
		messageReference.on('child_added', function (data) {
			agencyApp.database().ref('messages').child(data.key).once('value', function (snap) {

				var messageVal = snap.val();

				var time;
				if (messageVal.activeIncident) {
					time = '<span class="label label-warning pull-right">' + messageVal.date + '</span></l>';
				} else {
					time = '<span class="label label-warning pull-right">' + messageVal.date + '</span></l>'
				}

				var message = '<li class="item" id=' + snap.key + '>' +
					'<l class="product-title">' + messageVal.type +
					time +
					'<span class="product-description" style="white-space: normal">' + messageVal.message +
					'</span>';

				$('#messages_list_home').prepend(message);

				$('.box-title .fa-circle-o-notch').hide();
			});
		});

		var apparatusRef = agencyApp.database().ref('departments/' + agencyID).child('apparatus');
		apparatusRef.on('child_added', function (data) {
			agencyApp.database().ref('apparatus').child(data.key).on('value', function (snap) {

				var apparatusVal = snap.val();

				if (apparatusVal.inspectionActive) {
					$('#'+data.key+'-headerApparatus-inspection').remove();

					$('.navbar-nav').prepend('<li data-toggle="tooltip" data-placement="bottom" title="Inspection Active" class="notifications-menu" id="'+data.key+'-headerApparatus-inspection"><a class="" data-toggle=""><h3 class="ui white inverted header"><i class="fa fa-wrench"></i>&nbsp; '+apparatusVal.apparatusAbrv+'</h3></a></li>');
				} else {
					$('#'+data.key+'-headerApparatus-inspection').remove();
				}

				var message;

				if (apparatusVal.inService) {
					if (apparatusVal.inStation) {
						message = '<a data-toggle="modal" style="margin-bottom:8px" data-target="#apparatusModal" class="ui blue image label" id="'+snap.key+'">' +
							apparatusVal.apparatusName +
							'<div class="detail">In Service</div></a>';
					} else {
						message = '<a data-toggle="modal" style="margin-bottom:8px" data-target="#apparatusModal" class="ui blue image label" id="'+snap.key+'">' +
							apparatusVal.apparatusName +
							'<div class="detail">In Service | Out of Station</div></a>';
					}

				} else {
					if (apparatusVal.inStation) {
						message = '<a data-toggle="modal" style="margin-bottom:8px" data-target="#apparatusModal" class="ui orange image label" id="'+snap.key+'">' +
							apparatusVal.apparatusName +
							'<div class="detail">Out of Service | In Station</div></a>';
					} else {
						message = '<a data-toggle="modal" style="margin-bottom:8px" data-target="#apparatusModal" class="ui orange image label" id="'+snap.key+'">' +
							apparatusVal.apparatusName +
							'<div class="detail">Out of Service | Out of Station</div></a>';
					}

				}

				if ($('#main_apparatus_list #'+snap.key).length > 0) {
					$('#main_apparatus_list #'+snap.key).replaceWith(message);
				} else {
					$('#main_apparatus_list').append(message);
				}

				var alertTemplate = '<div class="ui message tiny blue">' +
					'<div class="header">' +
					'</div>' +
					'<p></p></div>';

				$('#main_apparatus_list #'+snap.key).click(function() {

					$('#apparatusModalStatusService').unbind();
					$('#apparatusModalStatusStation').unbind();

					var title;
					title = apparatusVal.apparatusName;
					$('#apparatusModalTitle').html(title);
					if (apparatusVal.inService) {
						$('#apparatusModalStatusService a').removeClass('orange').addClass('blue').text("In Service");
						$('#apparatusModalStatusService div').removeClass('orange').addClass('blue');
					} else {
						$('#apparatusModalStatusService a').removeClass('blue').addClass('orange').text("Out of Service");
						$('#apparatusModalStatusService div').removeClass('blue').addClass('orange');
					}

					if (apparatusVal.inStation) {
						$('#apparatusModalStatusStation a').removeClass('orange').addClass('blue').text("In Station");
						$('#apparatusModalStatusStation div').removeClass('orange').addClass('blue');
					} else {
						$('#apparatusModalStatusStation a').removeClass('blue').addClass('orange').text("Out of Station");
						$('#apparatusModalStatusStation div').removeClass('blue').addClass('orange');
					}

					$('#apparatusModalStatusService').click(function() {
						if($('#apparatusModalStatusService a').hasClass('blue')) {
							//Change to OOS
							var updates = {};
							updates['/apparatus/' + snap.key + '/inService'] = false;
							agencyApp.database().ref().update(updates);

							$('#apparatusModalStatusService a').removeClass('blue').addClass('orange').text("Out of Service");
							$('#apparatusModalStatusService div').removeClass('blue').addClass('orange');
						} else {
							//Change to InService
							var updates = {};
							updates['/apparatus/' + snap.key + '/inService'] = true;
							agencyApp.database().ref().update(updates);

							$('#apparatusModalStatusService a').removeClass('orange').addClass('blue').text("In Service");
							$('#apparatusModalStatusService div').removeClass('orange').addClass('blue');
						}
					});

					$('#apparatusModalStatusStation').click(function() {
						if($('#apparatusModalStatusStation a').hasClass('blue')) {
							//Change to OOS
							var updates = {};
							updates['/apparatus/' + snap.key + '/inStation'] = false;
							agencyApp.database().ref().update(updates);

							$('#apparatusModalStatusStation a').removeClass('blue').addClass('orange').text("Out of Station");
							$('#apparatusModalStatusStation div').removeClass('blue').addClass('orange');
						} else {
							//Change to InStation
							var updates = {};
							updates['/apparatus/' + snap.key + '/inStation'] = true;
							agencyApp.database().ref().update(updates);

							$('#apparatusModalStatusStation a').removeClass('orange').addClass('blue').text("In Station");
							$('#apparatusModalStatusStation div').removeClass('orange').addClass('blue');
						}
					});

					if(apparatusVal.alerts) {
						console.log('ALERTS!');
					}
				});

				var incidentDIV = '<tr id="apparatusList-' + snap.key + '">' +
					'<td style="vertical-align:middle"><strong>' + apparatusVal.apparatusName + '</strong></td>' +
					'<td style="vertical-align:middle">' + apparatusVal.apparatusName + '<br>' + apparatusVal.apparatusName + '</td>' +
					'<td style="vertical-align:middle"><strong>' + apparatusVal.apparatusName + ' - ' + apparatusVal.apparatusName + '</strong><br>' + apparatusVal.apparatusName + '</td>' +
					'</tr>';

				var index = $('#apparatus_table_1 #apparatusList-'+snap.key).index();

				$('#apparatus_table_1 #apparatusList-'+snap.key).remove();

				$('#apparatus_table_1').insertAt(index, incidentDIV);

			});
		});

		loadMembersList(agencyID);
		loadInventoryList(agencyID);

		/* LOAD USERS AND CHECK IF RESPONDING */
		/* NOTE WHEN EVERYONE IS UPDATED TO NEW VERSION, REMOVE BLOCKED CODE. */
		var userReference = agencyApp.database().ref('departments/' + agencyID).child('members');
		userReference.on('child_added', function (data) {
			agencyApp.database().ref('users').child(data.key).once('value', function (snapshot) {
				var memberVal = snapshot.val();
				$('#respondMemberDropdown').append('<div class="item" data-value="' + snapshot.key + '">' + memberVal.name + '</option>');
			});
			agencyApp.database().ref('users').child(data.key).on('value', function (snap) {

				var memberVal = snap.val();

				var rowindex = $('#responding_table_home tr').length;
				console.log(rowindex);

				if ($('#' + snap.key + '-respTable').index() > -1) {
					rowindex = $('#' + snap.key + '-respTable').index();
					console.log($('#' + snap.key + '-respTable').index());
				}

				$('#' + snap.key + '-respTable').remove();

				if (agencyID != "riKzg8eeHdh4a4hSz9JQGUh2lgp1") {

					if (memberVal.isResponding && memberVal.respondingAgency == agencyID) {
						//Good to go
					} else {
						$('tfoot > tr > td > strong').text(rowindex + " Responding");
						return;
					}

				} else {
					if (memberVal.isResponding) {
						//Good to go
					} else {
						$('tfoot > tr > td > strong').text(rowindex + " Responding");
						return;
					}
				}

				var position;
				switch (memberVal.mainPosition) {
					case "chief":
						position = '<td style="vertical-align:middle"><span class="ui horizontal label white">' + memberVal.positionAbbrv + '</span>';
						break;
					case "medical":
						position = '<td style="vertical-align:middle"><span class="ui horizontal label blue">' + memberVal.positionAbbrv + '</span>';
						break;
					case "officer":
						position = '<td style="vertical-align:middle"><span class="ui horizontal label red">' + memberVal.positionAbbrv + '</span>';
						break;
					case "firefighter":
						position = '<td style="vertical-align:middle"><span class="ui horizontal label green">' + memberVal.positionAbbrv + '</span>';
						break;
					case "other":
						position = '<td style="vertical-align:middle"><span class="ui horizontal label orange">' + memberVal.positionAbbrv + '</span>';
						break;
					case "driver":
						position = '<td style="vertical-align:middle"><span class="ui horizontal label teal">' + memberVal.positionAbbrv + '</span>';
						break;
					default:
						position = '<td style="vertical-align:middle"><span class="ui horizontal label yellow">' + memberVal.positionAbbrv + '</span>';
						break;
				}

				var time = moment(memberVal.respondingTime, "YYYY/MM/DD HH:mm:ss").format('HH:mm');

				var respondingLabel;
				switch (memberVal.respondingTo.toLowerCase()) {
					case "station":
						respondingLabel = '<a style="font-size:13px;" class="ui image bg-blue label">';
						break;
					case "scene":
						respondingLabel = '<a style="font-size:13px;" class="ui image label-warning label">';
						break;
					case "nr":
						respondingLabel = '<a style="font-size:13px;" class="ui image bg-navy label">';
						break;
					case "can't respond":
						respondingLabel = '<a style="font-size:13px;" class="ui image bg-navy label">';
						break;
					case "on scene":
						respondingLabel = '<a style="font-size:13px;" class="ui image bg-maroon label">';
						break;
					default:
						respondingLabel = '<a style="font-size:13px;" class="ui image bg-gray label">';
						break;
				}

				var member = '<tr id="' + snap.key + '-respTable">' +
					'<td style="vertical-align:middle">' + memberVal.name + '</td>' +
					position + '</td>' +
					'<td>' + respondingLabel + memberVal.respondingTo + ' <div class="detail">' + time + '</div></a></td>' +
					'<td class="update"></td>';
				if (rowindex - 1 == -1) {
					$('#responding_table_home').prepend(member);
				} else {
					$('#responding_table_home > tr').eq(rowindex - 1).after(member);
				}

				$('tfoot > tr > td > strong').text($('#responding_table_home tr').length + " Responding");


				if (memberVal.on_scene) {
					if (memberVal.on_scene.EMS) {
						if (memberVal.on_scene.EMS.indexOf('ALS') != -1) {
							$('#' + snap.key + '-respTable .update').append('<td style="vertical-align:middle"><span class="ui horizontal label blue">ALS REQUEST</span>');
						} else if (memberVal.on_scene.EMS.indexOf('SIGN OFF') != -1) {
							$('#' + snap.key + '-respTable .update').append('<td style="vertical-align:middle"><span class="ui horizontal label blue">SIGN OFF</span>');
						}
					}

					if (memberVal.on_scene.MVA) {
						if (memberVal.on_scene.MVA.indexOf('ENTRAPMENT') != -1) {
							$('#' + snap.key + '-respTable .update').append('<td style="vertical-align:middle"><span class="ui horizontal label red">ENTRAPMENT</span>');
						} if (memberVal.on_scene.MVA.indexOf('FIRE') != -1) {
							$('#' + snap.key + '-respTable .update').append('<td style="vertical-align:middle"><span class="ui horizontal label red">FIRE</span>');
						} if (memberVal.on_scene.MVA.indexOf('INJURIES') != -1) {
							$('#' + snap.key + '-respTable .update').append('<td style="vertical-align:middle"><span class="ui horizontal label red">INJURIES</span>');
						} if (memberVal.on_scene.MVA.indexOf('TRAFFIC') != -1) {
							$('#' + snap.key + '-respTable .update').append('<td style="vertical-align:middle"><span class="ui horizontal label orange">TRAFFIC</span>');
						}
					}
					
					if (memberVal.on_scene.STRUCTF) {
						if (memberVal.on_scene.STRUCTF.indexOf('FIRE') != -1) {
							$('#' + snap.key + '-respTable .update').append('<td style="vertical-align:middle"><span class="ui horizontal label red">FIRE</span>');
						} if (memberVal.on_scene.STRUCTF.indexOf('SMOKE') != -1) {
							$('#' + snap.key + '-respTable .update').append('<td style="vertical-align:middle"><span class="ui horizontal label red">SMOKE</span>');
						} if (memberVal.on_scene.STRUCTF.indexOf('ENTRAPMENT') != -1) {
							$('#' + snap.key + '-respTable .update').append('<td style="vertical-align:middle"><span class="ui horizontal label red">ENTRAPMENT</span>');
						}
					}
					
					if (memberVal.on_scene.OTHER && !memberVal.on_scene.MVA && !memberVal.on_scene.STRUCTF) {
						if (memberVal.on_scene.OTHER.indexOf('TREE') != -1) {
							$('#' + snap.key + '-respTable .update').append('<td style="vertical-align:middle"><span class="ui horizontal label teal">TREE</span>');
						} if (memberVal.on_scene.OTHER.indexOf('LIVE WIRES') != -1) {
							$('#' + snap.key + '-respTable .update').append('<td style="vertical-align:middle"><span class="ui horizontal label red">LIVE WIRES</span>');
						} else if (memberVal.on_scene.OTHER.indexOf('WIRES') != -1) {
							$('#' + snap.key + '-respTable .update').append('<td style="vertical-align:middle"><span class="ui horizontal label teal">WIRES</span>');
						} if (memberVal.on_scene.OTHER.indexOf('TRAFFIC') != -1) {
							$('#' + snap.key + '-respTable .update').append('<td style="vertical-align:middle"><span class="ui horizontal label orange">TRAFFIC</span>');
						}
					}

					if (memberVal.on_scene.SAFETY && $('#' + snap.key + '-respTable .update').children().length < 3) {
						if (memberVal.on_scene.SAFETY.indexOf('CAUTION') != -1) {
							$('#' + snap.key + '-respTable .update').append('<td style="vertical-align:middle"><span class="ui horizontal label orange">CAUTION</span>');
						} if (memberVal.on_scene.SAFETY.indexOf('MANPOWER') != -1 && $('#' + snap.key + '-respTable .update').children().length < 3) {
							$('#' + snap.key + '-respTable .update').append('<td style="vertical-align:middle"><span class="ui horizontal label green">MANPOWER</span>');
						}
					}
				}
			});
		});


	});
}



function loadMembersList(agencyKey) {
	$('#membersListContent .fa-spin').show();

	var membersVal = [];

	var memberNumber = 0;

	$('#members_table').html('');
	$('#inventory_QA_SelectMember .menu').html('');
	var memberRecordReference = agencyApp.database().ref('departments/' + agencyKey).child('records/members');
	var listener = memberRecordReference.on('child_added', function(data) {
		agencyApp.database().ref('members').child(data.key).once('value', function (snapshot) {

		});
	});

	memberRecordReference.once('value').then(function(snapshot) {
		snapshot.forEach(function(snap) {
			agencyApp.database().ref('members').child(snap.key).once('value', function (data) {
				var memberVal = data.val();
				memberNumber ++;
				membersVal.push(data);

				console.log(snap.numChildren())
				if (memberNumber == snapshot.numChildren()) {
					sortMembers(membersVal);
					console.log('Sorting Members');
					$('#membersListContent .box-footer h5').text(snapshot.numChildren() + ' Members');
					$('#membersHomeStatsTotal').text(snapshot.numChildren());
				}

				$('#membersListContent .fa-spin').hide();


			});
		});
	});

	$('#content-member-saveButton').click(function() {
		memberRecordReference.off();
	})
}

function sortMembers(list) {
	list.sort(function (a, b) {
		if (a.val().name.last < b.val().name.last) {
			return -1;
		}
		if (a.val().name.last > b.val().name.last) {
			return 1;
		}
		if (a.val().name.last == b.val().name.last) {
			if (a.val().name.first < b.val().name.first) {
				return -1;
			}
			if (a.val().name.first > b.val().name.first) {
				return 1;
			}
		}

		return 0;
	});

	for (i = 0; i < list.length; i++) {
		loadMember(list[i]);
	}
}

function loadMember(member) {
	var memberVal = member.val();

	var personnelIDTD = '';
	var positionName = '';
	var app = '';

	if (memberVal.personnelID) {
		personnelIDTD = ' <a class="ui label circular tiny blue">' + memberVal.personnelID + '</a>';
	} else {
		//personnelIDTD = '<td style="vertical-align:middle"><strong>Personnel ID</strong>' + '<br>' + usesApp + '</td>';
	}

	if (memberVal.position.primaryName != "") {
		positionName = '<a class="ui label circular tiny">' + memberVal.position.primaryName + '</a>';
	}

	if (memberVal.usesApp) {
		if (memberVal.usesApp == "iOS") {
			app = '<a class="ui label circular tiny teal">' + memberVal.usesApp + '</a>';
		} else {
			app = '<a class="ui label circular tiny green">' + memberVal.usesApp + '</a>';
		}
	}

	var memberDIV = '<tr id="member-' + member.key + '">' +
		'<td style="vertical-align:middle"><strong>' + memberVal.name.last + ', ' + memberVal.name.first + ' &nbsp;&nbsp; '+positionName+'</strong>' + personnelIDTD + app +'</td>' +

		//					'<td style="vertical-align:middle"><strong>' + ' - '  + '</strong><br>' + '</td>' +
		'</tr>';

	$('#members_table').append(memberDIV);

	agencyApp.database().ref('users').child(member.val().uid).once('value', function (appSnap) {
		$('#member-' + member.key).click(function() {
			window.location.hash = '#members&' + member.key + '&edit';
			editMember(member, appSnap);
		});

		appSnap.child('departments').forEach(function(depsnap) {
			if (depsnap.key == agencyIDGlobal) {

			} else {
				agencyApp.database().ref('departments').child(depsnap.key).once('value', function (snap) {
					$('#member-' + member.key + ' td').append('<a class="ui label circular tiny red">' + snap.val().stationNumber + '</a>');
				});
			}
		});
	});

	$('#inventory_QA_SelectMember .menu').append('<div class="item" data-value="'+member.key+'">'+memberVal.name.first + ' ' + memberVal.name.last +'</div>');
	$('#newInventoryItemSelectMember .menu').append('<div class="item" data-value="'+member.key+'">'+memberVal.name.first + ' ' + memberVal.name.last +'</div>');
}


function loadDepartment(departmentData) {
	$('.loader').hide();
	var membersList = {};
	var memberNumber = 0;

	var departmentVal = departmentData.val();
	var agency = '<li id="' + departmentData.key + '"><a href="#' + departmentData.key + '"><i class="text-green">' + departmentVal.stationNumber + '</i> <span>' + departmentVal.dispatchIdentifier + '</span></a></li>'
	$(agency).insertAfter('#agency_header');

	$('#quickNotifySendToDropdown').prepend('<option value="' + departmentData.key + '">' + departmentVal.dispatchIdentifier + " " + departmentVal.stationNumber + '</option>');

	$('#DispatchAgencyDropdown').prepend('<div class="item" data-value="' + departmentData.key + '">' + departmentVal.dispatchIdentifier + " " + departmentVal.stationNumber + '</div>');

	var dashboardDeptCard = '<div class="col-md-3" id="' + departmentData.key + '">' +
		'<div class="box box-success collapsed-box">' +
		'<div class="box-header with-border">' +
		'<h3 class="box-title">' + departmentVal.dispatchIdentifier + " " + departmentVal.stationNumber + '</h3>' +
		'<div class="box-tools pull-right">' +
		'<span class="ui label small white circular" style="margin-right:12px"><i class="car icon"></i> 0</span>' +
		'<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i></button>' +
		'</div>' +
		'</div>' +
		'<div class="box-body">' +
		'<ul class="nav nav-stacked">' +
		'</ul></div></div></div>';

	$('#db_dept_cards').prepend(dashboardDeptCard);

	var departmentRef = agencyApp.database().ref('departments/' + departmentData.key).child('members');
	departmentRef.on('child_added', function (data) {
		memberNumber++;
		agencyApp.database().ref('users').child(data.key).on('value', setUser);
	});

	var setUser = function (data) {
		var respondingListItemTemplate = '<li id="' + data.key + '" data-toggle="tooltip" data-placement="left"><a>' + data.val().name + ' <small class="text-green">' + data.val().respondingTo + '</small> <span class="pull-right"></span></a></li>';
		console.log(data.val().name);
		//CHANGE
		if (!data.val().isResponding && data.val().respondingAgency == departmentData.key) {
			departments[departmentData.key].hasRespondingMembers = true;

			$('#' + data.val().respondingAgency + ' .box').removeClass('box-success').addClass('box-warning');
			$('.sidebar-menu #' + data.val().respondingAgency + ' i').removeClass('text-green').addClass('text-yellow');

			$('#' + data.val().respondingAgency + ' .box .nav').append(respondingListItemTemplate);
			$('#' + data.val().respondingAgency + ' .box .nav #' + data.key).attr('title', data.val().position);

			if (data.val().positions.officer) {
				$('#' + data.val().respondingAgency + ' .box .nav #' + data.key + ' .pull-right').append('<i class="ui red empty circular label" data-toggle="tooltip" title="OFFICER"></i>');
			}
			if (data.val().positions.medical) {
				$('#' + data.val().respondingAgency + ' .box .nav #' + data.key + ' .pull-right').append('<i class="ui blue empty circular label" data-toggle="tooltip" title="MEDICAL"></i>');
			}
			if (data.val().positions.firefighter) {
				$('#' + data.val().respondingAgency + ' .box .nav #' + data.key + ' .pull-right').append('<i class="ui green empty circular label" data-toggle="tooltip" title="FIREFIGHTER"></i>');
			}
			if (data.val().positions.driver) {
				$('#' + data.val().respondingAgency + ' .box .nav #' + data.key + ' .pull-right').append('<i class="ui teal empty circular label" data-toggle="tooltip" title="DRIVER"></i>');
			}
			if (data.val().positions.other) {
				$('#' + data.val().respondingAgency + ' .box .nav #' + data.key + ' .pull-right').append('<i class="ui orange empty circular label" data-toggle="tooltip" title="OTHER"></i>');
			}
		} else if (data.val().isResponding || data.val().respondingAgency != departmentData.key) {
			$('.box .nav #' + data.key).remove();
		}

		if ($('#' + departmentData.key + ' .box .nav li').length == 0) {
			$('#' + departmentData.key + ' .box').addClass('box-success').removeClass('box-warning').removeClass('box-danger');
			$('.sidebar-menu #' + departmentData.key + ' i').addClass('text-green').removeClass('text-yellow').removeClass('text-danger');
		}

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
	if (i < 10) {
		i = "0" + i
	}; // add zero in front of numbers < 10
	return i;
}


$('#respondModalStation').click(function () {
	if (!$('#quick_dispatch_prefill').dropdown('get text')) {
		//Nobody selected.
		return;
	}

	var updates = {};

	var selectedMembers = $('#respondMemberDropdownD').dropdown('get value').split(',');

	for (i = 0; i < selectedMembers.length; i++) {
		updates['/users/' + selectedMembers[i] + '/respondingTo'] = 'Station';
		updates['/users/' + selectedMembers[i] + '/respondingTime'] = moment().format('YYYY/MM/DD HH:mm:ss');
		updates['/users/' + selectedMembers[i] + '/respondingAgency'] = agencyIDGlobal;
		updates['/users/' + selectedMembers[i] + '/isResponding'] = true;
	}

	return agencyApp.database().ref().update(updates);
});

$('#respondModalScene').click(function () {
	if (!$('#quick_dispatch_prefill').dropdown('get text')) {
		//Nobody selected.
		return;
	}

	var updates = {};

	var selectedMembers = $('#respondMemberDropdownD').dropdown('get value').split(',');

	for (i = 0; i < selectedMembers.length; i++) {
		updates['/users/' + selectedMembers[i] + '/respondingTo'] = 'Scene';
		updates['/users/' + selectedMembers[i] + '/respondingTime'] = moment().format('YYYY/MM/DD HH:mm:ss');
		updates['/users/' + selectedMembers[i] + '/respondingAgency'] = agencyIDGlobal;
		updates['/users/' + selectedMembers[i] + '/isResponding'] = true;
	}

	return agencyApp.database().ref().update(updates);
});

$('#respondModalCR').click(function () {
	if (!$('#quick_dispatch_prefill').dropdown('get text')) {
		//Nobody selected.
		return;
	}

	var updates = {};

	var selectedMembers = $('#respondMemberDropdownD').dropdown('get value').split(',');

	for (i = 0; i < selectedMembers.length; i++) {
		updates['/users/' + selectedMembers[i] + '/respondingTo'] = "Can't Respond";
		updates['/users/' + selectedMembers[i] + '/respondingTime'] = moment().format('YYYY/MM/DD HH:mm:ss');
		updates['/users/' + selectedMembers[i] + '/respondingAgency'] = agencyIDGlobal;
		updates['/users/' + selectedMembers[i] + '/isResponding'] = true;
	}

	return agencyApp.database().ref().update(updates);
});

//TODO SETUP MANPOWER AND CANCELLED NOTIFICATIONS.

var memberSettingsHTML = $('#newMembersContent').html();

//CHANGES ADDITION: NAVIGATION BAR LISTENERS

$('#sidebarIncidents').click(function () {
	$('.sidebar-menu > li').removeClass('active');
	$('#sidebarIncidents').parent().addClass('active');
	$('#content-dashboard').hide();
	$('#content-incidents').show();
	$('#content-incidents .content').show();
	$('#newIncidentContent').hide();
	$('#content-inventory').hide();

	$('#content-apparatus').hide();

	window.location.hash = '#incidents';

	$('#content-member-buttons').hide();
	$('#content-incidents-addButton').show();
	$('#content-members').hide();

});

$('#sidebarApparatus').click(function () {
	$('.sidebar-menu > li').removeClass('active');
	$('#sidebarApparatus').parent().addClass('active');
	$('#content-dashboard').hide();
	$('#content-apparatus').show();
	$('#content-apparatus .content').show();
	$('#newIncidentContent').hide();
	$('#content-inventory').hide();
	$('#content-incidents').hide();

	window.location.hash = '#apparatus';

	$('#content-member-buttons').hide();
	$('#content-members').hide();

});

$('#sidebarDashboard').click(function () {
	$('.sidebar-menu > li').removeClass('active');
	$('#sidebarDashboard').parent().addClass('active');
	$('#content-incidents').hide();
	$('#content-dashboard').show();
	$('#content-members').hide();
	$('#content-inventory').hide();
	$('#content-apparatus').hide();

	window.location.hash = '#dashboard';

});

$('#sidebarMembers').click(function () {
	resetMemberForm();
});

$('#sidebarInventory').click(function () {
	$('.sidebar-menu > li').removeClass('active');
	$('#sidebarInventory').parent().addClass('active');
	$('#content-dashboard').hide();
	$('#content-members').hide();
	$('#content-incidents').hide();
	$('#content-apparatus').hide();

	$('#content-inventory').show();

	$('#newInventoryContent').hide();

	window.location.hash = '#inventory';

	$('#content-inventory-buttons').hide();
	$('#content-inventory-addButton').show();
	$('#content-inventory').show();

	$('#membersListInventory').show();

	resetInventoryForm();

});

$('#content-members-addButton').click(function() {
	$('#content-dashboard').hide();
	$('#content-incidents').hide();
	$('#membersListContent').hide();
	$('#newMembersContent').show();
	$('#content-member-buttons').show();
	$('#content-members-addButton').hide();

	window.location.hash = '#members?new'

	$('#memberEditBasicForm').form('clear');
	$('#memberEdit_NotificationSettings').form('clear');
	$('#memberEditContactInfo').form('clear');
	$('#memberEditAddressInfo').form('clear');
	$('#memberEditPositionInfo').form('clear');

	$('#content-member-saveButton').click(function() {
		if (window.location.hash == '#members?new') {

			var $basic = $('#memberEditBasicForm'),
				allFields = $basic.form('get values');

			if ($('#memberEditCreateAccount').checkbox('is checked')) {
				//Create account for user.
				$('#content-member-saveButton div:first-child').addClass("loading");
				secondaryLogin.auth().createUserWithEmailAndPassword(allFields.EMAIL, allFields.PASSWORD).catch(function(error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;

					if (error) {
						console.log(error);
					}


					// ...
				});
				secondaryLogin.auth().onAuthStateChanged(function(user) {
					if (user) {
						// User is signed in.
						var UID = secondaryLogin.auth().currentUser.uid;
						finishSaving(UID);
					} else {
						// No user is signed in.
					}
				});
			} else {
				finishSaving('');
			}

			function finishSaving(UID) {

				var saveUpdates = {};

				var $basic = $('#memberEditBasicForm'),
					allFields = $basic.form('get values');

				var $position = $('#memberEditPositionInfo'),
					positionFields = $position.form('get values');

				var memberSave;

				if (UID == '') {
					var newMemberRef = agencyApp.database().ref().push();
					memberSave = 'members/'+newMemberRef.key+'/';
				} else {
					memberSave = 'members/'+UID+'/';
					saveUpdates[memberSave+'uid'] = UID;

					saveUpdates['users/'+UID+'/canReset'] = true;
					saveUpdates['users/'+UID+'/department'] = agencyIDGlobal;
					saveUpdates['users/'+UID+'/departments/'+agencyIDGlobal] = true;
					saveUpdates['users/'+UID+'/email'] = allFields.EMAIL;
					saveUpdates['users/'+UID+'/canReset'] = true;
					saveUpdates['users/'+UID+'/canReset'] = true;
					saveUpdates['users/'+UID+'/isResponding'] = false;
					saveUpdates['users/'+UID+'/mainPosition'] = positionFields.mainRank;
					saveUpdates['users/'+UID+'/name'] = allFields.FIRST_NAME + " " + allFields.LAST_NAME;
					saveUpdates['users/'+UID+'/phoneNum'] = '';
					saveUpdates['users/'+UID+'/phoneProvider'] = '';
					saveUpdates['users/'+UID+'/position'] = positionFields.primaryPosition;
					saveUpdates['users/'+UID+'/positionAbbrv'] = positionFields.abbreviation;
					saveUpdates['users/'+UID+'/positionColor'] = '2196F3';
					saveUpdates['users/'+UID+'/positionOfficer'] = false;
					saveUpdates['users/'+UID+'/respondingAgency'] = '';
					saveUpdates['users/'+UID+'/respondingTime'] = '';
					saveUpdates['users/'+UID+'/respondingTo'] = '';

					saveUpdates['departments/'+agencyIDGlobal+'/members/'+UID] = true;
				}

				saveUpdates[memberSave+'name/first'] = allFields.FIRST_NAME;
				saveUpdates[memberSave+'name/middle'] = allFields.MIDDLE_NAME;
				saveUpdates[memberSave+'name/last'] = allFields.LAST_NAME;
				saveUpdates[memberSave+'personal/gender'] = allFields.GENDER;
				saveUpdates[memberSave+'personal/DOB'] = allFields.DOB;
				saveUpdates[memberSave+'personal/dlNum'] = allFields.DL_NUM;
				saveUpdates[memberSave+'personnelID'] = allFields.PERSONNEL_ID;
				saveUpdates[memberSave+'uid'] = newMemberRef.key;

				saveUpdates[memberSave+'position/officer'] = false;
				saveUpdates[memberSave+'position/primaryAbbreviation'] = positionFields.abbreviation;
				saveUpdates[memberSave+'position/primaryName'] = positionFields.primaryPosition;
				saveUpdates[memberSave+'position/rankMain'] = positionFields.mainRank;

				saveUpdates['departments/'+agencyIDGlobal+'/records/'+memberSave] = true;

				$('#content-member-saveButton div:first-child').addClass("loading");
				agencyApp.database().ref().update(saveUpdates).then(function(snapshot){
					resetMemberForm();

					saveUpdates = null;

					loadMembersList(agencyIDGlobal);
				});
			}

		} else {
			return;
		}
	});
});


(function () {
	var incidentTypesStrings = [];

	for (var i in incidents) {
		var key = Object.keys(incidents[i])[0];
		var string = incidents[i][key];
		//console.log(key + " / " + incidents[i][key]);
		var label;
		if (key.charAt(0) == 1) {
			label = '<span class = "ui horizontal red small label">';
		}
		if (key.charAt(0) == 2) {
			label = '<span class = "ui horizontal orange small label">';
		}
		if (key.charAt(0) == 3) {
			label = '<span class = "ui horizontal blue small label">';
		}
		if (key.charAt(0) == 4) {
			label = '<span class = "ui horizontal yellow small label">';
		}
		if (key.charAt(0) == 5) {
			label = '<span class = "ui horizontal green small label">';
		}
		if (key.charAt(0) == 6) {
			label = '<span class = "ui horizontal teal small label">';
		}
		if (key.charAt(0) == 7) {
			label = '<span class = "ui horizontal brown small label">';
		}
		if (key.charAt(0) == 8) {
			label = '<span class = "ui horizontal pink small label">';
		}
		if (key.charAt(0) == 9) {
			label = '<span class = "ui horizontal grey small label">';
		}

		if (key.length > 2 && key.charAt(1) != 0 && key.charAt(2) != 0) {
			incidentTypesStrings.push('<div class="item"> ' + label + ' ' + key + ' </span> ' + string + '</div>');
		} else if (key.length == 2 && key.charAt(1) != 0) {
			incidentTypesStrings.push('<div class="header">' + string + '</div>')
		}
	}

	$('#newIncidentTypeDropdown .menu').append(incidentTypesStrings.join(''));
})();


(function () {
	var propertyUseStrings = [];

	for (var i in propertyUse) {
		var key = Object.keys(propertyUse[i])[0];
		var string = propertyUse[i][key];
		//console.log(key + " / " + incidents[i][key]);
		var label;
		if (key.charAt(0) == 1) {
			label = '<span class = "ui horizontal red tiny label">';
		}
		if (key.charAt(0) == 2) {
			label = '<span class = "ui horizontal orange tiny label">';
		}
		if (key.charAt(0) == 3) {
			label = '<span class = "ui horizontal blue tiny label">';
		}
		if (key.charAt(0) == 4) {
			label = '<span class = "ui horizontal yellow tiny label">';
		}
		if (key.charAt(0) == 5) {
			label = '<span class = "ui horizontal green tiny label">';
		}
		if (key.charAt(0) == 6) {
			label = '<span class = "ui horizontal teal tiny label">';
		}
		if (key.charAt(0) == 7) {
			label = '<span class = "ui horizontal brown tiny label">';
		}
		if (key.charAt(0) == 8) {
			label = '<span class = "ui horizontal pink tiny label">';
		}
		if (key.charAt(0) == 9) {
			label = '<span class = "ui horizontal grey tiny label">';
		}

		if (key.length > 2) {
			propertyUseStrings.push('<div class="item" data-value="' + key + '"> ' + label + ' ' + key + ' </span> ' + string + '</div>');
		} else if (key.length == 1) {
			propertyUseStrings.push('<div class="header">' + string + '</div>')
		} 
	}

	$('#newIncidentPropertyUse .menu').append(propertyUseStrings.join('')); 

	$('#form1')
	// set one value
		.form('set values', {
		propertyUse: 'NNN',
		gender: 'NNN'
	});
})();

function loadHomeIncidents(snapshot) {
	var incidentVal = snapshot.val();

	var timeFormatted, dateFormatted;

	dateFormatted = moment(incidentVal.NFIRSDate, "YYYYMMDDHHmmss").format('YYYY/MM/DD HH:mm:ss');

	var address;
	// NUMBER PREFIX NAME TYPE SUFFIX
	address = snapshot.child('NFIRS-1010/10').val() + ' ' + streetPrefix[snapshot.child('NFIRS-1010/11').val()] + ' ' + snapshot.child('NFIRS-1010/12').val() + ' ' + streetTypes[snapshot.child('NFIRS-1010/13').val()] + ' ' + streetPrefix[snapshot.child('NFIRS-1010/14').val()];

	address.replace(/\s{2,}/g, ' ');

	var incidentType, incidentCategory;
	incidentType = snapshot.child('NFIRS-1005/8').val();
	incidentCategory = snapshot.child('NFIRS-1005/8').val().charAt(0) + "00";

	var time = '<span class="label label-success pull-right">' + dateFormatted + '</span></l>';

	var message = '<li class="item" id=' + snapshot.key + '>' +
		'<l class="product-title">' + address +
		time +
		'<span class="product-description" style="white-space: normal">' + incidentType + ' - ' + incidentTypeNew[incidentType] +
		'</span>';

	$('#incidents_list_home').prepend(message);
}

function editMember(memberSnap, appSnap) {
	var memberVal = memberSnap.val();
	var memberAppVal = appSnap.val();

	$('#content-dashboard').hide();
	$('#content-incidents').hide();
	$('#membersListContent').hide();
	$('#newMembersContent').show();
	$('#content-member-buttons').show();
	$('#content-members-addButton').hide();

	var GENDER, DOB, PERSONNEL_ID, DL_NUM, middle_name ="";

	if (memberVal.personal != null && memberVal.personal.gender != null) {
		GENDER = memberVal.personal.gender || "";}
	if (memberSnap.child('personal/DOB').exists()) {DOB = memberVal.personal.DOB || "";}
	if (memberSnap.child('personnelID').exists()) {PERSONNEL_ID = memberVal.personnelID || "";}
	if (memberSnap.child('personal/dlNum').exists()) {DL_NUM = memberVal.personal.dlNum || "";}
	if (memberSnap.child('name/middle').exists()) {middle_name = memberVal.name.middle || "";}

	try {

		$('#memberEditBasicForm').form('set values', {
			FIRST_NAME: memberVal.name.first,
			MIDDLE_NAME: middle_name.charAt(0),
			LAST_NAME: memberVal.name.last,
			GENDER: GENDER,
			DOB: DOB,
			PERSONNEL_ID: PERSONNEL_ID,
			DL_NUM: DL_NUM
		});

		if(memberVal.contactInfo) {
			$('#memberEditContactInfo').form('set values', {
				PHONE_HOME: memberVal.contactInfo.home.number,
				PHONE_MOBILE: memberVal.contactInfo.mobile.number,
				PHONE_WORK: memberVal.contactInfo.work.number,
				CONTACTPRIMARY: [memberVal.contactInfo.primaryContact]
			});
		}

		if(memberVal.position) {
			$('#memberEditPositionInfo').form('set values', {
				primaryPosition: memberVal.position.primaryName,
				abbreviation: memberVal.position.primaryAbbreviation,
				mainRank: memberVal.position.rankMain
			});
		}

		if(appSnap.exists()) {
			$('#memberEditCreateAccount').checkbox('set checked');
			$('#memberEditCreateAccount').checkbox('set disabled');
			$('#memberEditCreateAccount label').text('Account found for member.');
			$('#memberEditCreateAccountDiv').show();

			$('#memberEditBasicForm').form('set values', {
				EMAIL: appSnap.val().email
			});

			$('#memberEditAccountMessage').hide();
		} else {
			$('#memberEditCreateAccount').checkbox('set unchecked');
			$('#memberEditCreateAccount').checkbox('set enabled');
			$('#memberEditCreateAccount label').text('Member does not have an account. Check to create one.');
			$('#memberEditCreateAccountDiv').hide();
		}

		if (memberSnap.child('inventory').exists()) {
			$('#II_spin').show();
			memberSnap.child('inventory').forEach(function(item) {
				agencyApp.database().ref('inventory').child(item.key).once('value', function (data) {
					var memberVal = data.val();
					//console.log(memberVal);
					loadMemberInvItem(data);

					$('#II_spin').hide();
				});
			});
		}

		function loadMemberInvItem(item) {
			var itemVal = item.val();

			var serial = '', location;

			if (itemVal.serial_number != "") {
				serial = '&nbsp;<a class="ui label circular tiny">' + itemVal.serial_number + '</a>';
			}

			var itemDIV = '<tr id="memberInvItem-' + item.key + '">' +
				'<td style="vertical-align:middle"><strong>' + itemVal.item_type + ' &nbsp; ' + serial + ' &nbsp;' + '</strong>'+'</td>' +
				'</tr>';

			$('#memberEdit_ItemsTable').append(itemDIV);

			//			if (itemVal.location != "") {
			//				agencyApp.database().ref('departments/'+agencyIDGlobal+'/records/inventoryLocations').child(itemVal.location).once('value', function (snap) {
			//					$('#memberInvItem-' + item.key + ' td').append('&nbsp;<a class="ui label circular tiny blue">' + snap.val().name + '</a>');
			//
			//					$('#memberInvItem-' + item.key).click(function() {
			//						window.location.hash = '#items&' + item.key + '&edit';
			//						editInvItem(item, snap, null);
			//					});
			//				});
			//			}

			//			if (item.child('issued_to').exists()) {
			//				agencyApp.database().ref('members/'+itemVal.issued_to).once('value', function (snap) {
			//					$('#memberInvItem-' + item.key + ' td').append('&nbsp;<a class="ui label circular tiny teal">' + snap.val().name.first.charAt(0) + '. ' + snap.val().name.last + '</a>');
			//
			//					$('#memberInvItem-' + item.key).click(function() {
			//						window.location.hash = '#items&' + item.key + '&edit';
			//						editInvItem(item, null, snap);
			//					});
			//				});	
			//			}

			if (item.child('other').exists()) {
				var other = itemVal.other;
				if (other != "") {
					if (other.indexOf('Size:') != -1) {
						$('#memberInvItem-' + item.key + ' td').append('<a class="ui label circular tiny purple">' + itemVal.other + '</a>');
					}
				}
			}
		}

		$('#member_edit_notification_new').click(function(){
			var newNotifyRef = agencyApp.database().ref().child('members/'+memberSnap.key+'/notifications').push();


			var newNotifyDiv = '<h4 class="ui dividing header">Notify Setup</h4>'+
				'<div class="equal width fields" id="'+memberSnap.key+'-notify-'+newNotifyRef.key+'">' +
				'<div class="field"><label>Email or Phone you would like notifications sent to.</label><input name="" type="text" placeholder="Email or Phone"></div></div>' +
				'<div class="inline fields" id="'+memberSnap.key+'-notify2-'+newNotifyRef.key+'"><label>Notify For</label><div class="field"><div class="ui checkbox"><input type="checkbox" name="frequency" checked="checked"><label>Everything</label></div></div>'+
				'<div class="field"><div class="ui checkbox"><input type="checkbox" name="frequency"><label>Incidents Only</label></div></div>'+												
				'<div class="field"><div class="ui checkbox"><input type="checkbox" name="frequency"><label>Other Notifications Only</label></div></div>'+
				'<div class="ui button circular mini basic" id="removeButton">Remove</div>'+
				'<div class="ui button circular mini negative basic" id="activeButton">Disable</div>'+
				'</div>';

			$('#memberEdit_NotificationSettings').append(newNotifyDiv);


			var updates = {};
			updates['members/'+memberSnap.key+'/notifications/'+newNotifyRef.key+'/active'] = true; 
			updates['members/'+memberSnap.key+'/notifications/'+newNotifyRef.key+'/department/'+agencyIDGlobal] = true; 
			updates['members/'+memberSnap.key+'/notifications/'+newNotifyRef.key+'/receive/all'] = true; 
			updates['members/'+memberSnap.key+'/notifications/'+newNotifyRef.key+'/type'] = 'email'; 
			updates['members/'+memberSnap.key+'/notifications/'+newNotifyRef.key+'/value'] = ''; 
			agencyApp.database().ref().update(updates);

			$('#memberEdit_NotificationSettings_H4').hide();

			$('#'+memberSnap.key+'-notify2-'+newNotifyRef.key + ' #activeButton').click(function() {
				if ($('#'+memberSnap.key+'-notify2-'+newNotifyRef.key + ' #activeButton').hasClass('negative')) {
					$('#'+memberSnap.key+'-notify2-'+newNotifyRef.key + ' #activeButton').removeClass('negative').addClass('positive').text('Enable');

					var updates = {};
					updates['members/'+memberSnap.key+'/notifications/'+newNotifyRef.key+'/active'] = false; 
					agencyApp.database().ref().update(updates);
				} else {
					$('#'+memberSnap.key+'-notify2-'+newNotifyRef.key + ' #activeButton').removeClass('positive').addClass('negative').text('Disable');

					var updates = {};
					updates['members/'+memberSnap.key+'/notifications/'+newNotifyRef.key+'/active'] = true; 
					agencyApp.database().ref().update(updates);
				}
			})

			$('#'+memberSnap.key+'-notify-'+newNotifyRef.key + ' input').bind('focusout', function(){

				var updates = {};
				updates['members/'+memberSnap.key+'/notifications/'+newNotifyRef.key+'/value'] = $('#'+memberSnap.key+'-notify-'+newNotifyRef.key + ' input').val(); 
				agencyApp.database().ref().update(updates);

			});

			$('#'+memberSnap.key+'-notify2-'+newNotifyRef.key + ' #removeButton').click(function() {
				var updates = {};
				updates['members/'+memberSnap.key+'/notifications/'+newNotifyRef.key] = null;
				agencyApp.database().ref().update(updates);

				$('#'+memberSnap.key+'-notify-'+newNotifyRef.key).prev().remove();
				$('#'+memberSnap.key+'-notify-'+newNotifyRef.key).remove();
				$('#'+memberSnap.key+'-notify2-'+newNotifyRef.key).remove();
			});
		});

		memberSnap.child('notifications').forEach(function(snap) {
			console.log(snap.val().value);

			var activeDiv = '';

			if (snap.val().active) {
				activeDiv = '<div id="activeButton" class="ui button circular mini negative basic">Disable</div>';
			} else {
				activeDiv = '<div id="activeButton" class="ui button circular mini positive basic">Enable</div>';
			}

			var notificationSettingDiv = '<h4 class="ui dividing header">Notify Setup</h4>'+
				'<div class="equal width fields" id="'+memberSnap.key+'-notify-'+snap.key+'">' +
				'<div class="field"><label>Email or Phone you would like notifications sent to.</label><input name="" type="text" placeholder="Email or Phone" value="'+snap.val().value+'"></div></div>' +
				'<div class="inline fields" id="'+memberSnap.key+'-notify2-'+snap.key+'"><label>Notify For</label><div class="field"><div class="ui checkbox"><input type="checkbox" name="frequency" checked="checked"><label>Everything</label></div></div>'+
				'<div class="field"><div class="ui checkbox"><input type="checkbox" name="frequency"><label>Incidents Only</label></div></div>'+												
				'<div class="field"><div class="ui checkbox"><input type="checkbox" name="frequency"><label>Other Notifications Only</label></div></div>'+
				'<div class="ui button circular mini basic" id="removeButton">Remove</div>'+
				activeDiv+
				'</div>';

			$('#memberEdit_NotificationSettings_H4').hide();
			$('#memberEditNotificationBox .box-body .form').append(notificationSettingDiv);

			$('#'+memberSnap.key+'-notify2-'+snap.key + ' #activeButton').click(function() {
				if ($('#'+memberSnap.key+'-notify2-'+snap.key + ' #activeButton').hasClass('negative')) {
					$('#'+memberSnap.key+'-notify2-'+snap.key + ' #activeButton').removeClass('negative').addClass('positive').text('Enable');

					var updates = {};
					updates['members/'+memberSnap.key+'/notifications/'+snap.key+'/active'] = false; 
					agencyApp.database().ref().update(updates);
				} else {
					$('#'+memberSnap.key+'-notify2-'+snap.key + ' #activeButton').removeClass('positive').addClass('negative').text('Disable');

					var updates = {};
					updates['members/'+memberSnap.key+'/notifications/'+snap.key+'/active'] = true; 
					agencyApp.database().ref().update(updates);
				}
			})

			$('#'+memberSnap.key+'-notify-'+snap.key + ' input').bind('focusout', function(){
				var updates = {};
				updates['members/'+memberSnap.key+'/notifications/'+snap.key+'/value'] = $('#'+memberSnap.key+'-notify-'+snap.key + ' input').val(); 
				agencyApp.database().ref().update(updates);
			});

			$('#'+memberSnap.key+'-notify2-'+snap.key + ' #removeButton').click(function() {
				var updates = {};
				updates['members/'+memberSnap.key+'/notifications/'+snap.key] = null;
				agencyApp.database().ref().update(updates);

				$(notificationSettingDiv).remove();
			});
		});

	} catch (error) {
		console.log(error);
	}

	$('#content-member-saveButton').click(function() {

		console.log('SAVING!');

		var saveUpdates = {};

		var $basic = $('#memberEditBasicForm'),
			allFields = $basic.form('get values');

		var $position = $('#memberEditPositionInfo'),
			positionFields = $position.form('get values');

		var $contact = $('#memberEditContactInfo'),
			contactFields = $contact.form('get values');

		if (!appSnap.exists() && $('#memberEditCreateAccount').checkbox('is checked')) {
			//Create account for user.
			$('#content-member-saveButton div:first-child').addClass("loading");
			secondaryLogin.auth().createUserWithEmailAndPassword(allFields.EMAIL, allFields.PASSWORD).catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;

				if (error) {
					console.log(error);
				}


				// ...
			});
			secondaryLogin.auth().onAuthStateChanged(function(user) {
				if (user) {
					// User is signed in.
					var UID = secondaryLogin.auth().currentUser.uid;
					finishSaving(UID);
				} else {
					// No user is signed in.
				}
			});
		} else {
			finishSaving('');
		}

		function finishSaving(UID) {

			var memberSave = 'members/'+memberSnap.key+'/';

			if (UID != '') {
				saveUpdates[memberSave+'uid'] = UID;

				saveUpdates['users/'+UID+'/canReset'] = true;
				saveUpdates['users/'+UID+'/department'] = agencyIDGlobal;
				saveUpdates['users/'+UID+'/departments/'+agencyIDGlobal] = true;
				saveUpdates['users/'+UID+'/email'] = allFields.EMAIL;
				saveUpdates['users/'+UID+'/canReset'] = true;
				saveUpdates['users/'+UID+'/canReset'] = true;
				saveUpdates['users/'+UID+'/isResponding'] = false;
				saveUpdates['users/'+UID+'/mainPosition'] = positionFields.mainRank;
				saveUpdates['users/'+UID+'/name'] = allFields.FIRST_NAME + " " + allFields.LAST_NAME;
				saveUpdates['users/'+UID+'/phoneNum'] = '';
				saveUpdates['users/'+UID+'/phoneProvider'] = '';
				saveUpdates['users/'+UID+'/position'] = positionFields.primaryPosition;
				saveUpdates['users/'+UID+'/positionAbbrv'] = positionFields.abbreviation;
				saveUpdates['users/'+UID+'/positionColor'] = '2196F3';
				saveUpdates['users/'+UID+'/positionOfficer'] = false;
				saveUpdates['users/'+UID+'/respondingAgency'] = '';
				saveUpdates['users/'+UID+'/respondingTime'] = '';
				saveUpdates['users/'+UID+'/respondingTo'] = '';

				saveUpdates['departments/'+agencyIDGlobal+'/members/'+UID] = true;
			}

			//TODO ADD CHECKS
			saveUpdates[memberSave+'name/first'] = allFields.FIRST_NAME;
			saveUpdates[memberSave+'name/middle'] = allFields.MIDDLE_NAME;
			saveUpdates[memberSave+'name/last'] = allFields.LAST_NAME;
			saveUpdates[memberSave+'personal/gender'] = allFields.GENDER;
			saveUpdates[memberSave+'personal/DOB'] = allFields.DOB;
			saveUpdates[memberSave+'personal/dlNum'] = allFields.DL_NUM;
			saveUpdates[memberSave+'personnelID'] = allFields.PERSONNEL_ID;

			saveUpdates[memberSave+'position/officer'] = false;
			saveUpdates[memberSave+'position/primaryAbbreviation'] = positionFields.abbreviation;
			saveUpdates[memberSave+'position/primaryName'] = positionFields.primaryPosition;
			saveUpdates[memberSave+'position/rankMain'] = positionFields.mainRank;

			saveUpdates[memberSave+'contactInfo/home/number'] = contactFields.PHONE_HOME;
			saveUpdates[memberSave+'contactInfo/mobile/number'] = contactFields.PHONE_MOBILE;
			saveUpdates[memberSave+'contactInfo/work/number'] = contactFields.PHONE_WORK;

			if (contactFields.CONTACTPRIMARY[0] != false) {
				saveUpdates[memberSave+'contactInfo/primaryContact'] = "HOME";
			} else if (contactFields.CONTACTPRIMARY[1] != false) {
				saveUpdates[memberSave+'contactInfo/primaryContact'] = "MOBILE";
			} else if (contactFields.CONTACTPRIMARY[2] != false) {
				saveUpdates[memberSave+'contactInfo/primaryContact'] = "WORK";
			}


			$('#content-member-saveButton div:first-child').addClass("loading");
			agencyApp.database().ref().update(saveUpdates).then(function(snapshot){

				resetMemberForm();

				saveUpdates = null;

				loadMembersList(agencyIDGlobal);

			});
		}
		//
	});
}

$('#memberEditCreateAccount').checkbox('setting', 'onChange', function(){

	if ($('#memberEditCreateAccount').checkbox('is checked', 'set enabled')) {
		$('#memberEditCreateAccountDiv').show();
	} else {
		$('#memberEditCreateAccountDiv').hide();
	}

});

$('#membersListContent button .fa-refresh').parent().click(function() {
	loadMembersList(agencyIDGlobal);
});

$('#content-members-discardButton').click(function() {
	resetMemberForm();
});

$('#content-inventory-discardButton').click(function() {
	resetInventoryForm();
});

function resetMemberForm() {
	$('#content-member-saveButton div:first-child').removeClass('loading');
	$('#content-member-saveButton').off('click');

	$('.sidebar-menu > li').removeClass('active');
	$('#sidebarMembers').parent().addClass('active');

	$('#content-dashboard').hide();
	$('#content-incidents').hide();
	$('#content-members').show();
	$('#content-member-buttons').hide();
	$('#content-members-addButton').show();
	$('#newMembersContent').hide();
	$('#membersListContent').show();
	$('#content-inventory').hide();

	$('#memberEditNotificationBox .box-body h4').show();


	window.location.hash = '#members';

	$('#memberEditBasicForm').form('clear');
	$('#memberEdit_NotificationSettings').html('');
	$('#memberEditContactInfo').form('clear');
	$('#memberEditAddressInfo').form('clear');
	$('#memberEditPositionInfo').form('clear');

	$('#memberEditCreateAccount').checkbox('set enabled');

	$('#content-member-saveButton').off('click');

	$('#memberEditAccountMessage').show();

	$('#memberEdit_ItemsTable').html('');

}


$('#inven_QA_SAVE').click(function(){
	var $QA = $('#inven_QA_Form'),
		allFields = $QA.form('get values');

	console.log(allFields);
	cnjkeqwfjkldwq
	var newItemRef = agencyApp.database().ref().child('inventory').push();
	var itemSave = 'inventory/'+newItemRef.key+'/';
	var saveUpdates = {};

	saveUpdates[itemSave+'department'] = agencyIDGlobal;
	saveUpdates[itemSave+'final_date'] = allFields.final_disp_date;
	saveUpdates[itemSave+'inventory_list'] = allFields.list;
	saveUpdates[itemSave+'item_type'] = allFields.item_type;
	saveUpdates[itemSave+'location'] = $('#inven_QA_Location').dropdown('get value');

	saveUpdates[itemSave+'purchase_date'] = allFields.date_of_purchase;
	saveUpdates[itemSave+'serial_number'] = allFields.serial_number;
	saveUpdates[itemSave+'suppliers'] = allFields.suppliers;
	saveUpdates[itemSave+'unit_cost'] = allFields.unit_cost;

	saveUpdates[itemSave+'other'] = allFields.other_info;

	var lists = allFields.list.split(',');

	for (i = 0; i < lists.length; i++) {
		saveUpdates['departments/'+agencyIDGlobal+'/records/inventory/'+lists[i]+'/items/'+newItemRef.key] = true;
	}

	if (allFields.mark_inspect) {
		var newInspectRef = agencyApp.database().ref('inventory').child(newItemRef.key+'/inspections').push();
		saveUpdates['inventory/'+newItemRef.key+'/inspections/'+newInspectRef.key+'/date'] = moment().format('YYYY/MM/DD HH:mm:ss');
		saveUpdates['inventory/'+newItemRef.key+'/inspections/'+newInspectRef.key+'/note'] = allFields.inpsection_notes;
		saveUpdates['inventory/'+newItemRef.key+'/inspections/'+newInspectRef.key+'/pass'] = true;
	}

	if (allFields.truck_inspect) {
		saveUpdates[itemSave+'apparatus_inspect'] = true;
	} else {
		saveUpdates[itemSave+'apparatus_inspect'] = false;
	}

	if (allFields.member_issued) {
		saveUpdates[itemSave+'issued_to'] = $('#inventory_QA_SelectMember').dropdown('get value');
		saveUpdates['members/'+$('#inventory_QA_SelectMember').dropdown('get value')+'/inventory/'+newItemRef.key] = true;
	} else {
		saveUpdates['departments/'+agencyIDGlobal+'/records/inventoryLocations/'+$('#inven_QA_Location').dropdown('get value')+'/items/'+newItemRef.key] = true;
	}

	agencyApp.database().ref().update(saveUpdates).then(function(snapshot){

		$QA.form('clear');

		saveUpdates = null;

		loadInventoryList(agencyIDGlobal);
	});

});

$('#inventory_QA_InspectCheck')
	.checkbox()
	.first().checkbox({
	onChecked: function() {
		$('#inventory_QA_InspectNotes').show();
	},
	onUnchecked: function() {
		$('#inventory_QA_InspectNotes').hide();
	}
})
;

$('#inventory_QA_IssuedMember')
	.checkbox()
	.first().checkbox({
	onChecked: function() {
		$('#inven_QA_Location').addClass('disabled');
	},
	onUnchecked: function() {
		$('#inven_QA_Location').removeClass('disabled');
	}
})
;

function loadInventoryList(agencyKey) {

	var invenNum2 = 0;
	$('#inventory_table_sortList .menu').html('');
	$('#inventory_table_1').html('');
	var memberRecordReference = agencyApp.database().ref('departments/' + agencyKey).child('records/inventory');
	var listener = memberRecordReference.on('child_added', function(data2) {
		$('#inventory_table_sortList .menu').append('<div class="item" data-value="'+ data2.key +'">'+data2.val().name+'</div>');
		var inventoryNumber = 0;
		invenNum2++;
		var inventoryVal = [];
		agencyApp.database().ref('departments/' + agencyKey).child('records/inventory').child(data2.key+'/items').on('child_added', function (snapshot) {
			agencyApp.database().ref('inventory').child(snapshot.key).once('value', function (data) {
				var memberVal = data.val();
				//console.log(memberVal);

				inventoryNumber ++;
				inventoryVal.push(data);

				//
				$('#allInvItemsBox .box-footer h5').text($('#inventory_table_1 tr').size() + ' Items');
				console.log(inventoryNumber + " " + data2.child('name').val() + ' ' + data2.child('items').numChildren());

				if (inventoryNumber == data2.child('items').numChildren()) {
					sortInventory(inventoryVal, null);
				}
			});
		});
	});

	$('#inven_QA_Location .menu').html('');
	$('#inventory_table_sortLocation .menu').html('');
	var inventoryLocationsRef = agencyApp.database().ref('departments/' + agencyKey).child('records/inventoryLocations');
	var listener2 = inventoryLocationsRef.on('child_added', function(data) {
		$('#inven_QA_Location .menu').append('<div class="item" data-value="'+ data.key +'">'+data.val().name+'</div>');
		$('#inventory_table_sortLocation .menu').append('<div class="item" data-value="'+ data.key +'">'+data.val().name+'</div>');
	});
}

$('#inventory_table_refresh').click(function() {
	loadInventoryList(agencyIDGlobal);
});

function sortInventory(list, filterBy) {
	list.sort(function (a, b) {
		if (a.val().item_type < b.val().item_type) {
			return -1;
		}
		if (a.val().item_type > b.val().item_type) {
			return 1;
		}
		if (a.val().item_type == b.val().item_type) {
			if (a.val().serial_number < b.val().serial_number) {
				return -1;
			}
			if (a.val().serial_number > b.val().serial_number) {
				return 1;
			}
		}
		return 0;
	});

	for (i = 0; i < list.length; i++) {
		loadInvItem(list[i]);
		//		agencyApp.database().ref('departments/'+agencyIDGlobal+'/records/inventoryLocations').child(list[i].val().location).once('value', function (snap) {
		//			if (snap.val().name == 'Rescue 652') {
		//
		//			}
		//		});

	}
}

function filterInventory(location, list) {
	if (location) {
		$("#inventory_table_1 > tr").each(function() {
			$this = $(this)

			var locationVal = $this.find('td .loc').text();

			if (locationVal == location) {
				console.log(locationVal);
				$this.show();
			} else {
				$this.hide();
			}
		});
	} else {
		$("#inventory_table_1 > tr").each(function() {
			$this = $(this)

			var locationVal = $this.find('td .listID').text();

			if (locationVal.indexOf(list) != -1) {
				console.log(locationVal);
				$this.show();
			} else {
				$this.hide();
			}
		});
	}
}

function loadInvItem(item) {
	var itemVal = item.val();

	if ($('#invItem-' + item.key).length) {
		return;
	}

	var serial = '', location;

	if (itemVal.serial_number != "") {
		serial = '&nbsp;<a class="ui label circular tiny">' + itemVal.serial_number + '</a>';
	}

	var itemDIV = '<tr id="invItem-' + item.key + '">' +
		'<td style="vertical-align:middle"><strong>' + itemVal.item_type + ' &nbsp; ' + serial + ' &nbsp;' + '</strong>'+'</td>' +
		'</tr>';

	$('#inventory_table_1').append(itemDIV);

	if (itemVal.location != "") {
		agencyApp.database().ref('departments/'+agencyIDGlobal+'/records/inventoryLocations').child(itemVal.location).once('value', function (snap) {
			$('#invItem-' + item.key + ' td').append('&nbsp;<a class="ui label circular tiny blue loc">' + snap.val().name + '</a>');

			$('#invItem-' + item.key).click(function() {
				window.location.hash = '#items&' + item.key + '&edit';
				editInvItem(item, snap, null);
			});
		});
	}

	if (item.child('issued_to').exists()) {
		agencyApp.database().ref('members/'+itemVal.issued_to).once('value', function (snap) {
			$('#invItem-' + item.key + ' td').append('&nbsp;<a class="ui label circular tiny teal">' + snap.val().name.first.charAt(0) + '. ' + snap.val().name.last + '</a>');

			$('#invItem-' + item.key).click(function() {
				window.location.hash = '#items&' + item.key + '&edit';
				editInvItem(item, null, snap);
			});
		});	
	}

	if (item.child('other').exists()) {
		var other = itemVal.other;
		if (other != "") {
			if (other.indexOf('Size:') != -1) {
				$('#invItem-' + item.key + ' td').append('<a class="ui label circular tiny purple">' + itemVal.other + '</a>');
			}
		}
	}

	if (item.child('inventory_list').exists()) {
		var other = itemVal.inventory_list;
		if (other != "") {
			$('#invItem-' + item.key + ' td').append('<a class="ui label circular tiny purple listID" style="display:none">' + other + '</a>');
		}
	}
}

function editInvItem(item, location, member) {
	var itemVal = item.val();

	$('.sidebar-menu > li').removeClass('active');
	$('#sidebarInventory').parent().addClass('active');
	$('#content-dashboard').hide();
	$('#content-members').hide();
	$('#content-incidents').hide();
	$('#content-apparatus').hide();

	$('#membersListInventory').hide();

	$('#newInventoryContent').show();

	$('#content-inventory-buttons').show();
	$('#content-inventory-addButton').hide();
	$('#content-inventory').show();

	if (itemVal.purchase_date == "") {
		$('#newInventoryContent .statistics .value').eq(0).text('N/A');
	} else {
		$('#newInventoryContent .statistics .value').eq(0).text(itemVal.purchase_date);
	}

	if (location != null) {
		$('#newInventoryContent .statistics .value').eq(1).text(location.val().name);
		$('#newInventoryContent .statistics .label').eq(1).text('location');
	} else if (member != null) {
		$('#newInventoryContent .statistics .value').eq(1).text(member.val().name.first.charAt(0) + '. ' + member.val().name.last);
		$('#newInventoryContent .statistics .label').eq(1).text('issued to');
	}

	if (itemVal.serial_number == "") {
		$('#newInventoryContent .statistics .value').eq(2).text('N/A');
	} else {
		$('#newInventoryContent .statistics .value').eq(2).text(itemVal.serial_number);
	}

	$('#newInventoryContent .statistics .statistic').eq(3).removeClass('red').addClass('blue');

	if (item.child('inspections').exists()) {
		var inspectionNum = 0;
		item.child('inspections').forEach(function(inspection) {
			inspectionNum ++;
			if (inspectionNum == item.child('inspections').numChildren()) {
				console.log(inspection.val().date);
				$('#newInventoryContent .statistics .value').eq(3).text(moment(inspection.val().date, 'YYYY/MM/DD HH:mm:ss').format('MM/DD/YYYY'));
				console.log(moment(inspection.val().date, 'YYYY/MM/DD HH:mm:ss').diff(moment(), 'years'));
				if (moment(inspection.val().date, 'YYYY/MM/DD HH:mm:ss').diff(moment(), 'years') <= -1) {
					$('#newInventoryContent .statistics .statistic').eq(3).removeClass('blue').addClass('red');
				}
			}
		});
	} else {
		$('#newInventoryContent .statistics .value').eq(3).text('N/A');
		$('#newInventoryContent .statistics .statistic').eq(3).removeClass(['blue', 'red']).addClass('grey');
	}

	$('#newInventoryItem_BasicForm').form('set values', {
		list: itemVal.inventory_list,
		item_type: itemVal.item_type,
		date_of_purchase: itemVal.purchase_date,
		unit_cost: itemVal.item_cost,
		suppliers: itemVal.suppliers,
		serial_number: itemVal.serial_number,
		truck_inspect: itemVal.apparatus_inspect,
		other_info: itemVal.other,
		final_disp_date: itemVal.final_date
	});

	if (item.child('issued_to').exists()) {
		if (itemVal.issued_to != "") {
			$('#newInventoryItem_BasicForm').form('set values', {
				member_issued: true
			});

			$('#newInventoryItemSelectMember').dropdown('set selected', member.key);
		} else {
			$('#newInventoryItem_BasicForm').form('set values', {
				member_issued: false
			});
		}
	} else {
		$('#newInventoryItem_BasicForm').form('set values', {
			member_issued: false
		});
	}
}

function resetInventoryForm() {
	$('#content-inventory-saveButton div:first-child').removeClass('loading');
	$('#content-inventory-saveButton').off('click');

	$('.sidebar-menu > li').removeClass('active');
	$('#sidebarInventory').parent().addClass('active');

	$('#content-dashboard').hide();
	$('#content-incidents').hide();
	$('#content-members').hide();

	$('#content-inventory-buttons').hide();
	$('#content-inventory-addButton').show();
	$('#content-inventory').show();

	$('#newInventoryContent').hide();

	$('#membersListInventory').show();

	window.location.hash = '#inventory';

	$('#newInventoryItem_BasicForm').form('clear');

	$('#content-inventory-saveButton').off('click');

	$('#newInventoryItemIssuedMember').dropdown('restore defaults');
	$('#newInventoryItemSelectMember').dropdown('restore defaults');
}

$('#content-inventory-addButton').click(function() {
	$('.sidebar-menu > li').removeClass('active');
	$('#sidebarInventory').parent().addClass('active');
	$('#content-dashboard').hide();
	$('#content-members').hide();
	$('#content-incidents').hide();
	$('#content-apparatus').hide();

	$('#membersListInventory').hide();

	$('#newInventoryContent').show();

	$('#content-inventory-buttons').show();
	$('#content-inventory-addButton').hide();
	$('#content-inventory').show();

	window.location.hash = '#inventory?newItem'

	$('#newInventoryItem_BasicForm').form('clear');

	$('#content-member-saveButton').click(function() {
		if (window.location.hash == '#inventory?newItem') {

			function finishSaving(UID) {

				var saveUpdates = {};

				var $basic = $('#newInventoryItem_BasicForm'),
					allFields = $basic.form('get values');
			}

		} else {
			return;
		}
	});
});

$('#inventory_table_print').click(function() {
	var doc = new jsPDF();
	doc.text(20, 20, 'Hello world!');
	doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
	doc.addPage();
	doc.text(20, 20, 'Do you like that?');
	doc.save('test.pdf');
});

$('#inventory_table_sortLocation').dropdown({
	onChange(value, text, $choice) {
		//$('#inventory_table_1').html('');
		filterInventory(text,  null);
	}
});

$('#inventory_table_sortList').dropdown({
	onChange(value, text, $choice) {
		//$('#inventory_table_1').html('');
		filterInventory(null, value);
	}
});