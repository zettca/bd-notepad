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
	
	$rid = $_REQUEST['rid'];
	$cid = $_REQUEST['cid'];
	$val = $_REQUEST['val'];
	
	if (!($rid && $cid && $val)) die();
	
	/* get userid/typecounter from registo */
	$query = "SELECT * FROM registo WHERE regcounter=$rid";
	$stmt = $con->prepare($query);
	$stmt->execute();
	$result = $stmt->fetch(PDO::FETCH_ASSOC);
	$tid = $result["typecounter"];
	$uid = $result["userid"];

	/*$query = "INSERT INTO valor (userid, typecnt, nome, ativo) VALUES ($uid, $tid, $name, 1)";

	$stmt = $con->prepare($query);
	$stmt->execute();
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode($result);*/
	
	$con = null;
} catch (Exception $e){
	echo $e->getMessage();
}

?>