<?php

header('Content-Type: application/json');

try{
	$host="db.ist.utl.pt";
	$port=3306;
	$socket="";
	$user="ist178013";
	$password="gzhs9356";
	$dbname="ist178013";

	$con = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
	$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	$id = $_REQUEST['id'];
	$user = $_REQUEST['user'];
	$pass = $_REQUEST['pass'];
	
	if ($id){
		$query = "SELECT * FROM utilizador WHERE userid=$id";
	} else if ($user && $pass){
		$query = "SELECT * FROM utilizador WHERE email=$user AND password=$pass";
	} else{
		die();
	}

	$stmt = $con->prepare($query);
	$stmt->execute();
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
	
	if (count($result) == 1){
		$out["success"] = true;
		$result[0]["password"] = "nope";
		$out["user"] = $result[0];
	} else{
		$out["success"] = false;
	}

	echo json_encode($out);
	
	$con = null;
} catch (Exception $e){
	echo $e->getMessage();
}

?>