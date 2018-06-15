<?php


$mysqli = new mysqli("localhost", "arden", "arden", "SIRSDB");

$query = "SELECT DISTINCT(IDPatient) FROM sirsvalues2";

$results = array();

if ($result = $mysqli->query($query)) {

  /* fetch associative array */
  $menu = "<select id=\"patientMenu\">";
  while ($row = $result->fetch_assoc()) {
    $menu .= "<option value=" . $row[IDPatient]. ">" . $row[IDPatient] . "</option>";
  }
  $menu .= "</select>";

  /* free result set */
    $result->free();
}

/* print json object*/
echo $menu;

/* close connection */
$mysqli->close();


?>
