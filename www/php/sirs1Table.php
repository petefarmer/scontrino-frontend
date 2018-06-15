<?php

$action = $_GET['action'];

if ($action == 'get') {
  get();
}elseif($action == 'edit') {
  edit();
}

function get() {
  $mysqli = new mysqli("localhost", "arden", "arden", "SIRSDB");
  $query = "SELECT * FROM sirsvalues";
  $results = array();

  if ($result = $mysqli->query($query)) {
    while ($row = $result->fetch_assoc()) {
      $results[] = $row;
    }
  $result->free();
  }
  echo json_encode($results);
  $mysqli->close();
} 

function edit() {
  $conn = mysqli_connect("localhost", "arden", "arden", "SIRSDB");
  switch($_POST['oper']) {
    case "add":
      $query = "INSERT INTO sirsvalues VALUES (NULL,'$_POST[IDPatient]','$_POST[temperature]', '$_POST[heartRate]', '$_POST[respRate]', '$_POST[PaCO2]', '$_POST[WBcellCount]', '$_POST[immatureBand]')";
      mysqli_query($conn,$query) or die(mysql_error());;
      break;
    case "edit":
      $query = "UPDATE sirsvalues SET temperature = '$_POST[temperature]', heartRate = '$_POST[heartRate]', respRate = '$_POST[respRate]', PaCO2 = '$_POST[PaCO2]', WBcellCount = '$_POST[WBcellCount]', immatureBand = '$_POST[immatureBand]' WHERE id='$_POST[id]'";
      echo $query;
      mysqli_query($conn,$query) or die(mysql_error());;
      break;
    case "del":
      $query = "DELETE FROM sirsvalues WHERE id = '$_POST[id]'";
      mysqli_query($conn,$query) or die(mysql_error());;
      break;
  }
  mysqli_close($conn);
}


?>
