<?php

require_once("API.php");
$api = new API();
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$data = $api->add_person($_POST['data']);
echo json_encode($data);