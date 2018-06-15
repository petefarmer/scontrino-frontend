<?php
$servername = "35.233.28.84";
$username ="pete";
$password ="foobar";
$dbname ="scontrino";

$action = $_GET['action'];

if ($action == 'get') {
  get();
}elseif($action == 'edit') {
  edit();
}
// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if($conn->connect_error) {
die("Connection failed: ". $conn->connect_error);
}

$sql ="SELECT id, name, address, filename, ocr_text FROM inbox";
$result = $conn->query($sql);
$results = array();

if($result->num_rows >0) {
// output data of each row
  while($row = $result->fetch_assoc()) {
	$results[] = $row;
  }
  echo json_encode($results);
}
$conn->close();
/*
function get() {
  $conn = mysqli_connect($servername, $username, $password, $dbname);
  if($conn->connect_error) {
  	die("Connection failed: ". $conn->connect_error);
  }
  $query = "SELECT * FROM inbox";
  $results = array();

  if ($result = $conn->query($query)) {
    while ($row = $result->fetch_assoc()) {
      $results[] = $row;
    }
   $result->free();
  }
  echo json_encode($results);
  $conn->close();
} 
 */
function edit() {
  $mysqli = new mysqli($servername, $username, $password, $dbname);
  switch($_POST['oper']) {
    case "add":
    // need to constrain form to correct datatypes
      $query = "INSERT INTO inbox VALUES ('', '$_POST[name]', '$_POST[address]', '$_POST[filename]', '$_POST[ocr_text]')";
      $mysqli->query($query);
      break;
    case "edit":
      break;
    case "del":
      break;
  }
    
}

?>
