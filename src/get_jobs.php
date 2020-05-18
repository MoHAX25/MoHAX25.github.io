<?php
require_once("API.php");
$api = new API();
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$data = $api->get_jobs();
echo json_encode($data);