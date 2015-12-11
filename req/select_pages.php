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
	
	$uid = $_REQUEST['uid'];
	
	if (!$uid) die();

	$query = "SELECT * FROM pagina WHERE ativa=1 AND pagina.userid=$uid";

	$stmt = $con->prepare($query);
	$stmt->execute();
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $out["success"] = true;
    $out["pages"] = $result;

	echo json_encode($out);
	
	$con = null;
} catch (Exception $e){
	echo $e->getMessage();
}

?>