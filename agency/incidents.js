$('#content-incidents-addButton').click(function () {
	showNewIncidentScreen();
});


function showMainIncidentScreen() {
	$('#content-incidents').show();
}

function hideMainIncidentScreen() {
	$('#content-incidents').hide();
}

function showNewIncidentScreen() {
	$('#content-incidents .content').hide();
	$('#newIncidentContent').show();
	$('#content-incidents-saveButton').show();
	$('#content-incidents .content-header > small').text('New Incident');
	$('#content-incidents-addButton').hide();
}

function hideNewIncidentScreen() {
	$('#newIncidentContent').hide();
	$('#content-incidents-saveButton').hide();
	$('#content-incidents .content-header > small').text('Incidents');
}

$('#content-incidents-saveButton').click(function() {
	//VALIDATE AGAINST NFIRS.
	var $basicForm = $('#IA_NFIRS1000');
	var $addressForm = $('#IA_NFIRS1010');

	console.log($basicForm.form('get value', 'FDID'));

	console.log($basicForm.form('validate form'));
	
	var incidentType = $('#newIncidentTypeDropdown').dropdown('get value');
	if (!incidentType) {
		
	} else {
		console.log($(incidentType + ' .label').text().replace(/\s+/g, ''));
	}
	
	var newIncidentRef = agencyApp.database().ref().child('AgencyIncidents').push();
	var itemSave = 'AgencyIncidents/'+newItemRef.key+'/';
	var saveUpdates = {};

	saveUpdates[itemSave+'department'] = agencyIDGlobal;

	saveUpdates['departments/'+agencyIDGlobal+'/records/inventory/'+allFields.list+'/items/'+newItemRef.key] = true;
	saveUpdates['departments/'+agencyIDGlobal+'/records/inventoryLocations/'+$('#inven_QA_Location').dropdown('get value')+'/items/'+newItemRef.key] = true;

//	agencyApp.database().ref().update(saveUpdates).then(function(snapshot){
//
//		$basicForm.form('clear');
//		$addressForm.form('clear');
//
//		saveUpdates = null;
//
//		loadInventoryList(agencyIDGlobal);
//	});
	
});

$('#IA_NFIRS1000')
	.form({
	on: 'blur',
	fields: {
		FDID: {
			identifier  : 'FDID',
			rules: [
				{
					type   : 'empty',
					prompt : 'Cannot be empty.'
				}
			]
		},
		Date: {
			identifier  : 'DATE',
			rules: [
				{
					type   : 'empty',
					prompt : 'Cannot be empty.'
				}
			]
		},
		IncidentNum: {
			identifier  : 'INCIDENTNUM',
			rules: [
				{
					type   : 'integer',
					prompt : 'Cannot be empty.'
				}
			]
		}
	}
});

$('#IA_NFIRS1000').form({onSuccess:function() {
	$('#IA_NFIRS1000 < box').removeClass('box-warning').removeClass('box-danger').addClass('box-success');
}});
$('#IA_NFIRS1000').form({onFailure:function() {
	$('#IA_NFIRS1000 < box').addClass('box-warning').removeClass('box-danger').removeClass('box-success');
}});