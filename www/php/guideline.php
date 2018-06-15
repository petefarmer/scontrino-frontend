<!DOCTYPE HTML>

<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>CDS: TEST</title>
</head>

<body>

<div id="container">
<?php

	$action=$_REQUEST['action'];

	if ($action=="")    /* display input form */
    {
		?>
		<center>
		<form  action="" method="POST" enctype="multipart/form-data">
			<input type="hidden" name="action" value="submit">
			Name:<br>
			<input name="value" type="text" value="" size="30"/><br>
			DOB:<br>
			<input name="dob" type="text" value="" size="30"/><br>
			<input type="submit" value="Send request"/>
		</form>
		</center>
		<?php
    } 
	else                /* send the submitted data */
    {
		$DEBUG=false;
		$value=$_REQUEST['value'];
		$dob=$_REQUEST['dob'];
		// session_start();
			 
		$json_req = "{\"type\":\"list\", \"values\":[";
		$json_req = $json_req . "{\"type\":\"string\", \"value\":\"".$value."\"},";
		$json_req = $json_req . "{\"type\":\"time\", \"value\":\"".$dob."\"}";
		$json_req = $json_req . "]}";

		//$uri = "http://ardenserver.medexter.com/rest/REST/myresource/CALLMLM/?mlmName=testArdenServer&mlmInstitution=Medexter Healthcare GmbH, Vienna, Austria";
		$uri = "http://student:student@ardenserver.medexter.com/rest/REST/myresource/CALLMLM/?mlmName=agecalc&mlmInstitution=Medexter Healthcare GmbH";

		if ($DEBUG) {
		echo "<center><h2>Arden Syntax server URI:</h2></center>";
		echo "REQUEST: ".$uri;
		}

		if ($DEBUG) {
		echo "<center><h2>Arden Syntax server request (JSON):</h2></center>";
		echo "REQUEST: ".$json_req;
		}
		
		$uri = str_replace ( ' ', '%20', $uri );

		$ch = curl_init($uri);
	      
		curl_setopt($ch, CURLOPT_ENCODING, "UTF-8");
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                                                                             
		curl_setopt($ch, CURLOPT_POSTFIELDS, $json_req);                                                                  
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);    // return data/not display                                    
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(    
			'Accept: application/json',                                                                      
			'Content-Type: application/json',                                                                                
			'Content-Length: ' . strlen($json_req))                                                                       
		);                                                                                                               
	
	
		$result = curl_exec($ch);
	
	
		curl_close($ch);

		
		// decode joson answer
		$json_result = json_decode($result);
			

		echo "<center><h2>Arden Syntax server answer:</h2></center>";
		
		if($json_result->type == "string"){
			echo "<center>".$json_result->value."</center><br><br><br>";
		}

		if ($DEBUG) {
		echo "<center><h2>Arden Syntax server answer (JSON):</h2></center>";
		var_dump($json_result);
		}
	}
	?>	
	
</div>
</body>
</html>
