<?
include('../lib/httpful.phar');

$uri = "https://www.googleapis.com/freebase/v1/mqlread?query=%7B%22type%22:%22/music/artist%22%2C%22name%22:%22The%20Dead%20Weather%22%2C%22album%22:%5B%5D%7D";
$response = \Httpful\Request::get($uri)->send();
 
 echo 'The Dead Weather has ' . count($response->body->result->album) . " albums.\n";
?>
