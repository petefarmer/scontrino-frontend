<?php
#$servername = "scontrino-194211.europe-west1";
$servername = "35.233.28.84";
$username ="pete";
$password ="foobar";
$dbname ="scontrino";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if($conn->connect_error) {
die("Connection failed: ". $conn->connect_error);
}

$sql ="SELECT id, name, address, filename, ocr_text FROM inbox";
$result = $conn->query($sql);

if($result->num_rows >0) {
// output data of each row
while($row = $result->fetch_assoc()) {
echo"id: ". $row["id"].$row["name"]." ".$row["address"]." - filname: ". $row["filename"]." ". $row["ocr_text"]."<br>";
 }
}else{
echo"0 results";
}
$conn->close();
?>
