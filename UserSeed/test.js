//var SSH = require('simple-ssh');
// 
//var ssh = new SSH({
//    host: '10.88.88.200',
//    user: 'root',
//    pass: 'rootpass'
//});
 
//ssh.exec('/opt/smartdc/bin/sdc-useradm get Bev.Ronna approved_for_provisioning true', {
//    out: function(stdout) {
//        console.log(stdout);
//    },
//    err: function(err) { 
//    	console.log(err);
//    }
//    
//}).start();

//
//process.env['TEST'] = 'value1234';
//var addSDCCommand = "echo $TEST";
//var exec = require('child_process').execSync
//var assignKeyOutput = exec(addSDCCommand).toString();
//console.log(assignKeyOutput);

//var client = require('scp2')
//
//client.scp('temp.txt', {
//    host: '10.88.88.200',
//    username: 'root',
//    password: 'rootpass',
//    path: '/root/temp.txt'
//}, function(err) {console.log(err);})

// Constructor
//function Foo(bar) {
//  // always initialize all instance properties
//  this.bar = bar;
//  this.baz = 'baz'; // default value
//}
//// class methods
//Foo.prototype.fooBar = function() {
//	console.log("Trying this out : " + this.bar + this.baz);
//};

// export the class
//module.exports = Foo;
//
//var object = new Foo('Hello');
//object.fooBar();
//

////Constructor 
//function Admin(login,email,tenant,company,password,first,last) { 
//	this.login = login;
//	this.email = email;
//	this.tenant = tenant;
//	this.company = company;
//	this.password = password;
//	this.first = first;
//	this.last = last;
//	this.companyReplace = company.replace(' ', '');
//		
//	this.createCommand = "/opt/smartdc/bin/sdc-useradm create " + "login=" + this.login + " "
//	+ "email=" + this.email + " " 
//	+ "tenant=" + this.companyReplace + " "
//	+ "company=" + this.companyReplace + " " 
//	+ "userpassword=" + this.password + " " 
//	+ "name=" + this.first + " " 
//	+ "surName=" + this.last + " "
//	+ "approved_for_provisioning=true registered_developer=true";
//}
//
//Admin.prototype.createUser = function(user,address) { 
//	var simpleCommand = "ssh " + user + "@" + address + " '" + this.createCommand + "'"; 
//	var exec = require('child_process').execSync
//	var assignKeyOutput = exec(simpleCommand).toString();
//    console.log(assignKeyOutput);	
//}
//
//Admin.prototype.uploadKey = function(user,address) {
//	// Generate Key
//	var file_name = this.first + "." + this.last + "_" + this.companyReplace;
//	this.keyfile = "/Users/DouglasAnderson/.ssh/" + file_name + ".id_rsa";
//	this.keyfilePublic = "/Users/DouglasAnderson/.ssh/" + file_name + ".id_rsa.pub";
//	var keyGenCommand = "/usr/bin/ssh-keygen -t rsa -f " + this.keyfile + " -b 2048 -N \"\"";
//	console.log(keyGenCommand);
//	var exec = require('child_process').execSync
//	var assignKeyOutput = exec(keyGenCommand).toString();
//    console.log("Key Gen : " + assignKeyOutput);
//	
//	var simpleCommand = "scp " + this.keyfilePublic + " " +  user + "@" + address + ":/root";
//	console.log(simpleCommand);
//	var exec = require('child_process').execSync
//	var assignKeyOutput = exec(simpleCommand).toString();
//    console.log("SCP Result : " + assignKeyOutput);
//    this.remoteFile = "/root/" + file_name + ".id_rsa.pub";
//}
//
//Admin.prototype.assignKey = function(user,address) { 
//	var addKey = "/opt/smartdc/bin/sdc-useradm add-key " + this.login + " " + this.remoteFile;
//    assignCommand = "ssh " + user + "@" + address + " '" + addKey + "'"; 
//    console.log(assignCommand);
//	var exec = require('child_process').execSync
//	var assignKeyOutput = exec(assignCommand).toString();
//    console.log(assignKeyOutput);	
//}
//
//// This will set the env to this admin and do a sdc-user list
//Admin.prototype.listMyUsers = function() {
//	
//	var keyIdCommnand = "/usr/bin/ssh-keygen -l -f " + this.keyfilePublic + " | awk '{print $2}' | tr -d '\n' ";
//	console.log(keyIdCommnand);
//	var exec = require('child_process').execSync
//	var sshOutput = exec(keyIdCommnand).toString();
//	
//	console.log("SSH OUTPUT: " + sshOutput);
//	process.env['SDC_ACCOUNT'] = this.login;
//	process.env['SDC_KEY_ID'] = sshOutput;
//	console.log(process.env['SDC_ACCOUNT']);
//	console.log(process.env['SDC_KEY_ID']);
//	
//	var listMyUsers = "/usr/local/bin/sdc-user list";	
//	var exec = require('child_process').execSync
//	var sshOutput = exec(listMyUsers).toString();
//	console.log(sshOutput);
//
//}
//
//Admin.prototype.crteateSubUser = function() {
//	// This will create a sub user
//}
//
//module.exports = Admin;
const Admin = require('./Admin');
var companyAdmim = new Admin("","","","");
//companyAdmim.createUser("root","10.88.88.200");
//companyAdmim.uploadKey("root","10.88.88.200");
//companyAdmim.assignKey("root","10.88.88.200");
//companyAdmim.listMyUsers();
companyAdmim.createSubUser('First','Last');


//var companyAdmim = new Admin("myTest5","Test5@codingVole.com","MYTest5","MYTest5","123Secret","TestUser5","NumberMany5");
//companyAdmim.createUser("root","10.88.88.200");
//companyAdmim.uploadKey("root","10.88.88.200");
//companyAdmim.assignKey("root","10.88.88.200");
//companyAdmim.listMyUsers();
//	var simpleCommand = "ssh root@10.88.88.200 'ls -l'";
//	var exec = require('child_process').execSync
//	var assignKeyOutput = exec(simpleCommand).toString();
//    console.log(assignKeyOutput);
//    
//    var simpleSCP = "scp mytest.txt root@10.88.88.200:/root";
//    var exec = require('child_process').execSync
//	  var assignKeyOutput = exec(simpleSCP).toString();
//    console.log(assignKeyOutput);
//    
    
//var fs = require("fs");
//
//console.log("Going to write into existing file");
//fs.writeFile('input.txt', 'ls -l',  function(err) {
//   if (err) {
//      return console.error(err);
//   }
//   console.log("Data written successfully!");
//   console.log("Let's read newly written data");
//   
//   
//});



