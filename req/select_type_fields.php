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
	
	if (!$tid) die();

	$query = "SELECT * FROM campo WHERE typecnt=$tid AND ativo=1";

	$stmt = $con->prepare($query);
	$stmt->execute();
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $out["success"] = true;
    $out["fields"] = $result;

	echo json_encode($out);
	
	$con = null;
} catch (Exception $e){
	echo $e->getMessage();
}

?>