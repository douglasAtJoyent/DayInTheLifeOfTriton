
// Seeding the company name array
var companyNames = [];
const fs = require('fs');
var companyNames = JSON.parse(fs.readFileSync('companyNames.json', 'utf8'));

// Seeding the name array
var personNames = [];
var personNames = JSON.parse(fs.readFileSync('names.json', 'utf8'));

var config;
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

var count = config.numberOfCompanies;
var distribuition = config.distribution;
console.log(count);

function chooseInRange(min, max) {
	var span = max - min;
	var choice = Math.floor(Math.random() * 100);
	return Math.round(span * (choice / 100)) + min;
}

var useObj;
var dist = new Array();
sum = 0;
for (i = 0; i < distribuition.length; i++) {
	sum += distribuition[i].percentage;
	dist.push(sum);
}

const Admin = require('./Admin');


// Helper function to generate admin data, just want to declutter some of the inner code 
function generateAdminData(companyName) { 
	//login,email,tenant,company,password,first,last
	var fnChoice = Math.floor(Math.random() * personNames.length);
	var first = personNames[fnChoice];
	var lnChoice = Math.floor(Math.random() * personNames.length);
	var last = personNames[lnChoice];
	return new Admin(first,last,companyName);
}


// So for each of the companies we are going to figure out which distribution
// that we are going to have
for (i = 0; i < count; i++) {
	var choice = Math.floor(Math.random() * 100);
	var choosen;
	for (j = 0; j < dist.length; j++) {
		if (dist[j] > choice) {
			choosen = distribuition[j];
			j = 100;
		}
	}
	console.log(choosen);
	var companyName = companyNames[i];
	console.log("Creating admin for " + companyName);
	//login,email,tenant,company,password,first,last
	// We need to create the admin, and then create sub-users according to the distribution
	var admin = generateAdminData(companyName);
	
	admin.createUser(config.user,config.headnode);
	admin.uploadKey(config.user,config.headnode);
	admin.assignKey(config.user,config.headnode);
	
	console.log("Creating Users: "
			+ chooseInRange(choosen.userMin, choosen.userMax));
	var numberOfUsers = chooseInRange(choosen.userMin, choosen.userMax);
	for(i = 0;i < numberOfUsers;i++) { 
		var fnChoice = Math.floor(Math.random() * personNames.length);
		var first = personNames[fnChoice];
		var lnChoice = Math.floor(Math.random() * personNames.length);
		var last = personNames[lnChoice];
		admin.createSubUser(first,last);
	}
	
	for(i = 0;i < choosen.machines.length;i++) {
		var result = admin.createMachine(choosen.machines[i]); 
		buffer = admin.login + "," + result.id + "\n";
	}
	console.log("*************************************");
	console.log("Adding line : " + buffer);
	console.log("*************************************");	
	fs.appendFile(config.outputfile, buffer);
}
