<?
include('../lib/httpful.phar');


$uri = 'http://nexpa.local:8080/REST/CALLMLM?mlmName=SIRS-Notification1&mlmInstitution=Medexter Healthcare, Vienna, Austria';
#$uri = 'http://localhost:8080/REST/CALLMLM?mlmName=SIRS-Notification1&mlmInstitution=Medexter Healthcare, Vienna, Austria';

$response = \Httpful\Request::post($uri)
  ->expectsJson()
  ->authenticateWith('admin','s3cret')
  ->addHeaders(array(
    'Authorization' => 'Basic YWRtaW46czNjcmV0',
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Access-Control-Allow-Origin' => '*',
    'Access-Control-Allow-Methods' => 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers' => 'Origin, Content-Type, X-Auth-Token'
  ))
  ->body('{ "type": "number", "applicability": 1, "value": 0 }')
  ->send();

  echo $response;
?>
