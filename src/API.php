<?php
class API
{
    private $DB;
    public function __construct(){
        $servername = "localhost:3308";
        $username = "root";
        $password="";
        $database = "timesheet";
        try {
            $this->DB = new PDO("mysql:host=$servername;dbname=".$database, $username, $password);
            // set the PDO error mode to exception
            $this->DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //echo "Connected successfully";
        }
        catch(PDOException $e)
        {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    public function take_info()
    {
        $status = array(
            "status" => 0,
            "message" => ""
        );
        $query = $this->DB->prepare("SELECT * FROM people");
        $query->execute();
        $query->setFetchMode(PDO::FETCH_ASSOC);
        $result = $query->fetchAll();
       
        $status['data'] = $result;
        $status['message'] = 'Good!';
        $status['status'] = 0;

        return $status;
    }

    public function out_info($info)
    {
        $status = array(
            "status" => 0,
            "message" => ""
        );
        $name = $info['name'];
        $sec_name = $info['sec_name'];
        $img = $info['img'];
        $date_of_birth = $info['date_of_birth'];
        $job = $info['job'];
        $local = $info['local'];
        $adress = $info['adress'];
        $id = $info['id'];
        $query = $this->DB->query("UPDATE `people` SET name = '$name', sec_name = '$sec_name', img = '$img', job = '$job', local = '$local', adress = '$adress', date_of_birth = '$date_of_birth' WHERE `people`.`id` = $id");
        $status['message'] = 'Good!';
        $status['status'] = 0;
        return $status;
    }

    public function add_person($info)
    {
        $status = array(
            "status" => 0,
            "message" => ""
        );
        try {
            $name = $info['name'];
            $sec_name = $info['sec_name'];
            $img = $info['img'];
            $date_of_birth = $info['date_of_birth'];
            $job = $info['job'];
            $local = $info['local'];
            $adress = $info['adress'];
            $sql = "INSERT INTO people (name, sec_name, date_of_birth, job, local, adress, img) VALUES ('$name', '$sec_name', '$date_of_birth', '$job', '$local', '$adress', '$img');";
            $this->DB->exec($sql);
            $status['message'] = 'Person added';
            $query = $this->DB->prepare("SELECT LAST_INSERT_ID()");
            $query->execute();
            $query->setFetchMode(PDO::FETCH_ASSOC);
            $result = $query->fetchAll();
            $status['id'] = $result;
            return $status;
        }
        catch (PDOException $e){
            $status['status'] = 1;
            $status['message'] = 'Database exception';
            return $status;
        }
    }

    public function delete_person($id)
    {
        $status = array(
            "status" => 0,
            "message" => ""
        );
        try {
            $sql = "DELETE FROM people WHERE id = '$id'";
            $this->DB->exec($sql);
            $status['message'] = 'Person deleted';
            return $status;
        } 
        catch (PDOException $e){
            $status['status'] = 1;
            $status['message'] = 'Database exception';
            return $status;
        }
    }
    
     public function get_jobs()
    {
        $status = array(
            "status" => 0,
            "message" => ""
        );
        $query = $this->DB->prepare("SELECT * FROM job");
        $query->execute();
        $query->setFetchMode(PDO::FETCH_ASSOC);
        $result = $query->fetchAll();
       
        $status['data'] = $result;
        $status['message'] = 'Good!';
        $status['status'] = 0;

        return $status;
    }

     public function upd_ava($id) {
        $status = array(
            'status' => 0,
            'message' => "",
        );
        try{
            $query = $this->DB->prepare("UPDATE people SET img='$id.jpg' WHERE id = '$id';");
            $query->execute();
            $status['message'] = "Avatar updated";

            return $status;
        }
        catch (PDOException $e){
            $status['status'] = 1;
            $status['message'] = "Exception drop";

            return $status;
        }
    }

    public function del_ava($id) {
        $status = array(
            'status' => 0,
            'message' => "",
        );
        try{
            $query = $this->DB->prepare("UPDATE people SET img='standart.jpg' WHERE id = '$id';");
            $query->execute();
            $status['message'] = "Avatar deleted";

            return $status;
        }
        catch (PDOException $e){
            $status['status'] = 1;
            $status['message'] = "Exception drop";

            return $status;
        }

    }









}