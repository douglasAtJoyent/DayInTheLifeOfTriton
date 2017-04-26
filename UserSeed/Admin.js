//Constructor 
function Admin(first, last, company) {
	this.tenant = company;
	this.company = company;
	this.password = "123Secret";
	this.first = first;
	this.last = last;

	this.companyReplace = company.replace(' ', '');
	this.email = first + "." + last + "@" + this.companyReplace + ".com";
	this.login = this.companyReplace;

	this.login = this.login;
	this.keyfile = "/Users/DouglasAnderson/.ssh/" + this.login + ".id_rsa";
	this.keyfilePublic = "/Users/DouglasAnderson/.ssh/" + this.login
			+ ".id_rsa.pub";

	this.createCommand = "/opt/smartdc/bin/sdc-useradm create " + "login="
			+ this.login + " " + "email=" + this.email + " " + "tenant="
			+ this.companyReplace + " " + "company=" + this.companyReplace
			+ " " + "userpassword=" + this.password + " " + "name="
			+ this.first + " " + "surName=" + this.last + " "
			+ "approved_for_provisioning=true registered_developer=true";
}

Admin.prototype.createUser = function(user, address) {
	var simpleCommand = "ssh " + user + "@" + address + " '"
			+ this.createCommand + "'";
	var exec = require('child_process').execSync
	var assignKeyOutput = exec(simpleCommand).toString();
	console.log(assignKeyOutput);
}

Admin.prototype.uploadKey = function(user, address) {
	// Generate Key
	var keyGenCommand = "/usr/bin/ssh-keygen -t rsa -f " + this.keyfile
			+ " -b 2048 -N \"\"";
	console.log(keyGenCommand);
	var exec = require('child_process').execSync

	var assignKeyOutput = exec(keyGenCommand).toString();
	console.log("Key Gen : " + assignKeyOutput);

	var simpleCommand = "scp " + this.keyfilePublic + " " + user + "@"
			+ address + ":/root";
	console.log(simpleCommand);
	var exec = require('child_process').execSync
	var assignKeyOutput = exec(simpleCommand).toString();
	console.log("SCP Result : " + assignKeyOutput);
	this.remoteFile = "/root/" + this.login + ".id_rsa.pub";
}

Admin.prototype.assignKey = function(user, address) {
	var addKey = "/opt/smartdc/bin/sdc-useradm add-key --name=" + this.companyReplace + " "  + this.login + " "
			+ this.remoteFile;
	assignCommand = "ssh " + user + "@" + address + " '" + addKey + "'";
	console.log(assignCommand);
	var exec = require('child_process').execSync
	var assignKeyOutput = exec(assignCommand).toString();
	console.log(assignKeyOutput);
}

// This will set the env to this admin and do a sdc-user list
Admin.prototype.listMyUsers = function() {
	console.log("Setting enviroment");
	var keyIdCommnand = "/usr/bin/ssh-keygen -l -f " + this.keyfilePublic
			+ " | awk '{print $2}' | tr -d '\n' ";
	var exec = require('child_process').execSync
	var sshOutput = exec(keyIdCommnand).toString();
	console.log("SSH OUTPUT : " + sshOutput);
	process.env['SDC_ACCOUNT'] = this.login;
	process.env['SDC_KEY_ID'] = sshOutput;

	var listMyUsers = "/usr/local/bin/sdc-user list";
	var exec = require('child_process').execSync
	var sshOutput = exec(listMyUsers).toString();
	console.log(sshOutput);

}

Admin.prototype.createMachine = function(machineInfo) {
	console.log("Setting enviroment");
	var keyIdCommnand = "/usr/bin/ssh-keygen -l -f " + this.keyfilePublic
			+ " | awk '{print $2}' | tr -d '\n' ";
	var exec = require('child_process').execSync
	var sshOutput = exec(keyIdCommnand).toString();
	console.log("SSH OUTPUT : " + sshOutput);
	process.env['SDC_ACCOUNT'] = this.login;
	process.env['SDC_KEY_ID'] = sshOutput;

	var createMachine = "/usr/local/bin/sdc-createmachine --image=" + machineInfo.image + " --package=" + machineInfo.package;
	var exec = require('child_process').execSync
	var machineOutput = exec(createMachine).toString();
	console.log(machineOutput);
	return JSON.parse(machineOutput);
}

Admin.prototype.createSubUser = function(first, last) {
	// Setting the env
	var keyIdCommnand = "/usr/bin/ssh-keygen -l -f " + this.keyfilePublic
			+ " | awk '{print $2}' | tr -d '\n' ";
	var exec = require('child_process').execSync
	var sshOutput = exec(keyIdCommnand).toString();

	process.env['SDC_ACCOUNT'] = this.login;
	process.env['SDC_KEY_ID'] = sshOutput;

	email = first + "." + last + "@" + this.companyReplace + ".com";
	login = first + "." + last;
	password = "123secret";

	var createSubUserCommand = "sdc-user create --login=" + login + " --email="
			+ email + " --password=" + password + " --company=" + this.company
			+ " --name=" + first + " --surname=" + last + " ";

	var exec = require('child_process').execSync
	var userObj = exec(createSubUserCommand).toString();
	userObj = JSON.parse(userObj);
	console.log(userObj.id);
	console.log(userObj);

	
	console.log("FILE NAME: " + login);
	var childKeyfile = "/Users/DouglasAnderson/.ssh/" + login + ".id_rsa";
	var childKeyfilePublic = "/Users/DouglasAnderson/.ssh/" + login
			+ ".id_rsa.pub";
	var keyGenCommand = "/usr/bin/ssh-keygen -t rsa -f " + childKeyfile
			+ " -b 2048 -N \"\"";
	console.log(keyGenCommand);
	var exec = require('child_process').execSync
	var assignKeyOutput = exec(keyGenCommand).toString();
	console.log("Key Gen : " + assignKeyOutput);
	// sdc-user upload-key [OPTIONS] user_id public_ssh_key
	var addUserKey = "sdc-user upload-key " + userObj.id + " "
			+ childKeyfilePublic;
	var exec = require('child_process').execSync
	var assignKeyOutput = exec(addUserKey).toString();
	console.log("Key Gen : " + assignKeyOutput);
}

module.exports = Admin;
