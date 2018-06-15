<?php


$action = $_GET['action'];

if ($action == 'get') {
  get();
}elseif($action == 'edit') {
  edit();
}

function get() {
  $mysqli = new mysqli("localhost", "arden", "arden", "precept");
  $query = "SELECT * FROM drg";
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
  $mysqli = new mysqli("localhost", "arden", "arden", "precept");
  switch($_POST['oper']) {
    case "add":
    // need to constrain form to correct datatypes
      $query = "INSERT INTO drg VALUES ('', '$_POST[ms_drg]', '$_POST[fy_2010_post_acute]', '$_POST[fy_2010_special_pay]', '$_POST[mdc]', '$_POST[type]', '$_POST[title]', '$_POST[weights]', '$_POST[geometric_mean_los]', '$_POST[arithmetric_mean_los]')";
      $mysqli->query($query);
      break;
    case "edit":
      break;
    case "del":
      break;
  }
    
}


?>
