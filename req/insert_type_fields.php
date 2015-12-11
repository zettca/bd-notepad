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
	
	$tid = $_REQUEST['tid'];
	$name = $_REQUEST['name'];
	
	if (!($tid && $name)) die();

	$query = "INSERT INTO tipo_registo (userid, nome, ativo) VALUES ($tid, $name, 1)";

	$stmt = $con->prepare($query);
	$stmt->execute();
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode($result);
	
	$con = null;
} catch (Exception $e){
	echo $e->getMessage();
}

?>