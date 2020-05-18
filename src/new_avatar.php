<?php
require_once("API.php");
$api = new API();
/*$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);*/
$updatebase = $api->upd_ava($_POST["id"]);
$uploaddir = '../avatars/';
var_dump($_POST["id"]);
// это папка, в которую будет загружаться картинка
$apend = $_POST["id"].'.jpg';
//$apend = '123123.jpg';
// это имя, которое будет присвоенно изображению
$uploadfile = $uploaddir.$apend;
//в переменную $uploadfile будет входить папка и имя изображения


// В данной строке самое важное - проверяем загружается ли изображение (а может вредоносный код?)
// И проходит ли изображение по весу. В нашем случае до 512 Кб
if (($_FILES['file']['type'] == 'image/jpeg' || $_FILES['file']['type'] == 'image/png') /*&& ($_FILES['file']['size'] != 0 and $_FILES['file']['size'] <= 512000)*/) {
// Указываем максимальный вес загружаемого файла. Сейчас до 512 Кб
    if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
        //Здесь идет процесс загрузки изображения
        $size = getimagesize($uploadfile);
        // с помощью этой функции мы можем получить размер пикселей изображения

            echo $updatebase['message'];


    } else {
        echo "File not loaded, just back and try again";
    }
} else {

    echo "File is so big";
}
