var N1010 = {
	9: {
		"1": "Street Address",
		"2": "Intersection"
	},
	11: {
		"E": "East",
		"N": "North",
		"S": "South",
		"W": "West"
	}
};



function getNFIRSCode1010(elementNumber, value) {
	console.log(value);
	var string = N1010[elementNumber][value];
	return string;
}

var incidentTypes = {
	categories: {
		100: "Fire",
		200: "Overpressure Rupture, Explosion, Overheat, No Fire",
		300: "Rescue and EMS Incidents",
		400: "Hazardous Condition, No Fire",
		500: "Service Call",
		600: "Good Intent Call",
		700: "False Alarm and False Call",
		800: "Severe Weather and Natural Disaster",
		900: "Special Incident Type"
	},
	headers: {
		11: "Structure Fire",
		12: "Fire in mobile property used as a fixed structure"
	},
	100: {
		11: {
			111: "Building Fire",
			112: "Fire in structure other than in a building"
		},
		12: {

		}
	},
	300: {
		321: "EMS call excludes vehicle accident with injury"
	}
}

var streetPrefix = {
	"": "",
	"E": "East",
	"N": "North",
	"S": "South",
	"W": "West",
	"NE": "Northeast",
	"NW": "Northwest",
	"SE": "Southeast",
	"SW": "Southwest"
};

var incidentTypeNew = {
	"1": "Fire",
	"10": "Fire, other",
	"100": "Fire, other",
	"11": "Structure Fire",
	"110": "Structure fire, other (conversion only)",
	"111": "Building fire",
	"112": "Fires in structure other than in a building",
	"113": "Cooking fire, confined to container",
	"114": "Chimney or flue fire, confined to chimney or flue",
	"115": "Incinerator overload or malfunction, fire confined",
	"116": "Fuel burner/boiler malfunction, fire confined",
	"117": "Commercial Compactor fire, confined to rubbish",
	"118": "Trash or rubbish fire, contained",
	"12": "Fire in mobile property used as a fixed structure",
	"120": "Fire in mobile prop. used as a fixed struc., other",
	"121": "Fire in mobile home used as fixed residence",
	"122": "Fire in motor home, camper, recreational vehicle",
	"123": "Fire in portable building, fixed location",
	"13": "Mobile property (vehicle) fire",
	"130": "Mobile property (vehicle) fire, other",
	"131": "Passenger vehicle fire",
	"132": "Road freight or transport vehicle fire",
	"133": "Rail vehicle fire",
	"134": "Water vehicle fire",
	"135": "Aircraft fire",
	"136": "Self-propelled motor home or recreational vehicle",
	"137": "Camper or recreational vehicle (RV) fire",
	"138": "Off-road vehicle or heavy equipment fire",
	"14": "Natural vegetation fire",
	"140": "Natural vegetation fire, other",
	"141": "Forest, woods or wildland fire",
	"142": "Brush or brush-and-grass mixture fire",
	"143": "Grass fire",
	"15": "Outside rubbish fire",
	"150": "Outside rubbish fire, other",
	"151": "Outside rubbish, trash or waste fire",
	"152": "Garbage dump or sanitary landfill fire",
	"153": "Construction or demolition landfill fire",
	"154": "Dumpster or other outside trash receptacle fire",
	"155": "Outside stationary compactor/compacted trash fire",
	"16": "Special outside fire",
	"160": "Special outside fire, other",
	"161": "Outside storage fire",
	"162": "Outside equipment fire",
	"163": "Outside gas or vapor combustion explosion",
	"164": "Outside mailbox fire",
	"17": "Cultivated vegetation, crop fire",
	"170": "Cultivated vegetation, crop fire, other",
	"171": "Cultivated grain or crop fire",
	"172": "Cultivated orchard or vineyard fire",
	"173": "Cultivated trees or nursery stock fire",
	"2": "Overpressure Rupture, Explosion, Overheat(no fire)",
	"20": "Overpressure rupture, explosion, overheat, other",
	"200": "Overpressure rupture, explosion, overheat other",
	"21": "Overpressure rupture from steam (no ensuing fire)",
	"210": "Overpressure rupture from steam, other",
	"211": "Overpressure rupture of steam pipe or pipeline",
	"212": "Overpressure rupture of steam boiler",
	"213": "Steam rupture of pressure or process vessel",
	"22": "Overpressure rupture from air or gas (no fire)",
	"220": "Overpressure rupture from air or gas, other",
	"221": "Overpressure rupture of air or gas pipe/pipeline",
	"222": "Overpressure rupture of boiler from air or gas",
	"223": "Air or gas rupture of pressure or process vessel",
	"23": "Overpressure rupture, chemical reaction (no fire)",
	"231": "Chemical reaction rupture of process vessel",
	"24": "Explosion (no fire)",
	"240": "Explosion (no fire), other",
	"241": "Munitions or bomb explosion (no fire)",
	"242": "Blasting agent explosion (no fire)",
	"243": "Fireworks explosion (no fire)",
	"244": "Dust explosion (no fire)",
	"25": "Excessive heat, scorch burns with no ignition",
	"251": "Excessive heat, scorch burns with no ignition",
	"3": "Rescue & Emergency Medical Service Incident",
	"30": "Rescue, emergency medical call (EMS), other",
	"300": "Rescue, EMS incident, other",
	"31": "Medical assist",
	"311": "Medical assist, assist EMS crew",
	"32": "Emergency medical service (EMS) incident",
	"320": "Emergency medical service incident, other",
	"321": "EMS call, excluding vehicle accident with injury",
	"322": "Motor vehicle accident with injuries",
	"323": "Motor vehicle/pedestrian accident (MV Ped)",
	"324": "Motor vehicle accident with no injuries.",
	"33": "Lock-In",
	"331": "Lock-in (if lock out , use 511 )",
	"34": "Search for lost person",
	"340": "Search for lost person, other",
	"341": "Search for person on land",
	"342": "Search for person in water",
	"343": "Search for person underground",
	"35": "Extrication, rescue",
	"350": "Extrication, rescue, other",
	"351": "Extrication of victim(s) from building/structure",
	"352": "Extrication of victim(s) from vehicle",
	"353": "Removal of victim(s) from stalled elevator",
	"354": "Trench/below-grade rescue",
	"355": "Confined space rescue",
	"356": "High-angle rescue",
	"357": "Extrication of victim(s) from machinery",
	"36": "Water or ice-related rescue",
	"360": "Water & ice-related rescue, other",
	"361": "Swimming/recreational water areas rescue",
	"362": "Ice rescue",
	"363": "Swift water rescue",
	"364": "Surf rescue",
	"365": "Watercraft rescue",
	"37": "Electrical rescue",
	"370": "Electrical rescue, other",
	"371": "Electrocution or potential electrocution",
	"372": "Trapped by power lines",
	"38": "Rescue or EMS standby",
	"381": "Rescue or EMS standby",
	"4": "Hazardous Condition (No Fire)",
	"40": "Flammable gas or liquid condition, other",
	"400": "Hazardous condition, other",
	"41": "Combustible/flammable spills & leaks",
	"410": "Combustible/flammable gas/liquid condition, other",
	"411": "Gasoline or other flammable liquid spill",
	"412": "Gas leak (natural gas or LPG)",
	"413": "Oil or other combustible liquid spill",
	"42": "Chemical release, reaction, or toxic condition",
	"420": "Toxic condition, other",
	"421": "Chemical hazard (no spill or leak)",
	"422": "Chemical spill or leak",
	"423": "Refrigeration leak",
	"424": "Carbon monoxide incident",
	"43": "Radioactive condition",
	"430": "Radioactive condition, other",
	"431": "Radiation leak, radioactive material",
	"44": "Electrical wiring/equipment problem",
	"440": "Electrical  wiring/equipment problem, other",
	"441": "Heat from short circuit (wiring), defective/worn",
	"442": "Overheated motor",
	"443": "Breakdown of light ballast",
	"444": "Power line down",
	"445": "Arcing, shorted electrical equipment",
	"45": "Biological hazard",
	"451": "Biological hazard, confirmed or suspected",
	"46": "Accident, potential accident",
	"460": "Accident, potential accident, other",
	"461": "Building or structure weakened or collapsed",
	"462": "Aircraft standby",
	"463": "Vehicle accident, general cleanup",
	"47": "Explosive, bomb removal",
	"471": "Explosive, bomb removal (for bomb scare, use 721)",
	"48": "Attempted burning, illegal action",
	"480": "Attempted burning, illegal action, other",
	"481": "Attempt to burn",
	"482": "Threat to burn",
	"5": "Service Call",
	"50": "Service call, other",
	"500": "Service Call, other",
	"51": "Person in distress",
	"510": "Person in distress, other",
	"511": "Lock-out",
	"512": "Ring or jewelry removal",
	"52": "Water problem",
	"520": "Water problem, other",
	"521": "Water evacuation",
	"522": "Water or steam leak",
	"53": "Smoke, odor problem",
	"531": "Smoke or odor removal",
	"54": "Animal problem or rescue",
	"540": "Animal problem, other",
	"541": "Animal problem",
	"542": "Animal rescue",
	"55": "Public service assistance",
	"550": "Public service assistance, other",
	"551": "Assist police or other governmental agency",
	"552": "Police matter",
	"553": "Public service",
	"554": "Assist invalid",
	"555": "Defective elevator, no occupants",
	"56": "Unauthorized burning",
	"561": "Unauthorized burning",
	"57": "Cover assignment, standby at fire station, move-up",
	"571": "Cover assignment, standby, moveup",
	"6": "Good Intent Call",
	"60": "Good intent call, other",
	"600": "Good intent call, other",
	"61": "Dispatched and canceled en route",
	"611": "Dispatched & canceled en route",
	"62": "Wrong location, no emergency found",
	"621": "Wrong location",
	"622": "No incident found on arrival at dispatch address",
	"63": "Controlled burning",
	"631": "Authorized controlled burning",
	"632": "Prescribed fire",
	"64": "Vicinity alarm",
	"641": "Vicinity alarm (incident in other location)",
	"65": "Steam, other gas mistaken for smoke",
	"650": "Steam, other gas mistaken for smoke, other",
	"651": "Smoke scare, odor of smoke",
	"652": "Steam, vapor, fog or dust thought to be smoke",
	"653": "Smoke from barbecue, tar kettle",
	"66": "EMS call where  party has been transported",
	"661": "EMS call, party transported by non-fire agency",
	"67": "HazMat release investigation w/no HazMat",
	"671": "HazMat release investigation w/no HazMat",
	"672": "Biological hazard investigation, none found",
	"7": "False Alarm & False Call",
	"70": "False alarm and false call, other",
	"700": "False alarm or false call, other",
	"71": "Malicious, mischievous false alarm",
	"710": "Malicious, mischievous false call, other",
	"711": "Municipal alarm system, malicious false alarm",
	"712": "Direct tie to FD, malicious false alarm",
	"713": "Telephone, malicious false alarm",
	"714": "Central station, malicious false alarm",
	"715": "Local alarm system, malicious false alarm",
	"72": "Bomb scare",
	"721": "Bomb scare - no bomb",
	"73": "System or detector malfunction",
	"730": "System malfunction, other",
	"731": "Sprinkler activation due to malfunction",
	"732": "Extinguishing system activation due to malfunction",
	"733": "Smoke detector activation due to malfunction",
	"734": "Heat detector activation due to malfunction",
	"735": "Alarm system sounded due to malfunction",
	"736": "CO detector activation due to malfunction",
	"74": "Unintentional system/detector operation (no fire)",
	"740": "Unintentional transmission of alarm, other",
	"741": "Sprinkler activation, no fire - unintentional",
	"742": "Extinguishing system activation",
	"743": "Smoke detector activation, no fire - unintentional",
	"744": "Detector activation, no fire - unintentional",
	"745": "Alarm system activation, no fire - unintentional",
	"746": "Carbon monoxide detector activation, no CO",
	"75": "Biohazard scare",
	"751": "Biological hazard, malicious false report",
	"8": "Severe Weather & Natural Disaster",
	"800": "Severe weather or natural disaster, other",
	"811": "Earthquake assessment",
	"812": "Flood assessment",
	"813": "Wind storm, tornado/hurricane assessment",
	"814": "Lightning strike (no fire)",
	"815": "Severe weather or natural disaster standby",
	"9": "Special Incident Type",
	"90": "Special type of incident, other",
	"900": "Special type of incident, other",
	"91": "Citizen complaint",
	"911": "Citizen complaint",
	"UUU": "Undetermined incident type (conversion only)"
};

var incidents = [
	{
		"1": "Fire"
		},
	{
		"100": "Fire, other"
		},
	{
		"11": "Structure Fire"
		},
	{
		"111": "Building fire"
		},
	{
		"112": "Fires in structure other than in a building"
		},
	{
		"113": "Cooking fire, confined to container"
		},
	{
		"114": "Chimney or flue fire, confined to chimney or flue"
		},
	{
		"115": "Incinerator overload or malfunction, fire confined"
		},
	{
		"116": "Fuel burner/boiler malfunction, fire confined"
		},
	{
		"117": "Commercial Compactor fire, confined to rubbish"
		},
	{
		"118": "Trash or rubbish fire, contained"
		},
	{
		"12": "Fire in mobile property used as a fixed structure"
		},
	{
		"120": "Fire in mobile prop. used as a fixed struc., other"
		},
	{
		"121": "Fire in mobile home used as fixed residence"
		},
	{
		"122": "Fire in motor home, camper, recreational vehicle"
		},
	{
		"123": "Fire in portable building, fixed location"
		},
	{
		"13": "Mobile property (vehicle) fire"
		},
	{
		"130": "Mobile property (vehicle) fire, other"
		},
	{
		"131": "Passenger vehicle fire"
		},
	{
		"132": "Road freight or transport vehicle fire"
		},
	{
		"133": "Rail vehicle fire"
		},
	{
		"134": "Water vehicle fire"
		},
	{
		"135": "Aircraft fire"
		},
	{
		"136": "Self-propelled motor home or recreational vehicle"
		},
	{
		"137": "Camper or recreational vehicle (RV) fire"
		},
	{
		"138": "Off-road vehicle or heavy equipment fire"
		},
	{
		"14": "Natural vegetation fire"
		},
	{
		"140": "Natural vegetation fire, other"
		},
	{
		"141": "Forest, woods or wildland fire"
		},
	{
		"142": "Brush or brush-and-grass mixture fire"
		},
	{
		"143": "Grass fire"
		},
	{
		"15": "Outside rubbish fire"
		},
	{
		"150": "Outside rubbish fire, other"
		},
	{
		"151": "Outside rubbish, trash or waste fire"
		},
	{
		"152": "Garbage dump or sanitary landfill fire"
		},
	{
		"153": "Construction or demolition landfill fire"
		},
	{
		"154": "Dumpster or other outside trash receptacle fire"
		},
	{
		"155": "Outside stationary compactor/compacted trash fire"
		},
	{
		"16": "Special outside fire"
		},
	{
		"160": "Special outside fire, other"
		},
	{
		"161": "Outside storage fire"
		},
	{
		"162": "Outside equipment fire"
		},
	{
		"163": "Outside gas or vapor combustion explosion"
		},
	{
		"164": "Outside mailbox fire"
		},
	{
		"17": "Cultivated vegetation, crop fire"
		},
	{
		"170": "Cultivated vegetation, crop fire, other"
		},
	{
		"171": "Cultivated grain or crop fire"
		},
	{
		"172": "Cultivated orchard or vineyard fire"
		},
	{
		"173": "Cultivated trees or nursery stock fire"
		},
	{
		"2": "Overpressure Rupture, Explosion, Overheat(no fire)"
		},
	{
		"200": "Overpressure rupture, explosion, overheat other"
		},
	{
		"21": "Overpressure rupture from steam (no ensuing fire)"
		},
	{
		"211": "Overpressure rupture of steam pipe or pipeline"
		},
	{
		"212": "Overpressure rupture of steam boiler"
		},
	{
		"213": "Steam rupture of pressure or process vessel"
		},
	{
		"22": "Overpressure rupture from air or gas (no fire)"
		},
	{
		"220": "Overpressure rupture from air or gas, other"
		},
	{
		"221": "Overpressure rupture of air or gas pipe/pipeline"
		},
	{
		"222": "Overpressure rupture of boiler from air or gas"
		},
	{
		"223": "Air or gas rupture of pressure or process vessel"
		},
	{
		"23": "Overpressure rupture, chemical reaction (no fire)"
		},
	{
		"231": "Chemical reaction rupture of process vessel"
		},
	{
		"24": "Explosion (no fire)"
		},
	{
		"240": "Explosion (no fire), other"
		},
	{
		"241": "Munitions or bomb explosion (no fire)"
		},
	{
		"242": "Blasting agent explosion (no fire)"
		},
	{
		"243": "Fireworks explosion (no fire)"
		},
	{
		"244": "Dust explosion (no fire)"
		},
	{
		"25": "Excessive heat, scorch burns with no ignition"
		},
	{
		"251": "Excessive heat, scorch burns with no ignition"
		},
	{
		"3": "Rescue & Emergency Medical Service Incident"
		},
	{
		"30": "Rescue, emergency medical call (EMS), other"
		},
	{
		"300": "Rescue, EMS incident, other"
		},
	{
		"31": "Medical assist"
		},
	{
		"311": "Medical assist, assist EMS crew"
		},
	{
		"32": "Emergency medical service (EMS) incident"
		},
	{
		"320": "Emergency medical service incident, other"
		},
	{
		"321": "EMS call, excluding vehicle accident with injury"
		},
	{
		"322": "Motor vehicle accident with injuries"
		},
	{
		"323": "Motor vehicle/pedestrian accident (MV Ped)"
		},
	{
		"324": "Motor vehicle accident with no injuries."
		},
	{
		"33": "Lock-In"
		},
	{
		"331": "Lock-in (if lock out , use 511 )"
		},
	{
		"34": "Search for lost person"
		},
	{
		"340": "Search for lost person, other"
		},
	{
		"341": "Search for person on land"
		},
	{
		"342": "Search for person in water"
		},
	{
		"343": "Search for person underground"
		},
	{
		"35": "Extrication, rescue"
		},
	{
		"350": "Extrication, rescue, other"
		},
	{
		"351": "Extrication of victim(s) from building/structure"
		},
	{
		"352": "Extrication of victim(s) from vehicle"
		},
	{
		"353": "Removal of victim(s) from stalled elevator"
		},
	{
		"354": "Trench/below-grade rescue"
		},
	{
		"355": "Confined space rescue"
		},
	{
		"356": "High-angle rescue"
		},
	{
		"357": "Extrication of victim(s) from machinery"
		},
	{
		"36": "Water or ice-related rescue"
		},
	{
		"360": "Water & ice-related rescue, other"
		},
	{
		"361": "Swimming/recreational water areas rescue"
		},
	{
		"362": "Ice rescue"
		},
	{
		"363": "Swift water rescue"
		},
	{
		"364": "Surf rescue"
		},
	{
		"365": "Watercraft rescue"
		},
	{
		"37": "Electrical rescue"
		},
	{
		"370": "Electrical rescue, other"
		},
	{
		"371": "Electrocution or potential electrocution"
		},
	{
		"372": "Trapped by power lines"
		},
	{
		"38": "Rescue or EMS standby"
		},
	{
		"381": "Rescue or EMS standby"
		},
	{
		"4": "Hazardous Condition (No Fire)"
		},
	{
		"40": "Flammable gas or liquid condition, other"
		},
	{
		"400": "Hazardous condition, other"
		},
	{
		"41": "Combustible/flammable spills & leaks"
		},
	{
		"410": "Combustible/flammable gas/liquid condition, other"
		},
	{
		"411": "Gasoline or other flammable liquid spill"
		},
	{
		"412": "Gas leak (natural gas or LPG)"
		},
	{
		"413": "Oil or other combustible liquid spill"
		},
	{
		"42": "Chemical release, reaction, or toxic condition"
		},
	{
		"420": "Toxic condition, other"
		},
	{
		"421": "Chemical hazard (no spill or leak)"
		},
	{
		"422": "Chemical spill or leak"
		},
	{
		"423": "Refrigeration leak"
		},
	{
		"424": "Carbon monoxide incident"
		},
	{
		"43": "Radioactive condition"
		},
	{
		"430": "Radioactive condition, other"
		},
	{
		"431": "Radiation leak, radioactive material"
		},
	{
		"44": "Electrical wiring/equipment problem"
		},
	{
		"440": "Electrical  wiring/equipment problem, other"
		},
	{
		"441": "Heat from short circuit (wiring), defective/worn"
		},
	{
		"442": "Overheated motor"
		},
	{
		"443": "Breakdown of light ballast"
		},
	{
		"444": "Power line down"
		},
	{
		"445": "Arcing, shorted electrical equipment"
		},
	{
		"45": "Biological hazard"
		},
	{
		"451": "Biological hazard, confirmed or suspected"
		},
	{
		"46": "Accident, potential accident"
		},
	{
		"460": "Accident, potential accident, other"
		},
	{
		"461": "Building or structure weakened or collapsed"
		},
	{
		"462": "Aircraft standby"
		},
	{
		"463": "Vehicle accident, general cleanup"
		},
	{
		"47": "Explosive, bomb removal"
		},
	{
		"471": "Explosive, bomb removal (for bomb scare, use 721)"
		},
	{
		"48": "Attempted burning, illegal action"
		},
	{
		"480": "Attempted burning, illegal action, other"
		},
	{
		"481": "Attempt to burn"
		},
	{
		"482": "Threat to burn"
		},
	{
		"5": "Service Call"
		},
	{
		"50": "Service call, other"
		},
	{
		"500": "Service Call, other"
		},
	{
		"51": "Person in distress"
		},
	{
		"510": "Person in distress, other"
		},
	{
		"511": "Lock-out"
		},
	{
		"512": "Ring or jewelry removal"
		},
	{
		"52": "Water problem"
		},
	{
		"520": "Water problem, other"
		},
	{
		"521": "Water evacuation"
		},
	{
		"522": "Water or steam leak"
		},
	{
		"53": "Smoke, odor problem"
		},
	{
		"531": "Smoke or odor removal"
		},
	{
		"54": "Animal problem or rescue"
		},
	{
		"540": "Animal problem, other"
		},
	{
		"541": "Animal problem"
		},
	{
		"542": "Animal rescue"
		},
	{
		"55": "Public service assistance"
		},
	{
		"550": "Public service assistance, other"
		},
	{
		"551": "Assist police or other governmental agency"
		},
	{
		"552": "Police matter"
		},
	{
		"553": "Public service"
		},
	{
		"554": "Assist invalid"
		},
	{
		"555": "Defective elevator, no occupants"
		},
	{
		"56": "Unauthorized burning"
		},
	{
		"561": "Unauthorized burning"
		},
	{
		"57": "Cover assignment, standby at fire station, move-up"
		},
	{
		"571": "Cover assignment, standby, moveup"
		},
	{
		"6": "Good Intent Call"
		},
	{
		"60": "Good intent call, other"
		},
	{
		"600": "Good intent call, other"
		},
	{
		"61": "Dispatched and canceled en route"
		},
	{
		"611": "Dispatched & canceled en route"
		},
	{
		"62": "Wrong location, no emergency found"
		},
	{
		"621": "Wrong location"
		},
	{
		"622": "No incident found on arrival at dispatch address"
		},
	{
		"63": "Controlled burning"
		},
	{
		"631": "Authorized controlled burning"
		},
	{
		"632": "Prescribed fire"
		},
	{
		"64": "Vicinity alarm"
		},
	{
		"641": "Vicinity alarm (incident in other location)"
		},
	{
		"65": "Steam, other gas mistaken for smoke"
		},
	{
		"650": "Steam, other gas mistaken for smoke, other"
		},
	{
		"651": "Smoke scare, odor of smoke"
		},
	{
		"652": "Steam, vapor, fog or dust thought to be smoke"
		},
	{
		"653": "Smoke from barbecue, tar kettle"
		},
	{
		"66": "EMS call where  party has been transported"
		},
	{
		"661": "EMS call, party transported by non-fire agency"
		},
	{
		"67": "HazMat release investigation w/no HazMat"
		},
	{
		"671": "HazMat release investigation w/no HazMat"
		},
	{
		"672": "Biological hazard investigation, none found"
		},
	{
		"7": "False Alarm & False Call"
		},
	{
		"70": "False alarm and false call, other"
		},
	{
		"700": "False alarm or false call, other"
		},
	{
		"71": "Malicious, mischievous false alarm"
		},
	{
		"710": "Malicious, mischievous false call, other"
		},
	{
		"711": "Municipal alarm system, malicious false alarm"
		},
	{
		"712": "Direct tie to FD, malicious false alarm"
		},
	{
		"713": "Telephone, malicious false alarm"
		},
	{
		"714": "Central station, malicious false alarm"
		},
	{
		"715": "Local alarm system, malicious false alarm"
		},
	{
		"72": "Bomb scare"
		},
	{
		"721": "Bomb scare - no bomb"
		},
	{
		"73": "System or detector malfunction"
		},
	{
		"730": "System malfunction, other"
		},
	{
		"731": "Sprinkler activation due to malfunction"
		},
	{
		"732": "Extinguishing system activation due to malfunction"
		},
	{
		"733": "Smoke detector activation due to malfunction"
		},
	{
		"734": "Heat detector activation due to malfunction"
		},
	{
		"735": "Alarm system sounded due to malfunction"
		},
	{
		"736": "CO detector activation due to malfunction"
		},
	{
		"74": "Unintentional system/detector operation (no fire)"
		},
	{
		"740": "Unintentional transmission of alarm, other"
		},
	{
		"741": "Sprinkler activation, no fire - unintentional"
		},
	{
		"742": "Extinguishing system activation"
		},
	{
		"743": "Smoke detector activation, no fire - unintentional"
		},
	{
		"744": "Detector activation, no fire - unintentional"
		},
	{
		"745": "Alarm system activation, no fire - unintentional"
		},
	{
		"746": "Carbon monoxide detector activation, no CO"
		},
	{
		"75": "Biohazard scare"
		},
	{
		"751": "Biological hazard, malicious false report"
		},
	{
		"8": "Severe Weather & Natural Disaster"
		},
	{
		"800": "Severe weather or natural disaster, other"
		},
	{
		"811": "Earthquake assessment"
		},
	{
		"812": "Flood assessment"
		},
	{
		"813": "Wind storm, tornado/hurricane assessment"
		},
	{
		"814": "Lightning strike (no fire)"
		},
	{
		"815": "Severe weather or natural disaster standby"
		},
	{
		"9": "Special Incident Type"
		},
	{
		"90": "Special type of incident, other"
		},
	{
		"900": "Special type of incident, other"
		},
	{
		"91": "Citizen complaint"
		},
	{
		"911": "Citizen complaint"
		},
	{
		"UUU": "Undetermined incident type (conversion only)"
		}
];

var streetTypes = {
	"": "",
	"ALY": "Alley",
	"ANX": "Annex",
	"ARC": "Arcade",
	"AVE": "Avenue",
	"BCH": "Beach",
	"BND": "Bend",
	"BLF": "Bluff",
	"BLFS": "Bluffs",
	"BTM": "Bottom",
	"BLVD": "Boulevard",
	"BR": "Branch",
	"BRG": "Bridge",
	"BRK": "Brook",
	"BRKS": "Brooks",
	"BG": "Burg",
	"BGS": "Burgs",
	"BYP": "Bypass",
	"CP": "Camp",
	"CYN": "Canyon",
	"CPE": "Cape",
	"CSWY": "Causeway",
	"CTR": "Center",
	"CTRS": "Centers",
	"CIR": "Circle",
	"CIRS": "Circles",
	"CLF": "Cliff",
	"CLFS": "Cliffs",
	"CLB": "Club",
	"CMN": "Common",
	"CMNS": "Commons",
	"COR": "Corner",
	"CORS": "Corners",
	"CT": "Court",
	"CTS": "Courts",
	"CV": "Cove",
	"CVS": "Coves",
	"CRK": "Creek",
	"CRES": "Crescent",
	"CRST": "Crest",
	"XING": "Crossing",
	"XRD": "Crossroad",
	"XRDS": "Crossroads",
	"CURV": "Curve",
	"DL": "Dale",
	"DM": "Dam",
	"DV": "Divide",
	"DR": "Drive",
	"DRS": "Drives",
	"EST": "Estate",
	"ESTS": "Estates",
	"EXPY": "Expressway",
	"EXT": "Extension",
	"EXTS": "Extensions",
	"FALL": "Fall",
	"FLS": "Falls",
	"FRY": "Ferry",
	"FLD": "Field",
	"FLDS": "Fields",
	"FLT": "Flat",
	"FLTS": "Flats",
	"FRD": "Ford",
	"FRDS": "Fords",
	"FRST": "Forest",
	"FRG": "Forge",
	"FRGS": "Forges",
	"FRK": "Fork",
	"FRKS": "Forks",
	"FT": "Fort",
	"FWY": "Freeway",
	"GDN": "Garden",
	"GDNS": "Gardens",
	"GTWY": "Gateway",
	"GLN": "Glen",
	"GLNS": "Glens",
	"GRN": "Green",
	"GRNS": "Greens",
	"GRV": "Grove",
	"GRVS": "Groves",
	"HBR": "Harbor",
	"HBRS": "Harbors",
	"HVN": "Haven",
	"HTS": "Heights",
	"HWY": "Highway",
	"HL": "Hill",
	"HLS": "Hills",
	"HOLW": "Hollow",
	"INLT": "Inlet",
	"IS": "Island",
	"ISS": "Islands",
	"ISLE": "Isle",
	"JCT": "Junction",
	"JCTS": "Junctions",
	"KY": "Key",
	"KYS": "Keys",
	"KNL": "Knoll",
	"KNLS": "Knolls",
	"LK": "Lake",
	"LKS": "Lakes",
	"LNDG": "Landing",
	"LN": "Lane",
	"LGT": "Light",
	"LGTS": "Lights",
	"LF": "Loaf",
	"LCK": "Lock",
	"LCKS": "Locks",
	"LDG": "Lodge",
	"LOOP": "Loop",
	"MALL": "Mall",
	"MNR": "Manor",
	"MNRS": "Manors",
	"MDW": "Meadow",
	"MDWS": "Meadows",
	"MEWS": "Mews",
	"ML": "Mill",
	"MLS": "Mills",
	"MSN": "Mission",
	"MTWY": "Motorway",
	"MT": "Mount",
	"MTN": "Mountain",
	"MTNS": "Mountains",
	"NCK": "Neck",
	"ORCH": "Orchard",
	"OVAL": "Oval",
	"PARK": "Park",
	"PKY": "Parkway",
	"PKYS": "Parkways",
	"PASS": "Pass",
	"PSGE": "Passage",
	"PATH": "Path",
	"PIKE": "Pike",
	"PNE": "Pine",
	"PNES": "Pines",
	"PL": "Place",
	"PLZ": "Plaza",
	"PT": "Point",
	"PTS": "Points",
	"PRT": "Port",
	"PRTS": "Ports",
	"PR": "Prairie",
	"RADL": "Radial",
	"RAMP": "Ramp",
	"RNCH": "Ranch",
	"RPD": "Rapid",
	"RPDS": "Rapids",
	"RST": "Rest",
	"RDG": "Ridge",
	"RDGS": "Ridges",
	"RIV": "River",
	"RD": "Road",
	"RDS": "Roads",
	"RT": "Route",
	"ROW": "Row",
	"RUE": "Rue",
	"RUN": "Run",
	"SHL": "Shoal",
	"SHLS": "Shoals",
	"SHR": "Shore",
	"SHRS": "Shores",
	"SKWY": "Skyway",
	"SPG": "Spring",
	"SPGS": "Springs",
	"SPUR": "Spur",
	"SPRS": "Spurs",
	"SQ": "Square",
	"SQS": "Squares",
	"STA": "Station",
	"STRA": "Stravenue",
	"STRM": "Stream",
	"ST": "Street",
	"STS": "Streets",
	"SMT": "Summit",
	"TER": "Terrace",
	"TRWY": "Throughway",
	"TRCE": "Trace",
	"TRAK": "Track",
	"TRFY": "Trafficway",
	"TRL": "Trail",
	"TRLR": "Trailer",
	"TUNL": "Tunnel",
	"TPKE": "Turnpike",
	"UPAS": "Underpass",
	"UN": "Union",
	"UNS": "Unions",
	"VLY": "Valley",
	"VLYS": "Valleys",
	"VIA": "Viaduct",
	"VW": "View",
	"VWS": "Views",
	"VLG": "Village",
	"VLGS": "Villages",
	"VL": "Ville",
	"VIS": "Vista",
	"WALK": "Walk",
	"WALK": "Walks",
	"WALL": "Wall",
	"WAY": "Way",
	"WL": "Well",
	"WLS": "Wells"
};

var streetTypeObject = [
	{
		"ALY": "Alley"
	},
	{
		"ANX": "Annex"
	},
	{
		"ARC": "Arcade"
	},
	{
		"AVE": "Avenue"
	},
	{
		"BCH": "Beach"
	},
	{
		"BND": "Bend"
	},
	{
		"BLF": "Bluff"
	},
	{
		"BLFS": "Bluffs"
	},
	{
		"BTM": "Bottom"
	},
	{
		"BLVD": "Boulevard"
	},
	{
		"BR": "Branch"
	},
	{
		"BRG": "Bridge"
	},
	{
		"BRK": "Brook"
	},
	{
		"BRKS": "Brooks"
	},
	{
		"BG": "Burg"
	},
	{
		"BGS": "Burgs"
	},
	{
		"BYP": "Bypass"
	},
	{
		"CP": "Camp"
	},
	{
		"CYN": "Canyon"
	},
	{
		"CPE": "Cape"
	},
	{
		"CSWY": "Causeway"
	},
	{
		"CTR": "Center"
	},
	{
		"CTRS": "Centers"
	},
	{
		"CIR": "Circle"
	},
	{
		"CIRS": "Circles"
	},
	{
		"CLF": "Cliff"
	},
	{
		"CLFS": "Cliffs"
	},
	{
		"CLB": "Club"
	},
	{
		"CMN": "Common"
	},
	{
		"CMNS": "Commons"
	},
	{
		"COR": "Corner"
	},
	{
		"CORS": "Corners"
	},
	{
		"CT": "Court"
	},
	{
		"CTS": "Courts"
	},
	{
		"CV": "Cove"
	},
	{
		"CVS": "Coves"
	},
	{
		"CRK": "Creek"
	},
	{
		"CRES": "Crescent"
	},
	{
		"CRST": "Crest"
	},
	{
		"XING": "Crossing"
	},
	{
		"XRD": "Crossroad"
	},
	{
		"XRDS": "Crossroads"
	},
	{
		"CURV": "Curve"
	},
	{
		"DL": "Dale"
	},
	{
		"DM": "Dam"
	},
	{
		"DV": "Divide"
	},
	{
		"DR": "Drive"
	},
	{
		"DRS": "Drives"
	},
	{
		"EST": "Estate"
	},
	{
		"ESTS": "Estates"
	},
	{
		"EXPY": "Expressway"
	},
	{
		"EXT": "Extension"
	},
	{
		"EXTS": "Extensions"
	},
	{
		"FALL": "Fall"
	},
	{
		"FLS": "Falls"
	},
	{
		"FRY": "Ferry"
	},
	{
		"FLD": "Field"
	},
	{
		"FLDS": "Fields"
	},
	{
		"FLT": "Flat"
	},
	{
		"FLTS": "Flats"
	},
	{
		"FRD": "Ford"
	},
	{
		"FRDS": "Fords"
	},
	{
		"FRST": "Forest"
	},
	{
		"FRG": "Forge"
	},
	{
		"FRGS": "Forges"
	},
	{
		"FRK": "Fork"
	},
	{
		"FRKS": "Forks"
	},
	{
		"FT": "Fort"
	},
	{
		"FWY": "Freeway"
	},
	{
		"GDN": "Garden"
	},
	{
		"GDNS": "Gardens"
	},
	{
		"GTWY": "Gateway"
	},
	{
		"GLN": "Glen"
	},
	{
		"GLNS": "Glens"
	},
	{
		"GRN": "Green"
	},
	{
		"GRNS": "Greens"
	},
	{
		"GRV": "Grove"
	},
	{
		"GRVS": "Groves"
	},
	{
		"HBR": "Harbor"
	},
	{
		"HBRS": "Harbors"
	},
	{
		"HVN": "Haven"
	},
	{
		"HTS": "Heights"
	},
	{
		"HWY": "Highway"
	},
	{
		"HL": "Hill"
	},
	{
		"HLS": "Hills"
	},
	{
		"HOLW": "Hollow"
	},
	{
		"INLT": "Inlet"
	},
	{
		"IS": "Island"
	},
	{
		"ISS": "Islands"
	},
	{
		"ISLE": "Isle"
	},
	{
		"JCT": "Junction"
	},
	{
		"JCTS": "Junctions"
	},
	{
		"KY": "Key"
	},
	{
		"KYS": "Keys"
	},
	{
		"KNL": "Knoll"
	},
	{
		"KNLS": "Knolls"
	},
	{
		"LK": "Lake"
	},
	{
		"LKS": "Lakes"
	},
	{
		"LNDG": "Landing"
	},
	{
		"LN": "Lane"
	},
	{
		"LGT": "Light"
	},
	{
		"LGTS": "Lights"
	},
	{
		"LF": "Loaf"
	},
	{
		"LCK": "Lock"
	},
	{
		"LCKS": "Locks"
	},
	{
		"LDG": "Lodge"
	},
	{
		"LOOP": "Loop"
	},
	{
		"MALL": "Mall"
	},
	{
		"MNR": "Manor"
	},
	{
		"MNRS": "Manors"
	},
	{
		"MDW": "Meadow"
	},
	{
		"MDWS": "Meadows"
	},
	{
		"MEWS": "Mews"
	},
	{
		"ML": "Mill"
	},
	{
		"MLS": "Mills"
	},
	{
		"MSN": "Mission"
	},
	{
		"MTWY": "Motorway"
	},
	{
		"MT": "Mount"
	},
	{
		"MTN": "Mountain"
	},
	{
		"MTNS": "Mountains"
	},
	{
		"NCK": "Neck"
	},
	{
		"ORCH": "Orchard"
	},
	{
		"OVAL": "Oval"
	},
	{
		"PARK": "Park"
	},
	{
		"PKY": "Parkway"
	},
	{
		"PKYS": "Parkways"
	},
	{
		"PASS": "Pass"
	},
	{
		"PSGE": "Passage"
	},
	{
		"PATH": "Path"
	},
	{
		"PIKE": "Pike"
	},
	{
		"PNE": "Pine"
	},
	{
		"PNES": "Pines"
	},
	{
		"PL": "Place"
	},
	{
		"PLZ": "Plaza"
	},
	{
		"PT": "Point"
	},
	{
		"PTS": "Points"
	},
	{
		"PRT": "Port"
	},
	{
		"PRTS": "Ports"
	},
	{
		"PR": "Prairie"
	},
	{
		"RADL": "Radial"
	},
	{
		"RAMP": "Ramp"
	},
	{
		"RNCH": "Ranch"
	},
	{
		"RPD": "Rapid"
	},
	{
		"RPDS": "Rapids"
	},
	{
		"RST": "Rest"
	},
	{
		"RDG": "Ridge"
	},
	{
		"RDGS": "Ridges"
	},
	{
		"RIV": "River"
	},
	{
		"RD": "Road"
	},
	{
		"RDS": "Roads"
	},
	{
		"RT": "Route"
	},
	{
		"ROW": "Row"
	},
	{
		"RUE": "Rue"
	},
	{
		"RUN": "Run"
	},
	{
		"SHL": "Shoal"
	},
	{
		"SHLS": "Shoals"
	},
	{
		"SHR": "Shore"
	},
	{
		"SHRS": "Shores"
	},
	{
		"SKWY": "Skyway"
	},
	{
		"SPG": "Spring"
	},
	{
		"SPGS": "Springs"
	},
	{
		"SPUR": "Spur"
	},
	{
		"SPRS": "Spurs"
	},
	{
		"SQ": "Square"
	},
	{
		"SQS": "Squares"
	},
	{
		"STA": "Station"
	},
	{
		"STRA": "Stravenue"
	},
	{
		"STRM": "Stream"
	},
	{
		"ST": "Street"
	},
	{
		"STS": "Streets"
	},
	{
		"SMT": "Summit"
	},
	{
		"TER": "Terrace"
	},
	{
		"TRWY": "Throughway"
	},
	{
		"TRCE": "Trace"
	},
	{
		"TRAK": "Track"
	},
	{
		"TRFY": "Trafficway"
	},
	{
		"TRL": "Trail"
	},
	{
		"TRLR": "Trailer"
	},
	{
		"TUNL": "Tunnel"
	},
	{
		"TPKE": "Turnpike"
	},
	{
		"UPAS": "Underpass"
	},
	{
		"UN": "Union"
	},
	{
		"UNS": "Unions"
	},
	{
		"VLY": "Valley"
	},
	{
		"VLYS": "Valleys"
	},
	{
		"VIA": "Viaduct"
	},
	{
		"VW": "View"
	},
	{
		"VWS": "Views"
	},
	{
		"VLG": "Village"
	},
	{
		"VLGS": "Villages"
	},
	{
		"VL": "Ville"
	},
	{
		"VIS": "Vista"
	},
	{
		"WALK": "Walk"
	},
	{
		"WALK": "Walks"
	},
	{
		"WALL": "Wall"
	},
	{
		"WAY": "Way"
	},
	{
		"WL": "Well"
	},
	{
		"WLS": "Wells"
	}
];

(function () {
	var streetTypesStrings = [];

	for (var i in streetTypeObject) {
		var key = Object.keys(streetTypeObject[i])[0];
		var string = streetTypeObject[i][key];

		streetTypesStrings.push('<option value="' + key + '">' + string + '</div>');
	}

	$('#newIncidentStreetType').append(streetTypesStrings.join(''));
})();


var actionsTaken = {
	"1": "Fire Control or Extinguishment",
	"10": "Fire control or extinguishment, other",
	"11": "Extinguishment by fire service personnel",
	"12": "Salvage & overhaul",
	"13": "Establish fire lines (wildfire)",
	"14": "Contain fire (wildland)",
	"15": "Confine fire (wildland)",
	"16": "Control fire (wildland)",
	"17": "Manage prescribed fire (wildland)",
	"2": "Search & Rescue",
	"20": "Search & rescue, other",
	"21": "Search",
	"22": "Rescue, remove from harm",
	"23": "Extricate, disentangle",
	"24": "Recover body",
	"3": "EMS & Transport",
	"30": "Emergency medical services, other",
	"31": "Provide first aid & check for injuries",
	"32": "Provide basic life support (BLS)",
	"33": "Provide advanced life support (ALS)",
	"34": "Transport person",
	"4": "Hazardous Condition",
	"40": "Hazardous condition, other",
	"41": "Identify, analyze hazardous materials",
	"42": "HazMat detection, monitoring, sampling, & analysis",
	"43": "Hazardous materials spill control and confinement",
	"44": "Hazardous materials leak control & containment",
	"45": "Remove hazard",
	"46": "Decontaminate persons or equipment",
	"47": "Decontaminate occupancy or area",
	"48": "Remove hazardous materials",
	"5": "Fires, Rescues & Hazardous Conditions",
	"50": "Fires, rescues & hazardous conditions, other",
	"51": "Ventilate",
	"52": "Forcible entry",
	"53": "Evacuate area",
	"54": "Determine if materials are non-hazardous",
	"55": "Establish safe area",
	"56": "Provide air supply",
	"57": "Provide light or electrical power",
	"58": "Operate apparatus or vehicle",
	"6": "Systems & Services",
	"60": "Systems and services, other",
	"61": "Restore municipal services",
	"62": "Restore sprinkler or fire protection system",
	"63": "Restore fire alarm system",
	"64": "Shut down system",
	"65": "Secure property",
	"66": "Remove water",
	"7": "Assistance",
	"70": "Assistance, other",
	"71": "Assist physically disabled",
	"72": "Assist animal",
	"73": "Provide manpower",
	"74": "Provide apparatus",
	"75": "Provide equipment",
	"76": "Provide water",
	"77": "Control crowd",
	"78": "Control traffic",
	"79": "Assess severe weather or natural disaster damage",
	"8": "Information, Investigation & Enforcement",
	"80": "Information, investigation & enforcement, other",
	"81": "Incident command",
	"82": "Notify other agencies.",
	"83": "Provide information to public or media",
	"84": "Refer to proper authority",
	"85": "Enforce codes",
	"86": "Investigate",
	"87": "Investigate fire out on arrival",
	"9": "Fill-in, Standby",
	"90": "Fill-in, standby, other",
	"91": "Fill-in or moveup",
	"92": "Standby",
	"93": "Cancelled en route",
	"00": "Action taken, other",
	"UU": "Undetermined (conversion only)"
}

var detector = {
	"1": "Detector alerted occupants",
	"2": "Detector did not alert occupants",
	"U": "Unknown."
}

var hazardousMaterialRelease = {
	"1": "Natural gas: slow leak, no evac. or HazMat actions",
	"2": "Propane gas - Less than a 21 lb. tank",
	"3": "Gasoline - vehicle fuel tank or portable container",
	"4": "Kerosene - fuel-burning equipment/portable storage",
	"5": "Diesel fuel/fuel oil - vehicle fuel tank/portable",
	"6": "Household/office solvent or chemical spill",
	"7": "Motor oil - from engine or portable container",
	"8": "Paint - spills less than 55 gallons",
	"0": "Special HazMat actions required or spill >= 55 gal.",
	"N": "None"
}

var mixedUseProperty = {
	"10": "Assembly use",
	"20": "Educational use",
	"33": "Medical use",
	"40": "Residential use",
	"51": "Row of stores",
	"53": "Enclosed mall",
	"58": "Business and residential use",
	"59": "Office use",
	"60": "Industrial use",
	"63": "Military use",
	"65": "Farm use",
	"00": "Mixed use, other",
	"NN": "Not mixed use"
}

var propertyUseOld = {
	"1": "Assembly",
	"100": "Assembly, other",
	"110": "Fixed-use recreation places, other",
	"111": "Bowling establishment",
	"112": "Billiard center, pool hall",
	"113": "Electronic amusement center",
	"114": "Ice rink: indoor, outdoor",
	"115": "Roller rink: indoor or outdoor",
	"116": "Swimming facility: indoor or outdoor",
	"120": "Variable-use amusement, recreation places, other",
	"121": "Ballroom, gymnasium",
	"122": "Convention center, exhibition hall",
	"123": "Stadium, arena",
	"124": "Playground",
	"129": "Amusement center: indoor/outdoor",
	"130": "Places of worship, funeral parlors, other",
	"131": "Church, mosque, synagogue, temple, chapel",
	"134": "Funeral parlor",
	"140": "Clubs, other",
	"141": "Athletic/health club",
	"142": "Clubhouse",
	"143": "Yacht Club",
	"144": "Casino, gambling clubs",
	"150": "Public or government, other",
	"151": "Library",
	"152": "Museum",
	"154": "Memorial structure, including monuments & statues",
	"155": "Courthouse",
	"160": "Eating, drinking places, other",
	"161": "Restaurant or cafeteria",
	"162": "Bar or nightclub",
	"170": "Passenger terminal, other",
	"171": "Airport passenger terminal",
	"173": "Bus station",
	"174": "Rapid transit station",
	"180": "Studio/theater, other",
	"181": "Live performance theater",
	"182": "Auditorium, concert hall",
	"183": "Movie theater",
	"185": "Radio, television studio",
	"186": "Film/movie production studio",
	"2": "Educational",
	"200": "Educational, other",
	"210": "Schools, non-adult, other",
	"211": "Preschool",
	"213": "Elementary school, including kindergarten",
	"215": "High school/junior high school/middle school",
	"241": "Adult education center, college classroom",
	"250": "Day care, other (Conversion only)",
	"254": "Day care, in commercial property",
	"255": "Day care, in residence, licensed",
	"256": "Day care in residence, unlicensed.",
	"3": "Health Care, Detention & Correction",
	"300": "Health care, detention, & correction, other",
	"311": "24-hour care Nursing homes, 4 or more persons",
	"321": "Mental retardation/development disability facility",
	"322": "Alcohol or substance abuse recovery center",
	"323": "Asylum, mental institution",
	"331": "Hospital - medical or psychiatric",
	"332": "Hospices",
	"340": "Clinics, doctors offices, hemodialysis cntr, other",
	"341": "Clinic, clinic-type infirmary",
	"342": "Doctor, dentist or oral surgeon office",
	"343": "Hemodialysis unit",
	"361": "Jail, prison (not juvenile)",
	"363": "Reformatory, juvenile detention center",
	"365": "Police station",
	"4": "Residential",
	"400": "Residential, other",
	"419": "1 or 2 family dwelling",
	"429": "Multifamily dwelling",
	"439": "Boarding/rooming house, residential hotels",
	"449": "Hotel/motel, commercial",
	"459": "Residential board and care",
	"460": "Dormitory-type residence, other",
	"462": "Sorority house, fraternity house",
	"464": "Barracks, dormitory",
	"5": "Mercantile, Business",
	"500": "Mercantile, business, other",
	"511": "Convenience store",
	"519": "Food and beverage sales, grocery store",
	"529": "Textile, wearing apparel sales",
	"539": "Household goods, sales, repairs",
	"549": "Specialty shop",
	"557": "Personal service, including barber & beauty shops",
	"559": "Recreational, hobby, home repair sales, pet store",
	"564": "Laundry, dry cleaning",
	"569": "Professional supplies, services",
	"571": "Service station, gas station",
	"579": "Motor vehicle or boat sales, services, repair",
	"580": "General retail, other",
	"581": "Department or discount store",
	"592": "Bank",
	"593": "Office:  veterinary or research",
	"596": "Post office or mailing firms",
	"599": "Business office",
	"6": "Industrial, Utility, Defense, Agriculture, Mining",
	"600": "Ind., utility, defense, agriculture, mining, other",
	"610": "Energy production plant, other",
	"614": "Steam or heat-generating plant",
	"615": "Electric-generating plant",
	"629": "Laboratory or science laboratory",
	"631": "Defense, military installation",
	"632": "Flight control tower",
	"635": "Computer center",
	"639": "Communications center",
	"640": "Utility or Distribution system, other",
	"642": "Electrical distribution",
	"644": "Gas distribution, gas pipeline",
	"645": "Flammable liquid distribution, F.L. pipeline",
	"647": "Water utility",
	"648": "Sanitation utility",
	"655": "Crops or orchard",
	"659": "Livestock production",
	"669": "Forest, timberland, woodland",
	"679": "Mine, quarry",
	"7": "Manufacturing, Processing",
	"700": "Manufacturing, processing",
	"8": "Storage",
	"800": "Storage, other",
	"807": "Outside material storage area",
	"808": "Outbuilding or shed",
	"816": "Grain elevator, silo",
	"819": "Livestock, poultry storage",
	"839": "Refrigerated storage",
	"849": "Outside storage tank",
	"880": "Vehicle storage, other",
	"881": "Parking garage, (detached residential garage)",
	"882": "Parking garage, general vehicle",
	"888": "Fire station",
	"891": "Warehouse",
	"898": "Dock, marina, pier, wharf",
	"899": "Residential or self-storage units",
	"9": "Outside or Special Property",
	"900": "Outside or special property, other",
	"919": "Dump, sanitary landfill",
	"921": "Bridge, trestle",
	"922": "Tunnel",
	"926": "Outbuilding, protective shelter",
	"931": "Open land or field",
	"935": "Campsite with utilities",
	"936": "Vacant lot",
	"937": "Beach",
	"938": "Graded and cared-for plots of land",
	"940": "Water area, other",
	"941": "Open ocean, sea or tidal waters",
	"946": "Lake, river, stream",
	"951": "Railroad right-of-way",
	"952": "Railroad yard",
	"960": "Street, other",
	"961": "Highway or divided highway",
	"962": "Residential street, road or residential driveway",
	"963": "Street or road in commercial area",
	"965": "Vehicle parking area",
	"972": "Aircraft runway",
	"973": "Aircraft taxiway",
	"974": "Aircraft loading area",
	"981": "Construction site",
	"982": "Oil or gas field",
	"983": "Pipeline, power line or other utility right-of-way",
	"984": "Industrial plant yard - area",
	"000": "Property Use, other",
	"NNN": "None",
	"UUU": "Undetermined"
}

var propertyUse = [
	{ "1": "Assembly" },
  { "100": "Assembly, other" },
  { "110": "Fixed-use recreation places, other" },
  { "111": "Bowling establishment" },
  { "112": "Billiard center, pool hall" },
  { "113": "Electronic amusement center" },
  { "114": "Ice rink: indoor, outdoor" },
  { "115": "Roller rink: indoor or outdoor" },
  { "116": "Swimming facility: indoor or outdoor" },
  { "120": "Variable-use amusement, recreation places, other" },
  { "121": "Ballroom, gymnasium" },
  { "122": "Convention center, exhibition hall" },
  { "123": "Stadium, arena" },
  { "124": "Playground" },
  { "129": "Amusement center: indoor/outdoor" },
  { "130": "Places of worship, funeral parlors, other" },
  { "131": "Church, mosque, synagogue, temple, chapel" },
  { "134": "Funeral parlor" },
  { "140": "Clubs, other" },
  { "141": "Athletic/health club" },
  { "142": "Clubhouse" },
  { "143": "Yacht Club" },
  { "144": "Casino, gambling clubs" },
  { "150": "Public or government, other" },
  { "151": "Library" },
  { "152": "Museum" },
  { "154": "Memorial structure, including monuments & statues" },
  { "155": "Courthouse" },
  { "160": "Eating, drinking places, other" },
  { "161": "Restaurant or cafeteria" },
  { "162": "Bar or nightclub" },
  { "170": "Passenger terminal, other" },
  { "171": "Airport passenger terminal" },
  { "173": "Bus station" },
  { "174": "Rapid transit station" },
  { "180": "Studio/theater, other" },
  { "181": "Live performance theater" },
  { "182": "Auditorium, concert hall" },
  { "183": "Movie theater" },
  { "185": "Radio, television studio" },
  { "186": "Film/movie production studio" },
  { "2": "Educational" },
  { "200": "Educational, other" },
  { "210": "Schools, non-adult, other" },
  { "211": "Preschool" },
  { "213": "Elementary school, including kindergarten" },
  { "215": "High school/junior high school/middle school" },
  { "241": "Adult education center, college classroom" },
  { "250": "Day care, other (Conversion only)" },
  { "254": "Day care, in commercial property" },
  { "255": "Day care, in residence, licensed" },
  { "256": "Day care in residence, unlicensed." },
  { "3": "Health Care, Detention & Correction" },
  { "300": "Health care, detention, & correction, other" },
  { "311": "24-hour care Nursing homes, 4 or more persons" },
  { "321": "Mental retardation/development disability facility" },
  { "322": "Alcohol or substance abuse recovery center" },
  { "323": "Asylum, mental institution" },
  { "331": "Hospital - medical or psychiatric" },
  { "332": "Hospices" },
  { "340": "Clinics, doctors offices, hemodialysis cntr, other" },
  { "341": "Clinic, clinic-type infirmary" },
  { "342": "Doctor, dentist or oral surgeon office" },
  { "343": "Hemodialysis unit" },
  { "361": "Jail, prison (not juvenile)" },
  { "363": "Reformatory, juvenile detention center" },
  { "365": "Police station" },
  { "4": "Residential" },
  { "400": "Residential, other" },
  { "419": "1 or 2 family dwelling" },
  { "429": "Multifamily dwelling" },
  { "439": "Boarding/rooming house, residential hotels" },
  { "449": "Hotel/motel, commercial" },
  { "459": "Residential board and care" },
  { "460": "Dormitory-type residence, other" },
  { "462": "Sorority house, fraternity house" },
  { "464": "Barracks, dormitory" },
  { "5": "Mercantile, Business" },
  { "500": "Mercantile, business, other" },
  { "511": "Convenience store" },
  { "519": "Food and beverage sales, grocery store" },
  { "529": "Textile, wearing apparel sales" },
  { "539": "Household goods, sales, repairs" },
  { "549": "Specialty shop" },
  { "557": "Personal service, including barber & beauty shops" },
  { "559": "Recreational, hobby, home repair sales, pet store" },
  { "564": "Laundry, dry cleaning" },
  { "569": "Professional supplies, services" },
  { "571": "Service station, gas station" },
  { "579": "Motor vehicle or boat sales, services, repair" },
  { "580": "General retail, other" },
  { "581": "Department or discount store" },
  { "592": "Bank" },
  { "593": "Office:  veterinary or research" },
  { "596": "Post office or mailing firms" },
  { "599": "Business office" },
  { "6": "Industrial, Utility, Defense, Agriculture, Mining" },
  { "600": "Ind., utility, defense, agriculture, mining, other" },
  { "610": "Energy production plant, other" },
  { "614": "Steam or heat-generating plant" },
  { "615": "Electric-generating plant" },
  { "629": "Laboratory or science laboratory" },
  { "631": "Defense, military installation" },
  { "632": "Flight control tower" },
  { "635": "Computer center" },
  { "639": "Communications center" },
  { "640": "Utility or Distribution system, other" },
  { "642": "Electrical distribution" },
  { "644": "Gas distribution, gas pipeline" },
  { "645": "Flammable liquid distribution, F.L. pipeline" },
  { "647": "Water utility" },
  { "648": "Sanitation utility" },
  { "655": "Crops or orchard" },
  { "659": "Livestock production" },
  { "669": "Forest, timberland, woodland" },
  { "679": "Mine, quarry" },
  { "7": "Manufacturing, Processing" },
  { "700": "Manufacturing, processing" },
  { "8": "Storage" },
  { "800": "Storage, other" },
  { "807": "Outside material storage area" },
  { "808": "Outbuilding or shed" },
  { "816": "Grain elevator, silo" },
  { "819": "Livestock, poultry storage" },
  { "839": "Refrigerated storage" },
  { "849": "Outside storage tank" },
  { "880": "Vehicle storage, other" },
  { "881": "Parking garage, (detached residential garage)" },
  { "882": "Parking garage, general vehicle" },
  { "888": "Fire station" },
  { "891": "Warehouse" },
  { "898": "Dock, marina, pier, wharf" },
  { "899": "Residential or self-storage units" },
  { "9": "Outside or Special Property" },
  { "900": "Outside or special property, other" },
  { "919": "Dump, sanitary landfill" },
  { "921": "Bridge, trestle" },
  { "922": "Tunnel" },
  { "926": "Outbuilding, protective shelter" },
  { "931": "Open land or field" },
  { "935": "Campsite with utilities" },
  { "936": "Vacant lot" },
  { "937": "Beach" },
  { "938": "Graded and cared-for plots of land" },
  { "940": "Water area, other" },
  { "941": "Open ocean, sea or tidal waters" },
  { "946": "Lake, river, stream" },
  { "951": "Railroad right-of-way" },
  { "952": "Railroad yard" },
  { "960": "Street, other" },
  { "961": "Highway or divided highway" },
  { "962": "Residential street, road or residential driveway" },
  { "963": "Street or road in commercial area" },
  { "965": "Vehicle parking area" },
  { "972": "Aircraft runway" },
  { "973": "Aircraft taxiway" },
  { "974": "Aircraft loading area" },
  { "981": "Construction site" },
  { "982": "Oil or gas field" },
  { "983": "Pipeline, power line or other utility right-of-way" },
  { "984": "Industrial plant yard - area" },
  { "000": "Property Use, other" },
  { "NNN": "None" },
  { "UUU": "Undetermined" }
]

var namePrefix = {
	"MR": "Mr.",
	"MRS": "Mrs.",
	"MS": "Ms.",
	"DR": "Doctor",
	"REV": "Reverend"
}

var nameSuffix = {
	"JR": "Junior",
	"SR": "Senior",
	"I": "The First",
	"II": "The Second",
	"III": "The Third",
	"IV": "The Fourth",
	"V": "The Fifth",
	"MD": "Medical Doctor",
	"DDS": "Doctor of Dental Science"
}


/* START FIRE MODULE */

var onSiteMaterialsProducts = {
	"1": "Foods, Beverages, Agriculture",
	"100": "Foods, beverages, agriculture, other",
	"11": "Food",
	"110": "Food, other",
	"111": "Baked goods",
	"112": "Meat products, including poultry & fish",
	"113": "Dairy products",
	"114": "Produce, fruit, or vegetables",
	"115": "Sugar, spices",
	"116": "Deli products",
	"117": "Cereals, grains; packaged",
	"118": "Fat/cooking grease, including lard & animal fat",
	"12": "Beverages",
	"120": "Beverages, other",
	"121": "Alcoholic beverage",
	"122": "Nonalcoholic beverage",
	"13": "Agriculture",
	"130": "Agriculture, other",
	"131": "Trees, plants, flowers",
	"132": "Feed, grain, seed",
	"133": "Hay, straw",
	"134": "Crop, not grain",
	"135": "Livestock",
	"136": "Pets",
	"137": "Pesticides",
	"138": "Fertilizer",
	"2": "Personal & Home Products",
	"200": "Personal & home products, other",
	"21": "Fabrics",
	"210": "Fabrics, other",
	"211": "Curtains, drapes",
	"212": "Linens",
	"213": "Bedding",
	"214": "Cloth, yarn, dry goods",
	"22": "Wearable products",
	"220": "Wearable products, other",
	"221": "Clothes",
	"222": "Footwear",
	"223": "Eyeglasses",
	"225": "Perfumes, colognes, cosmetics",
	"226": "Toiletries",
	"23": "Accessories",
	"230": "Accessories, other",
	"231": "Jewelry, watches",
	"232": "Luggage, suitcases",
	"233": "Purses, satchels, briefcases, wallets, belts",
	"24": "Furnishings",
	"240": "Furnishings, other",
	"241": "Furniture",
	"242": "Beds, mattresses",
	"243": "Clocks",
	"244": "Housewares",
	"245": "Glass, ceramics, china, pottery, stoneware",
	"246": "Silverware",
	"3": "Raw Materials",
	"300": "Raw materials, other",
	"31": "Wood",
	"310": "Wood, other",
	"311": "Lumber, sawn wood",
	"312": "Timber",
	"313": "Cork",
	"314": "Pulp",
	"315": "Sawdust, wood chips",
	"32": "Fibers",
	"320": "Fibers, other",
	"321": "Cotton",
	"322": "Wool",
	"323": "Silk",
	"33": "Animal skins",
	"330": "Animal skins, other",
	"331": "Leather",
	"332": "Fur",
	"34": "Other raw materials",
	"341": "Ore",
	"342": "Rubber",
	"343": "Plastics",
	"344": "Fiberglass",
	"345": "Salt",
	"4": "Paper Products, Rope",
	"400": "Paper products, rope, other",
	"41": "Paper products",
	"410": "Paper products, other",
	"411": "Newspaper, magazines",
	"412": "Books",
	"413": "Greeting cards",
	"414": "Paper, rolled",
	"415": "Cardboard",
	"416": "Packaged paper products, including stationery",
	"417": "Paper records or reports",
	"42": "Rope, twine, cordage",
	"421": "Rope, twine, cordage",
	"5": "Flammables, Chemicals, Plastics,",
	"500": "Flammables, chemicals, plastics, other",
	"51": "Flammables, combustible liquids",
	"510": "Flammables, combustible liquids, other",
	"511": "Gasoline, diesel fuel",
	"512": "Flammable liquid, not gasoline",
	"513": "Combustible liquid, including heating oil",
	"514": "Motor oil",
	"515": "Heavy oils, grease, noncooking related",
	"516": "Asphalt",
	"517": "Adhesive, resin, tar",
	"52": "Flammable gases",
	"520": "Flammable gases, other",
	"521": "Natural gas",
	"522": "LP gas, butane, propane",
	"523": "Hydrogen gas",
	"53": "Solid fuel, coal type",
	"530": "Solid fuel, coal type, other",
	"531": "Charcoal",
	"532": "Coal",
	"533": "Peat",
	"534": "Coke",
	"54": "Chemicals, drugs",
	"540": "Chemicals, drugs, other",
	"541": "Hazardous chemicals",
	"542": "Nonhazardous chemicals",
	"543": "Cleaning supplies",
	"544": "Pharmaceuticals, drugs",
	"545": "Illegal drugs",
	"55": "Radioactive materials",
	"551": "Radioactive materials",
	"6": "Construction, Machinery, Metals",
	"600": "Construction, machinery, metals, other",
	"61": "Machinery, tools",
	"610": "Machinery, tools, other",
	"611": "Industrial machinery",
	"612": "Machine parts",
	"613": "Tools (power and hand tools)",
	"62": "Construction supplies",
	"620": "Construction supplies, other",
	"621": "Hardware products",
	"622": "Construction and home improvement products",
	"623": "Pipes, fittings",
	"624": "Stone-working materials",
	"625": "Lighting fixtures and lamps",
	"626": "Electrical parts, supplies, equipment",
	"627": "Insulation",
	"628": "Abrasives",
	"629": "Fencing, fence supplies",
	"63": "Floor and wall coverings",
	"630": "Floor and wall coverings, other",
	"631": "Carpets, rugs",
	"632": "Linoleum, tile",
	"633": "Ceramic tile",
	"634": "Wallpaper",
	"635": "Paint",
	"64": "Metal products",
	"640": "Metal products, other",
	"641": "Steel, iron products",
	"642": "Nonferrous metal products",
	"643": "Combustible metals products",
	"7": "Appliances, Electronics, Medical, Laboratory",
	"700": "Appliances, electronics, medical, laboratory, other",
	"71": "Appliances, electronics",
	"710": "Appliances, electronics, other",
	"711": "Appliances",
	"712": "Electronic parts, supplies, equipment",
	"713": "Electronic media",
	"714": "Photographic equipment, supplies, materials",
	"72": "Medical, laboratory products",
	"720": "Medical, laboratory products, other",
	"721": "Dental supplies",
	"722": "Medical supplies",
	"723": "Optical products",
	"724": "Veterinary supplies",
	"725": "Laboratory supplies",
	"8": "Vehicles, Vehicle Parts",
	"800": "Vehicles, other (Conversion only)",
	"81": "Motor vehicles",
	"810": "Motor vehicles and parts, other",
	"811": "Autos, trucks, buses, recreational vehicles",
	"812": "Construction vehicles",
	"813": "Motor vehicle parts, not including tires",
	"814": "Tires",
	"82": "Watercraft",
	"820": "Watercraft, other",
	"821": "Boats, ships",
	"83": "Aircraft",
	"830": "Aircraft, other",
	"831": "Planes, airplanes",
	"832": "Helicopters",
	"84": "Rail",
	"840": "Rail, other",
	"841": "Trains, light rail, rapid transit cars",
	"842": "Rail equipment",
	"85": "Non-motorized vehicles",
	"850": "Non-motorized vehicles, other",
	"851": "Bicycles, tricycles, unicycles",
	"9": "Other Products",
	"91": "Containers, packing materials",
	"910": "Containers, packing materials, other",
	"911": "Bottles, barrels, boxes",
	"912": "Packing material",
	"913": "Pallets",
	"92": "Previously owned products",
	"920": "Previously owned products, other",
	"921": "Antiques",
	"922": "Collectibles",
	"923": "Used merchandise",
	"93": "Ordnance, explosives, fireworks",
	"930": "Ordnance, explosives, fireworks, other",
	"931": "Guns",
	"932": "Ammunition",
	"933": "Explosives",
	"934": "Fireworks, commercially made",
	"935": "Rockets, missiles",
	"94": "Recreation, arts (products)",
	"940": "Recreation, arts products, other",
	"941": "Musical instruments",
	"942": "Hobby, crafts",
	"943": "Art supply/artwork",
	"944": "Sporting goods",
	"945": "Camping, hiking, outdoor products",
	"946": "Games, toys",
	"95": "Mixed sales products",
	"950": "Mixed sales products, other",
	"951": "Office supplies",
	"952": "Restaurant supplies, not including food",
	"96": "Discarded material",
	"960": "Discarded material, other",
	"961": "Junkyard materials",
	"962": "Recyclable materials",
	"963": "Trash, not recyclable",
	"000": "On-site materials, other",
	"NNN": "None",
	"UUU": "Undetermined"
}

var onSiteMaterialsStorage = {
	"1": "Bulk storage or warehousing",
	"2": "Processing or manufacturing",
	"3": "Packaged goods for sale",
	"4": "Repair or service",
	"N": "None",
	"U": "Undetermined"
}

var areaOfFireOrigin = {
	"0": "Means of Egress",
	"01": "Hallway corridor, mall",
	"02": "Exterior stairway, ramp, or fire escape",
	"03": "Interior stairway or ramp",
	"04": "Escalator: exterior, interior",
	"05": "Entranceway, lobby",
	"09": "Egress/exit, other",
	"1": "Assembly, Sales Areas (Groups of People)",
	"11": "Arena, assembly area w/ fixed seats - 100+ persons",
	"12": "Assembly area without fixed seats - 100+ persons",
	"13": "Assembly area - less than 100 persons",
	"14": "Common room, den, family room, living room, lounge",
	"15": "Sales area, showroom (excludes display window)",
	"16": "Art gallery, exhibit hall, library",
	"17": "Swimming pool",
	"10": "Assembly or sales area, other",
	"2": "Function Areas",
	"21": "Bedroom - < 5 persons; included are jail or prison",
	"22": "Bedroom - 5+ persons; including barrack/dormitory",
	"23": "Dining room, cafeteria, bar area, beverage service",
	"24": "Cooking area, kitchen",
	"25": "Bathroom, checkroom, lavatory, locker room",
	"26": "Laundry area, wash house (laundry)",
	"27": "Office",
	"28": "Personal service area, barber/beauty salon area",
	"20": "Function areas, other",
	"3": "Technical Processing Areas",
	"31": "Laboratory",
	"32": "Dark room, photography area, or printing area",
	"33": "Treatment - first aid area, surgery area",
	"34": "Surgery area - major operations, operating room",
	"35": "Computer room, control room or center",
	"36": "Stage area - performance, basketball court, boxing",
	"37": "Projection room, spotlight area",
	"38": "Processing/manufacturing area, workroom",
	"30": "Technical processing areas, other",
	"4": "Storage Areas",
	"41": "Storage room, area, tank, or bin",
	"42": "Closet",
	"43": "Storage: supplies or tools; dead storage",
	"44": "Records storage room, storage vault",
	"45": "Shipping/receiving area; loading area, dock or bay",
	"46": "Chute/container - trash, rubbish, waste",
	"47": "Vehicle storage area; garage, carport",
	"40": "Storage area, other",
	"5": "Service Areas",
	"51": "Dumbwaiter or elevator shaft",
	"52": "Conduit, pipe, utility, or ventilation shaft",
	"53": "Light shaft",
	"54": "Chute; laundry or mail, excluding trash chutes",
	"55": "Duct: hvac, cable, exhaust, heating, or AC",
	"56": "Display window",
	"57": "Chimney (conversion only)",
	"58": "Conveyor",
	"50": "Service facilities, other",
	"6": "Service, Equipment Areas",
	"61": "Machinery room or area; elevator machinery room",
	"62": "Heating room or area, water heater area",
	"63": "Switchgear area, transformer vault",
	"64": "Incinerator area",
	"65": "Maintenance shop or area, paint shop or area",
	"66": "Cell, test",
	"67": "Enclosure, pressurized air",
	"68": "Enclosure with enriched oxygen atmosphere",
	"60": "Equipment or service area, other",
	"7": "Structural Areas",
	"71": "Substructure area or space, crawl space",
	"72": "Exterior balcony, unenclosed porch",
	"73": "Ceiling and floor assembly, crawl space between stories",
	"74": "Attic: vacant, crawl space above top story",
	"75": "Wall assembly, concealed wall space",
	"76": "Wall surface: exterior",
	"77": "Roof surface: exterior",
	"78": "Awning",
	"70": "Structural area, other",
	"8": "Transportation, Vehicle Areas",
	"81": "Operator/passenger area of transportation equipment",
	"82": "Cargo/trunk area—all vehicles",
	"83": "Engine area, running gear, wheel area",
	"84": "Fuel tank, fuel line",
	"85": "Separate operator/control area of transportation equipment",
	"86": "Exterior, exposed surface",
	"80": "Vehicle area, other",
	"9": "Other Area of Origin",
	"91": "Railroad right-of-way: on or near",
	"92": "Highway, parking lot, street: on or near",
	"93": "Courtyard, patio, terrace",
	"94": "Open area, outside; included are farmland, field",
	"95": "Wildland, woods",
	"96": "Construction/renovation area",
	"97": "Multiple areas",
	"98": "Vacant structural area",
	"90": "Outside area, other",
	"00": "Other area of fire origin",
	"UU": "Undetermined"
}

var heatSource = {
	"1": "Operating Equipment",
	"11": "Spark, ember, or flame from operating equipment",
	"12": "Radiated or conducted heat from operating equipment",
	"13": "Electrical arcing",
	"10": "Heat from powered equipment, other",
	"4": "Hot or Smoldering Object",
	"41": "Heat, spark from friction",
	"42": "Molten, hot material",
	"43": "Hot ember or ash",
	"40": "Hot or smoldering object, other",
	"5": "Explosives, Fireworks",
	"51": "Munitions",
	"53": "Blasting agent, primer cord, black powder fuse",
	"54": "Fireworks",
	"55": "Model and amateur rockets",
	"56": "Incendiary device",
	"50": "Explosive, fireworks, other",
	"6": "Other Open Flame or Smoking Materials",
	"61": "Cigarette",
	"62": "Pipe or cigar",
	"63": "Heat from undetermined smoking material",
	"64": "Match",
	"65": "Lighter: cigarette, cigar",
	"66": "Candle",
	"67": "Warning or road flare; fuse",
	"68": "Backfire from internal combustion engine",
	"69": "Flame/torch used for lighting",
	"60": "Heat from other open flame or smoking materials, other",
	"7": "Chemical, Natural Heat Sources",
	"71": "Sunlight",
	"72": "Spontaneous combustion, chemical reaction",
	"73": "Lightning discharge",
	"74": "Other static discharge",
	"70": "Chemical, natural heat source, other",
	"8": "Heat Spread from Another Fire",
	"81": "Heat from direct flame, convection currents",
	"82": "Radiated heat from another fire",
	"83": "Flying brand, ember, spark",
	"84": "Conducted heat from another fire",
	"80": "Heat spread from another fire, other",
	"9": "Other Heat Sources",
	"97": "Multiple heat sources including multiple ignitions",
	"00": "Heat source: other",
	"UU": "Undetermined"
}

var itemFirstIgnited = {
	"1": "Structural Component, Finish",
	"10": "Structural component or finish, other",
	"11": "Exterior roof covering, surface, finish",
	"12": "Exterior sidewall covering, surface, finish",
	"13": "Exterior trim, including doors",
	"14": "Floor covering or rug/carpet/mat, surface",
	"15": "Interior wall covering excluding drapes, etc.",
	"16": "Interior ceiling covering or finish",
	"17": "Structural member or framing",
	"18": "Thermal, acoustical insulation within wall, partition or floor/ceiling space",
	"2": "Furniture, Utensils, including built-in furniture",
	"20": "Furniture, utensils, other",
	"21": "Upholstered sofa, chair, vehicle seats",
	"22": "Non-upholstered chair, bench",
	"23": "Cabinetry (including built-in)",
	"24": "Ironing board",
	"25": "Appliance housing or casing",
	"26": "Household utensils",
	"3": "Soft Goods, Wearing Apparel",
	"30": "Soft goods, wearing apparel, other",
	"31": "Mattress, pillow",
	"32": "Bedding; blanket, sheet, comforter",
	"33": "Linen; other than bedding",
	"34": "Wearing apparel not on a person",
	"35": "Wearing apparel on a person",
	"36": "Curtain, blind, drapery, tapestry",
	"37": "Goods not made up, including fabrics and yard goods",
	"38": "Luggage",
	"4": "Adornment, Recreational Material, Signs",
	"40": "Adornment, recreational material, signs, other",
	"41": "Christmas tree",
	"42": "Decoration",
	"43": "Sign, including outdoor signs such as billboards",
	"44": "Chips, including wood chips",
	"45": "Toy, game",
	"46": "Awning, canopy",
	"47": "Tarpaulin, tent",
	"5": "Storage Supplies",
	"50": "Storage supplies, other",
	"51": "Box, carton, bag, basket, barrel",
	"52": "Material being used to make a product",
	"53": "Pallet, skid (empty)",
	"54": "Cord, rope, twine, yarn",
	"55": "Packing, wrapping material",
	"56": "Baled goods or material",
	"57": "Bulk storage",
	"58": "Palletized material, material stored on pallets.",
	"59": "Rolled, wound material (paper and fabrics)",
	"6": "Liquids, Piping, Filters",
	"60": "Liquids, piping, filters, other",
	"61": "Atomized liquid, vaporized liquid, aerosol.",
	"62": "Flammable liquid/gas - in/from engine or burner",
	"63": "Flammable liquid/gas - in/from final container",
	"64": "Flammable liquid/gas in container or pipe",
	"65": "Flammable liquid/gas - uncontained",
	"66": "Pipe, duct, conduit, hose",
	"67": "Pipe, duct, conduit, hose covering",
	"68": "Filter, including evaporative cooler pads",
	"7": "Organic Materials",
	"70": "Organic materials, other",
	"71": "Agricultural crop, including fruits and vegetables",
	"72": "Light vegetation - not crop, including grass",
	"73": "Heavy vegetation - not crop, including trees",
	"74": "Animal, living or dead",
	"75": "Human, living or dead",
	"76": "Cooking materials, including edible materials",
	"77": "Feathers or fur, not on bird or animal",
	"8": "General Materials",
	"80": "General materials, other (conversion only)",
	"81": "Electrical wire, cable insulation",
	"82": "Transformer, including transformer fluids",
	"83": "Conveyor belt, drive belt, V-belt",
	"84": "Tire",
	"85": "Railroad ties",
	"86": "Fence, pole",
	"87": "Fertilizer",
	"88": "Pyrotechnics, explosives",
	"9": "General Materials Continued",
	"90": "General materials continued (conversion only)",
	"91": "Book",
	"92": "Magazine, newspaper, writing paper",
	"93": "Adhesive",
	"94": "Dust, fiber, lint, including sawdust and excelsior",
	"95": "Film, residue, including paint and resin",
	"96": "Rubbish, trash, waste",
	"97": "Oily rags",
	"99": "Multiple items first ignited",
	"00": "Item first ignited, other",
	"UU": "Undetermined"
}

var typeOfMaterialFirstIgnited = {
	"11": "Natural gas",
	"12": "LP gas",
	"13": "Anesthetic gas",
	"14": "Acetylene gas",
	"15": "Hydrogen",
	"10": "Flammable gas, other",
	"2": "Flammable, Combustible Liquid",
	"21": "Ether, pentane-type flammable liquid",
	"22": "JP-4 jet fuel and methyl ethyl ketone type flammable",
	"23": "Gasoline",
	"24": "Turpentine, butyl-alcohol-type flammable liquid",
	"25": "Kerosene, No.1 and 2 fuel oil, diesel fuel",
	"26": "Cottonseed oil, creosote-oil-type combustible",
	"27": "Cooking oil, transformer or lubricating oil",
	"28": "Ethanol",
	"20": "Flammable or combustible liquid, other",
	"3": "Volatile Solid or Chemical",
	"31": "Fat, grease, butter, margarine, lard",
	"32": "Petroleum jelly and non-food grease",
	"33": "Polish, paraffin, wax",
	"34": "Adhesive, resin, tar, glue, asphalt, pitch",
	"35": "Paint, varnish—applied",
	"36": "Combustible metal, included are magnesium",
	"37": "Solid chemical, included are explosives",
	"38": "Radioactive material",
	"30": "Volatile solid or chemical, other",
	"4": "Plastics",
	"41": "Plastic",
	"5": "Natural Product",
	"51": "Rubber, excluding synthetic rubbers",
	"52": "Cork",
	"53": "Leather",
	"54": "Hay, straw",
	"55": "Grain, natural fiber (preprocess)",
	"56": "Coal, coke, briquettes, peat",
	"57": "Food, starch, excluding fat and grease (Code 31)",
	"58": "Tobacco",
	"50": "Natural product, other",
	"6": "Wood or Paper - Processed",
	"61": "Wood chips, sawdust, shavings",
	"62": "Round timber, including round posts, poles",
	"63": "Sawn wood, including all finished lumber",
	"64": "Plywood",
	"65": "Fiberboard, particleboard, and hardboard",
	"66": "Wood pulp, wood fiber",
	"67": "Paper, including cellulose, waxed paper",
	"68": "Cardboard",
	"60": "Wood or paper, processed, other",
	"7": "Fabric, Textiles, Fur",
	"71": "Fabric, fiber, cotton, blends, rayon, wool",
	"74": "Fur, silk, other fabric.",
	"75": "Wig",
	"76": "Human hair",
	"77": "Plastic-coated fabric",
	"70": "Fabric, textile, fur, other",
	"8": "Material Compounded with Oil",
	"81": "Linoleum",
	"82": "Oilcloth",
	"86": "Asphalt-treated material",
	"80": "Material compounded with oil, other",
	"9": "Other Material",
	"99": "Multiple types of material",
	"00": "Type of material first ignited, other",
	"UU": "Undetermined"
}

var causeOfIgnition = {
	"1": "Intentional",
	"2": "Unintentional",
	"3": "Failure of equipment or heat source",
	"4": "Act of nature",
	"5": "Cause under investigation",
	"0": "Cause, other (System generated code only, not used for data entry)",
	"U": "Cause undetermined after investigation"
}

var factorsIgnition = {
	"1": "Misuse of Material or Product",
	"10": "Misuse of material or product, other",
	"11": "Abandoned or discarded materials or products",
	"12": "Heat source too close to combustibles.",
	"13": "Cutting, welding too close to combustible",
	"14": "Flammable liquid or gas spilled",
	"15": "Improper fueling technique",
	"16": "Flammable liquid used to kindle fire",
	"17": "Washing part, painting with flammable liquid",
	"18": "Improper container or storage procedure",
	"19": "Playing with heat source",
	"2": "Mechanical Failure, Malfunction",
	"20": "Mechanical failure, malfunction, other",
	"21": "Automatic control failure",
	"22": "Manual control failure",
	"23": "Leak or break",
	"25": "Worn out",
	"26": "Backfire",
	"27": "Improper fuel used",
	"3": "Electrical Failure, Malfunction",
	"30": "Electrical failure, malfunction, other",
	"31": "Water-caused short-circuit arc",
	"32": "Short-circuit arc from mechanical damage",
	"33": "Short-circuit arc from defective, worn insulation",
	"34": "Unspecified short-circuit arc",
	"35": "Arc from faulty contact, broken conductor",
	"36": "Arc, spark from operating equipment",
	"37": "Fluorescent light ballast",
	"4": "Design, Manufacturing, Installation Deficiency",
	"40": "Design, manufacture, installation deficiency, other",
	"41": "Design deficiency",
	"42": "Construction deficiency",
	"43": "Installation deficiency",
	"44": "Manufacturing deficiency",
	"5": "Operational Deficiency",
	"50": "Operational deficiency, other",
	"51": "Collision, knock down, run over, turn over",
	"52": "Accidentally turned on, not turned off",
	"53": "Equipment unattended",
	"54": "Equipment overloaded",
	"55": "Failure to clean",
	"56": "Improper startup/shutdown procedure",
	"57": "Equipment not used for purpose intended",
	"58": "Equipment not operated properly",
	"6": "Natural Condition",
	"60": "Natural condition, other",
	"61": "High wind",
	"62": "Storm",
	"63": "High water including floods",
	"64": "Earthquake",
	"65": "Volcanic action",
	"66": "Animal",
	"7": "Fire Spread or Control",
	"70": "Fire spread or control, other",
	"71": "Exposure fire",
	"72": "Rekindle",
	"73": "Outside/open fire for debris or waste disposal",
	"74": "Outside/open fire for warming or cooking",
	"75": "Agriculture or land management burns",
	"00": "Factors contributing to ignition, other",
	"NN": "None",
	"UU": "Undetermined"
}

var humanFactorsIgnition = {
	"1": "Asleep",
	"2": "Possibly impaired by alcohol or drugs",
	"3": "Unattended or unsupervised person",
	"4": "Possibly mentally disabled",
	"5": "Physically disabled",
	"6": "Multiple persons involved",
	"7": "Age was a factor",
	"N": "None"
}

var ageFactorGender = {
	"1": "Male.",
	"2": "Female."
}

var equipmentInvolvedIgnition = {
	"1": "Heating, Ventilation, Air Conditioning",
	"100": "Heating, ventilation and air conditioning, other",
	"111": "Air conditioner",
	"112": "Heat pump",
	"113": "Fan",
	"114": "Humidifier, non-heat producing",
	"115": "Ionizer",
	"116": "Dehumidifier, portable",
	"117": "Evaporative cooler, cooling tower.",
	"120": "Fireplace, chimney, other",
	"121": "Fireplace, masonry",
	"122": "Fireplace, factory-built",
	"123": "Fireplace, insert/stove",
	"124": "Stove, heating",
	"125": "Chimney connector, vent connector",
	"126": "Chimney: brick, stone, masonry",
	"127": "Chimney: metal, including stovepipe, flue",
	"131": "Furnace, local heating unit, built-in",
	"132": "Furnace, central heating unit",
	"133": "Boiler (power, process, heating)",
	"141": "Heater, excluding catalytic and oil-filled heaters",
	"142": "Heater, catalytic",
	"143": "Heater, oil filled",
	"144": "Heat lamp",
	"145": "Heat tape",
	"151": "Water heater",
	"152": "Steam line, heat pipe, hot air duct",
	"2": "Electrical Distribution, Lighting & Power Transfer",
	"200": "Electrical distribution, power transfer, other",
	"210": "Electrical wiring, other",
	"211": "Electrical power (utility) line",
	"212": "Electrical service supply wires from utility",
	"213": "Electric meter, meter box",
	"214": "Electrical wiring from meter box to circuit breaker",
	"215": "Panel board, switchboard, circuit breaker board",
	"216": "Electrical branch circuit",
	"217": "Outlet, receptacle",
	"218": "Wall-type switch",
	"219": "Ground-fault interrupter (GFI), portable, plug-in",
	"221": "Transformer, distribution-type",
	"222": "Overcurrent, disconnect equipment",
	"223": "Transformer, low voltage",
	"224": "Generator",
	"225": "Inverter",
	"226": "Uninterrupted power supply (UPS)",
	"227": "Surge protector",
	"228": "Battery charger, rectifier",
	"229": "Battery",
	"230": "Lamp, lighting, other",
	"231": "Lamp: tabletop, floor, desk",
	"232": "Lantern, flashlight",
	"233": "Incandescent lighting fixture",
	"234": "Fluorescent lighting fixture, ballast",
	"235": "Halogen lighting fixture or lamp",
	"236": "Sodium, mercury vapor lighting fixtures or lamps;",
	"237": "Portable or movable work light, trouble light",
	"238": "Light bulb",
	"241": "Night light",
	"242": "Decorative lights, line voltage",
	"243": "Decorative or landscape lighting, low voltage",
	"244": "Sign",
	"251": "Fence, electric",
	"252": "Traffic control device",
	"253": "Lightning rod, arrester/grounding device",
	"260": "Cord, plug, other",
	"261": "Power cord, plug; detachable from appliance",
	"262": "Power cord, plug; permanently attached",
	"263": "Extension cord",
	"3": "Shop Tools, Industrial Equipment",
	"300": "Shop tools and industrial equipment, other",
	"310": "Power tools, other",
	"311": "Power saw",
	"312": "Power lathe",
	"313": "Power shaper, router, jointer, planer",
	"314": "Power cutting tool",
	"315": "Power drill, screwdriver",
	"316": "Power sander, grinder, buffer, polisher",
	"317": "Power hammer, including jackhammers",
	"318": "Power nail gun, stud driver, stapler",
	"320": "Painting tools, other",
	"321": "Paint dipper",
	"322": "Paint flow coating machine",
	"323": "Paint mixing machine",
	"324": "Paint sprayer",
	"325": "Coating machine, including asphalt-saturating",
	"331": "Welding torch.",
	"332": "Cutting torch",
	"333": "Burners",
	"334": "Soldering equipment",
	"340": "Hydraulic equipment, other",
	"341": "Air compressor",
	"342": "Gas compressor",
	"343": "Atomizing equipment",
	"344": "Pump",
	"345": "Wet/dry vacuum (shop vacuum)",
	"346": "Hoist, lift, crane",
	"347": "Powered jacking equipment",
	"348": "Drilling machinery or equipment",
	"351": "Heat-treating equipment",
	"352": "Incinerator",
	"353": "Industrial furnace, oven, kiln",
	"354": "Tarpot, tar kettle",
	"355": "Casting, molding, forging equipment",
	"356": "Distilling equipment",
	"357": "Digester, reactor",
	"358": "Extractor, waste recovery machine",
	"361": "Conveyor",
	"362": "Power transfer equipment: ropes, cables, blocks, belts",
	"363": "Power takeoff",
	"364": "Powered valves.",
	"365": "Bearing or brake",
	"371": "Picking, carding, weaving machine",
	"372": "Testing equipment",
	"373": "Gas regulator",
	"374": "Motor, separate",
	"375": "Internal combustion engine (nonvehicular)",
	"376": "Printing press",
	"377": "Car washing equipment",
	"4": "Commercial and Medical Equipment",
	"400": "Commercial and medical equipment, other",
	"410": "Medical equipment, other",
	"411": "Dental, medical, or other powered bed or chair",
	"412": "Dental equipment, other",
	"413": "Dialysis equipment",
	"414": "Medical imaging equipment",
	"415": "Medical monitoring equipment",
	"416": "Oxygen administration equipment",
	"417": "Radiological equipment, x-ray, radiation therapy",
	"418": "Sterilizer: medical",
	"419": "Therapeutic equipment",
	"421": "Transmitter",
	"422": "Telephone switching gear, including PBX",
	"423": "TV monitor array",
	"424": "Studio-type TV camera",
	"425": "Studio-type sound recording/modulating equipment",
	"426": "Radar equipment",
	"431": "Amusement ride equipment",
	"432": "Ski lift",
	"433": "Elevator or lift",
	"434": "Escalator",
	"441": "Microfilm, microfiche viewing equipment",
	"442": "Photo processing equipment",
	"443": "Vending machine",
	"444": "Nonvideo arcade game",
	"445": "Water fountain, water cooler",
	"446": "Telescope",
	"450": "Laboratory equipment, other",
	"451": "Electron microscope",
	"5": "Garden Tools, Agricultural Equipment",
	"500": "Gardening tools and agricultural equipment, other",
	"511": "Combine, threshing machine",
	"512": "Hay processing equipment",
	"513": "Farm elevator or conveyor",
	"514": "Silo loader, unloader, screw/sweep auger",
	"515": "Feed grinder, mixer, blender",
	"516": "Milking machine",
	"517": "Pasteurizer",
	"518": "Cream separator",
	"521": "Sprayer: farm or garden",
	"522": "Chain saw",
	"523": "Weed burner",
	"524": "Lawn mower",
	"525": "Lawn, landscape trimmer, edger",
	"531": "Lawn vacuum",
	"532": "Leaf blower",
	"533": "Mulcher, grinder, chipper",
	"534": "Snow blower, thrower",
	"535": "Log splitter",
	"536": "Post hole auger",
	"537": "Post driver, pile driver",
	"538": "Tiller, cultivator",
	"6": "Kitchen and Cooking Equipment",
	"600": "Kitchen and cooking equipment, other",
	"611": "Blender, juicer, food processor, mixer",
	"612": "Coffee grinder",
	"621": "Can opener",
	"622": "Knife",
	"623": "Knife sharpener",
	"631": "Coffee maker or teapot",
	"632": "Food warmer, hot plate",
	"633": "Kettle",
	"634": "Popcorn popper",
	"635": "Pressure cooker or canner",
	"636": "Slow cooker",
	"637": "Toaster, toaster oven, countertop broiler",
	"638": "Waffle iron, griddle",
	"639": "Wok, frying pan, skillet",
	"641": "Bread-making machine",
	"642": "Deep fryer",
	"643": "Grill, hibachi, barbecue",
	"644": "Microwave oven",
	"645": "Oven, rotisserie",
	"646": "Range, stove with/without oven or cooking surface",
	"647": "Steam table, warming drawer/table",
	"651": "Dishwasher",
	"652": "Freezer when separate from refrigerator",
	"653": "Garbage disposer",
	"654": "Grease hood/duct exhaust fan",
	"655": "Ice maker (separate from refrigerator)",
	"656": "Refrigerator, refrigerator/freezer",
	"7": "Electronic and Other Electrical Equipment",
	"700": "Electronic equipment, other",
	"710": "Computer device, other",
	"711": "Computer",
	"712": "Computer storage device: external",
	"713": "Computer modem, external",
	"714": "Computer monitor",
	"715": "Computer printer",
	"716": "Computer projection device, LCD panel, projector",
	"720": "Office equipment, other",
	"721": "Adding machine, calculator",
	"722": "Telephone or answering machine",
	"723": "Cash register",
	"724": "Copier",
	"725": "Fax machine",
	"726": "Paper shredder",
	"727": "Postage, shipping meter equipment",
	"728": "Typewriter",
	"730": "Musical instrument, other",
	"731": "Guitar",
	"732": "Piano, organ",
	"733": "Musical synthesizer or keyboard",
	"740": "Sound recording or receiving equipment, other",
	"741": "CD player (audio)",
	"742": "Laser disk player",
	"743": "Radio",
	"744": "Radio, two way",
	"745": "Record player, phonograph, turntable",
	"747": "Speakers, audio; separate components",
	"748": "Stereo equipment",
	"749": "Tape recorder or player",
	"750": "Video equipment, other",
	"751": "Cable converter box",
	"752": "Projector: film, slide, overhead",
	"753": "Television",
	"754": "VCR or VCR-TV combination",
	"755": "Video game - electronic",
	"756": "Camcorder, video camera",
	"757": "Photographic camera and equipment",
	"8": "Personal and Household Equipment",
	"800": "Personal and household equipment, other",
	"811": "Clothes dryer",
	"812": "Trash compactor",
	"813": "Washer/dryer combination (within one frame)",
	"814": "Washing machine - clothes",
	"821": "Hot tub, whirlpool, spa",
	"822": "Swimming pool equipment",
	"830": "Floor care equipment, other",
	"831": "Broom, electric",
	"832": "Carpet cleaning equipment, including rug shampooer",
	"833": "Floor buffer, waxer, cleaner",
	"834": "Vacuum cleaner",
	"841": "Comb, hair brush",
	"842": "Curling iron",
	"843": "Electrolysis equipment",
	"844": "Hair curler warmer",
	"845": "Hair dryer",
	"846": "Makeup mirror, lighted",
	"847": "Razor, shaver",
	"848": "Suntan equipment, sunlamp",
	"849": "Toothbrush",
	"850": "Portable appliance designed to produce heat, other",
	"851": "Baby bottle warmer",
	"852": "Blanket - electric",
	"853": "Heating pad",
	"854": "Clothes steamer",
	"855": "Clothes iron",
	"861": "Automatic door opener - not garage",
	"862": "Burglar alarm",
	"863": "Garage door opener",
	"864": "Gas detector",
	"865": "Intercom",
	"866": "Smoke or heat detector, fire alarm",
	"868": "Thermostat",
	"871": "Ashtray",
	"872": "Charcoal lighter, utility lighter",
	"873": "Cigarette lighter, pipe lighter",
	"874": "Fire-extinguishing equipment",
	"875": "Insect trap",
	"876": "Timer",
	"877": "Novelty lighter",
	"881": "Model vehicles.",
	"882": "Toy, powered",
	"883": "Woodburning kit",
	"891": "Clock",
	"892": "Gun",
	"893": "Jewelry-cleaning machine",
	"894": "Scissors",
	"895": "Sewing machine",
	"896": "Shoe polisher",
	"897": "Sterilizer, non-medical",
	"000": "Other equipment involved in ignition",
	"NNN": "None",
	"UUU": "Undetermined"
}

var equipmentPowerSource = {
	"1": "Electrical",
	"11": "Electrical line voltage (>=  50 volts)",
	"12": "Batteries and low voltage (< 50 volts)",
	"10": "Electrical, other",
	"2": "Gas Fuels",
	"21": "Natural gas or other lighter-than-air gas",
	"22": "LP gas or other heavier-than-air gas",
	"20": "Gas fuels, other",
	"3": "Liquid Fuels",
	"31": "Gasoline",
	"32": "Alcohol",
	"33": "Kerosene, diesel fuel, No.1 and 2 fuel oil",
	"34": "No.4, 5 & 6 fuel oils",
	"30": "Liquid fuel, other",
	"4": "Solid Fuels",
	"41": "Wood, paper",
	"42": "Coal, charcoal",
	"43": "Chemicals",
	"40": "Solid fuel, other",
	"5": "Other Power Sources",
	"51": "Compressed air",
	"52": "Steam",
	"53": "Water",
	"54": "Wind",
	"55": "Solar",
	"56": "Geothermal",
	"57": "Nuclear",
	"58": "Fluid/hydraulic power source",
	"00": "Power source, other",
	"UU": "Undetermined"
}

var equipmentPortability = {
	"1": "Portable.",
	"2": "Stationary."
}

var fireSuppresionFactors = {
	"1": "Building Construction or Design",
	"100": "Building construction or design, other",
	"112": "Roof collapse",
	"113": "Roof assembly combustible",
	"115": "Solar panels",
	"121": "Ceiling collapse",
	"125": "Holes or openings in walls or ceilings",
	"131": "Wall collapse",
	"132": "Difficult to ventilate",
	"134": "Combustible interior finish",
	"137": "Balloon construction",
	"138": "Internal arrangement of partitions",
	"139": "Internal arrangement of stock or contents",
	"141": "Floor collapse",
	"151": "Lack of fire barrier walls or doors",
	"153": "Transoms",
	"161": "Attic undivided",
	"166": "Insulation combustible",
	"173": "Stairwell not enclosed",
	"174": "Elevator shaft",
	"175": "Dumbwaiter",
	"176": "Ducts: vertical",
	"177": "Chute: rubbish, garbage, laundry",
	"181": "Supports unprotected",
	"182": "Composite plywood I-beam construction",
	"183": "Composite roof/floor sheathing construction",
	"185": "Wood truss construction",
	"186": "Metal truss construction",
	"187": "Fixed burglar protection assemblies (bars, grills on windows or doors)",
	"188": "Quick release failure of bars on windows or doors",
	"192": "Previously damaged by fire",
	"2": "Act or Omission",
	"200": "Act or omission, other",
	"213": "Doors left open or outside door unsecured",
	"214": "Fire doors blocked or did not close properly",
	"218": "Violation of fire, building or life safety code",
	"222": "Illegal and clandestine drug operation",
	"232": "Intoxication, drugs or alcohol",
	"253": "Riot or civil disturbance, including hostile acts",
	"254": "Person(s) interfered with operations",
	"283": "Accelerant used",
	"3": "On-site materials",
	"300": "On-site materials, other",
	"311": "Aisles blocked or improper width",
	"312": "Significant/unusual fuel load structure components",
	"313": "Significant/unusual fuel load from contents",
	"314": "Significant/unusual fuel load outside from natural",
	"315": "Significant/unusual fuel load from man-made condition.",
	"316": "Storage, improper",
	"321": "Radiological hazard onsite",
	"322": "Biological hazard onsite",
	"323": "Cryogenic hazard onsite",
	"324": "Hazardous chemical, corrosive material, or oxidizer",
	"325": "Flammable/combustible liquid hazard",
	"327": "Explosives hazard present",
	"331": "Decorations, included are crepe paper, garland",
	"341": "Natural or other lighter-than-air gas present",
	"342": "Liquefied Petroleum (LPG) gas present",
	"361": "Combustible storage > 12 feet",
	"362": "High rack storage",
	"4": "Delays",
	"400": "Delays, other",
	"411": "Delayed detection of fire",
	"412": "Delayed reporting of fire",
	"413": "Alarm system malfunction",
	"414": "Alarm system shut off for valid reason",
	"415": "Alarm system inappropriately shut off",
	"421": "Unable to contact fire department",
	"424": "Information incomplete or incorrect",
	"425": "Communications problem",
	"431": "Blocked  or obstructed roadway",
	"434": "Poor or no access for fire department apparatus",
	"435": "Traffic delay",
	"436": "Trouble finding location",
	"437": "Size, height, or other building characteristic",
	"438": "Power lines down/arcing",
	"443": "Poor access for firefighters",
	"444": "Secured area",
	"445": "Guard dogs",
	"446": "Aggressive animals, excluding guard dogs",
	"447": "Suppression delayed due to evaluation of HazMat",
	"448": "Locked or jammed doors",
	"451": "Apparatus failure before arrival at incident",
	"452": "Hydrants inoperative",
	"461": "Airspace restriction",
	"462": "Military activity",
	"481": "Closest apparatus unavailable",
	"5": "Protective Equipment",
	"500": "Protective equipment, other",
	"510": "Automatic fire suppression system problem.",
	"520": "Automatic sprinkler, standpipe connection problem",
	"531": "Water supply inadequate: private",
	"532": "Water supply inadequate: public",
	"543": "Electrical power outage",
	"561": "Failure of rated fire protection assembly",
	"562": "Protective equipment negated illegally or irresponsibly",
	"6": "Egress/Exit",
	"600": "Egress/exit problem, other",
	"611": "Occupancy load above legal limit",
	"612": "Evacuation activity impeded FD access",
	"613": "Window type impeded egress",
	"614": "Windowless wall",
	"621": "Young occupants",
	"622": "Elderly occupants",
	"623": "Physically disabled occupants",
	"624": "Mentally disabled occupants",
	"625": "Physically restrained/confined occupants",
	"626": "Medically disabled occupants",
	"641": "Special Event",
	"642": "Public Gathering",
	"7": "Natural Conditions",
	"700": "Natural conditions, other",
	"711": "Drought or low fuel moisture",
	"712": "Humidity, low",
	"713": "Humidity, high",
	"714": "Temperature, low",
	"715": "Temperature, high",
	"721": "Fog",
	"722": "Flooding",
	"723": "Ice",
	"724": "Rain",
	"725": "Snow",
	"732": "Wind, including hurricanes or tornadoes",
	"741": "Earthquake",
	"760": "Unusual vegetation fuel loading",
	"771": "Threatened or endangered species",
	"772": "Timber sale activity",
	"773": "Fire restriction",
	"774": "Historic disturbance",
	"775": "Urban-wildland interface area",
	"000": "Fire suppression factor, other",
	"NNN": "None",
	"UUU": "Undetermined (conversion only)"
}

var mobilePropertyInvolved = {
	"1": "Not involved in ignition, but burned",
	"2": "Involved in ignition, but did not itself burn",
	"3": "Involved in ignition and burned",
	"N": "None"
}

var mobilePropertyType = {
	"1": "Passenger Road Vehicles",
	"11": "Automobile, passenger car, ambulance, race car",
	"12": "Bus, school bus, trackless trolley",
	"13": "Off-road recreational vehicle",
	"14": "Motor home, camper, bookmobile.",
	"15": "Trailer - travel, designed to be towed",
	"16": "Trailer - camping, collapsible",
	"17": "Mobile home",
	"18": "Motorcycle, trail bike",
	"10": "Passenger or road vehicles, other",
	"2": "Freight Road Vehicles",
	"21": "General use truck, dump truck, fire apparatus",
	"22": "Pickup truck, hauling rig (non-motorized)",
	"23": "Trailer - semi, designed for freight",
	"24": "Tank truck - nonflammable cargo",
	"25": "Tank truck - flammable or combustible liquid",
	"26": "Tank truck - compressed gas or LP-gas",
	"27": "Garbage, waste, refuse truck",
	"20": "Freight road transport vehicle, other",
	"3": "Rail Transport Vehicles",
	"31": "Diner car, passenger car",
	"32": "Box, freight, or hopper car",
	"33": "Tank car",
	"34": "Container or piggyback car",
	"35": "Engine/locomotive",
	"36": "Rapid transit car, trolley - self-powered",
	"37": "Maintenance equipment car",
	"30": "Rail transport vehicle, other",
	"4": "Water Vessels",
	"41": "Boat less than 65 ft in length overall",
	"42": "Boat or ship >= 65 ft but < 1,000 tons.",
	"43": "Cruise liner or passenger ship >= 1,000 tons",
	"44": "Tank ship",
	"45": "Personal water craft",
	"46": "Cargo or military ship > 1,000 tons",
	"47": "Non-self-propelled vessel",
	"48": "Commercial fishing or processing vessel",
	"49": "Sailboats",
	"40": "Water transport vessel, other",
	"5": "Air transport vehicles",
	"51": "Personal aircraft less than 12,500 lb. gross wt.",
	"52": "Personal aircraft >= 12,500 lb. gross wt.",
	"53": "Commercial aircraft: propeller, fixed wing",
	"54": "Commercial aircraft: turbine powered, fixed-wing",
	"55": "Helicopters, nonmilitary",
	"56": "Military fixed-wing aircraft",
	"57": "Military non-fixed-wing aircraft",
	"58": "Balloon vehicles",
	"50": "Air transport vehicles, other",
	"6": "Industrial, agricultural, construction vehicles",
	"61": "Construction vehicle",
	"63": "Loader - industrial, fork lift, tow motor, stacker",
	"64": "Crane",
	"65": "Agricultural vehicle, baler, chopper (farm use)",
	"67": "Timber harvest vehicle",
	"60": "Industrial, construction, agricultural vehicles, other",
	"7": "Mobile Property, Miscellaneous",
	"71": "Home, garden vehicle",
	"73": "Shipping container, mechanically moved",
	"74": "Armored vehicle",
	"75": "Missile, rocket, space vehicle",
	"76": "Aerial tramway vehicle",
	"00": "Mobile property, other",
	"NN": "None",
	"UU": "Undetermined (conversion only)"
}

var mobilePropertyMake = {
	" AC": "Acura",
	"AG": "Agco",
	"AR": "Alfa Romeo",
	"AL": "Allis Chalmers",
	"AV": "Antique Vehicle",
	"AN": "Ariens",
	"AM": "Aston Martin",
	"AT": "ATK",
	"AU": "Audi",
	"AY": "Avery",
	"BS": "Belarus",
	"BE": "Beta",
	"BM": "BMW",
	"BO": "Bobcat",
	"BR": "Briggs",
	"BL": "Buell",
	"BU": "Buick",
	"CD": "Cadillac",
	"CA": "Case",
	"CB": "Case - David Brown",
	"CI": "Case IH",
	"CP": "Caterpillar",
	"CE": "Century",
	"CH": "Chevrolet",
	"CR": "Chrysler",
	"CV": "Classic Vehicle",
	"CO": "Continental",
	"CC": "Crane Carrier (CCC)",
	"CU": "Cub Cadet",
	"DA": "Daihatsu",
	"DE": "Demco",
	"DR": "Diamond Reo",
	"DI": "Dixon",
	"DO": "Dodge",
	"DU": "Ducati",
	"DT": "Duetz",
	"DS": "Duetz-Allis",
	"DF": "Duetz-Fahr",
	"ER": "Eager",
	"EA": "Eagle",
	"EU": "Euclid",
	"FK": "Farm King",
	"FA": "Farmall",
	"FM": "Farmtrac",
	"FE": "Ferrari",
	"FT": "Fetrel",
	"FO": "Ford",
	"FR": "Freightliner",
	"FG": "Frigstad",
	"FW": "FWD",
	"GH": "Gehl",
	"GE": "Geo",
	"GI": "Giehl",
	"GL": "Gleaner",
	"GM": "GMC (General Motors)",
	"GV": "GVM",
	"HD": "Harley Davidson",
	"HV": "Harvester",
	"HB": "Haybuster",
	"HE": "Hesston",
	"HI": "Hino",
	"HO": "Honda",
	"HG": "Hough",
	"HS": "Husky",
	"HU": "Husqverna",
	"HX": "Hydrax",
	"HY": "Hyundai",
	"IF": "Infiniti",
	"IN": "International",
	"IL": "International Farmall",
	"IH": "International Harvester",
	"IS": "Isuzu",
	"IT": "Italjet",
	"IV": "Iveco",
	"JA": "Jaguar",
	"JE": "Jeep",
	"JD": "John Deere",
	"KA": "Kawasaki",
	"KE": "Kenworth",
	"KI": "Kia",
	"KZ": "Kinze",
	"KO": "Kioti",
	"KN": "Knight",
	"KM": "Komatsu",
	"KR": "Krause",
	"KT": "KTM",
	"KU": "Kubota",
	"LC": "Land Chief",
	"LR": "Land Rover",
	"LT": "Landtrac",
	"LE": "Lexus",
	"LI": "Lincoln",
	"LN": "Long",
	"LO": "Lotus",
	"MN": "MacDon",
	"MK": "Mack",
	"ML": "Maely",
	"MI": "Mahindra",
	"MA": "Maico",
	"MH": "Marmon",
	"MS": "Maserati",
	"MY": "Massey Ferguson",
	"MV": "Massey Harris-Ferguson",
	"MZ": "Mazda",
	"MJ": "McKee",
	"ME": "Melroe",
	"MB": "Mercedes Benz",
	"MC": "Mercury",
	"MR": "Merkur",
	"MF": "MHF",
	"MT": "Mitsubishi",
	"MO": "Montesa",
	"MW": "Montgomery Ward",
	"MG": "Moto Guzzi",
	"MM": "Moto Morini",
	"MD": "MTD",
	"MU": "Murray",
	"NA": "Navistar",
	"NH": "New Holland",
	"NE": "New Idea",
	"NI": "Nissan",
	"OL": "Oldsmobile",
	"OV": "Oliver",
	"OS": "Oshkosh",
	"OW": "Owatona",
	"PT": "Peterbilt",
	"PU": "Peugeot",
	"PI": "Pierce",
	"PL": "Plymouth",
	"PN": "Pontiac",
	"PR": "Porsche",
	"RN": "Range Rover",
	"RD": "Red Devil",
	"RG": "Rogue (Ottowa)",
	"RR": "Rolls Royce",
	"SB": "Saab",
	"SA": "Saturn",
	"SG": "Scagg",
	"SC": "Scania",
	"SE": "Sears Craftsman",
	"SD": "Simon Duplex",
	"SI": "Simplicity",
	"SN": "Snapper",
	"SR": "Steiger",
	"ST": "Sterling",
	"SU": "Subaru",
	"SZ": "Suzuki",
	"TT": "Toro",
	"TO": "Toyota",
	"TL": "Trelan",
	"TR": "Triumph",
	"TJ": "Trojan",
	"TB": "Troy-Bilt",
	"UD": "UD",
	"UR": "Ursus",
	"UT": "Utilmaster",
	"VR": "Vermeer",
	"VS": "Versatile",
	"VE": "Vespa",
	"VO": "Volkswagen",
	"VL": "Volvo",
	"VG": "Volvo GMC",
	"WK": "Walker",
	"WL": "Walter",
	"WS": "Western Star",
	"WW": "Westward",
	"WH": "White",
	"WG": "White GMC",
	"WD": "Woods",
	"YA": "Yamaha",
	"YM": "Yardman",
	"YU": "Yugo",
	"ZT": "Zetor",
	"OO": "Other Make"
}
