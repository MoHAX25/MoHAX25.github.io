<?php
require_once("API.php");
$api = new API();
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$id = $_POST['id'];
$del_ava = $api->del_ava($id);
var_dump($del_ava);