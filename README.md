# DayInTheLifeOfTriton
This is a test for the Triton that tries to emulate a day in the life of Triton. Basically a set of actions in proportion

Introduction: 
  This set of software is to test Joyent's Triton solution in a simulated day in the life of. This uses a set of APIs that will exercise components.
  
 This is setup in two distinct phases. The inital phase will create a set of tenant's and users as well as add machines to propagate an intial state. The second phase uses the data created in the initial state to exercise the code.
 
It is worthwhile noting that this was developed on a Mac, and I am pretty sure that it will run on a similar system like Liunux I am sure this will not work cross platform on a windows machine.

<h3> Stage 1 : Inital State Setup </h3> 
<ol>
  <li> First you need to add an ssh key to the headnode in the .ssh folder of the user that you are using. Just take the public key and append it to the authorized key file in the .ssh directory. This will allow a person to ssh into the headnode without the use of a password. This was not the best way of doing this, but I ran into some problems with asyncronous calls in node packages.
  </li>
  
  <li> Setup configuration 
  Sample configuration:  <br />
   <code>
   {
  
     	 "numberOfCompanies": 2,
	 "distribution": [
		    {
			"userMin": 1,
			"userMax": 1,
			"percentage": 100,
			"machines":[ 
				    {
			    	    "image":"70e3ae72-96b6-11e6-9056-9737fd4d0764",
			            "package":"8c0e3769-c5b0-c363-f1cf-c11c7f66bb44"
			      }		    
			  ]		
		  }
	  ],
	  "headnode": "10.88.88.200",
	  "user": "root",
	  "outputfile":"users.csv"
  }
  </code>
 So to quickly go over this, I wanted to create a tool that can create a pool of companies of different sizes. 
 <table>
 <tr> <th> Name </th> <th> type </th> <th> Description </th> </tr> 
    <tr>
    <td> numberOfCompanies </td>
  	  <td> int  </td>
 	   <td>  The number of companies that will be produced in this run </td>
    </tr>
    <tr>
	 <td> distribution </td>
   	 <td> array[objects] </td>
	 <td> </td> 
    </tr>
   <tr> 
      <td>userMin:</td>
      <td> int </td>
      <td> The minuium number of users for the compnay, 1 should be the lowest one puts, there is no validation of this.</td>
   </tr>
   <tr> 
      <td>userMax</td>
      <td> int </td>
      <td> The maximum number of users for the compnay, there is no upper limit</td>
   </tr>
   <tr> 
      <td>userMax</td>
      <td> int </td>
      <td> The maximum number of users for the compnay, there is no upper limit 
           (Note when these are created a number of users within the range [userMax,userMin] will be choosen.
      </td>
   </tr>
   <tr>
      <td>percentage</td>
      <td> int </td>
      <td> This will be roughly the percentage of companies that will follow this specification. Within all elements this should sum to 100. If you give numbers whose sum is less than 100, there is a chance that one or more of the companies will not be created. If you give numbers that are over 100, those models that exceed the 100% threshold will never be choosen. The internal mechanism is random for choosing these percentages, so there may be things that looked skewed in a smaller samples.
      </td>
  </tr>
  <tr>
      <td>machines</td>
      <td> array[objects] </td>
      <td> This is a set of machines that will be created as part of the initial state. The imageId and packageId for these should be looked up. In the future I may have this as just names, but for right now they are ids. 
      </td>
      </tr>
      <tr>
      <td>headnode</td>
      <td> String </td>
      <td> The address of the headnode, this is used for issuing remote commands.
      </td>
      <tr>
      <tr>
       <td>user</td>
      <td> String </td>
      <td>  The valid username of the user on the headnode </td>
     <tr>
     <tr>
       <td>outputfile</td>
      <td> String </td>
      <td>  The name of the file in which the script will output to. This will be used as an input to the JMeter script
    </td>
     <tr>
     </table>
   </li>
 </ol>
  
  <h3>  Stage 2 : Testing </h3>
<ol> 
<li> Open JMeter. </li>
<li> open the DayInTheLifeOf.jmx </li>
<li> At the top level node "A Day in the Life of Triton", set these variables: 
        <table> 
	   <tr> 
	   	<td> host </td>
	   	<td> 10.88.88.5 </td>
	   	<td> </td>
	   </tr>
	   <tr> 
	   	<td> port </td>
	   	<td> 443 </td>
	   	<td> </td>
	   </tr>
	   <tr> 
	   	<td> scriptlocation </td>
	   	<td> /Users/DouglasAnderson/repo/DayInTheLifeOfTriton/gen_key.sh </td>
	   	<td>This will be a path to the gen_key.sh  in this repo. </td>
	   </tr>
	</table> 
	
Where host/port is the endpoint for your Triton, and the script location is the location of the gen_key3.sh script that is in
this repo. 
</li>
<li>  Verify that the Users Data Set node is pointing at the correct CSV file.</li>
<li>  Change the thread information at the top level thread (Day in the life of Thread) to 1 thread, 1 user, and click the run icon
in the menu bar. Then lok at the View Results Tree and verify that the simple test has ran successfully. If it has simply
configure the node to your tests parameters, and save the file. If it has not you should diagnose the problem (TODO: Add
diagnostic steps). </li>

<li>  Close JMeter GUI.</li>

<li>  Run the command: </li>

<br />

<code>
jmeter.sh -n -t testcases/DayInTheLifeOf.jmx -l DayInTheLifeOf`date +%h%m_%H_%M`.log  -e -o ./output/`date +%h%m_%H_%M`
</code>
<br />
 This will create a directory in the output directory with date and time e.g. 
<br />

<table> 
   <tr>
     <td>
        joyentmac2202:JMeter DouglasAnderson$ ll output/<br />
	total 0<br />
	drwxr-xr-x  6 DouglasAnderson  staff  204 Apr 26 14:16 Apr04_14_16<br />
	joyentmac2202:JMeter DouglasAnderson$ <br />
	</td>
	</tr>
  </table>
<br />
<li> After the script is done running check the Output directory. You should have report ready. It is a HTML report so one would probably want to open index.html in a web browser </li>


     
 
