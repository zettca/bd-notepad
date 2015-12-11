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
	$cid = $_REQUEST['cid'];
	
	if (!($uid && $cid)) die();

	$query = "INSERT INTO sequencia (contador_sequencia, moment, userid) VALUES ((SELECT * FROM (SELECT MAX(contador_sequencia) FROM sequencia) AS coiso)+1, NOW(), '$uid')";
	$stmt = $con->prepare($query);
	$stmt->execute();
	
	$query = "INSERT INTO campo (userid, typecnt, campocnt, nome, idseq, ativo, pcampocnt) VALUES ('$uid', (SELECT * FROM (SELECT typecnt FROM campo WHERE campocnt='$cid') AS coiso), (SELECT * FROM (SELECT MAX(campocnt) FROM campo) AS coiso)+1, (SELECT * FROM (SELECT nome FROM campo WHERE campocnt='$cid') AS coiso), (SELECT * FROM (SELECT idseq FROM campo WHERE campocnt='$cid') AS coiso), 0, (SELECT * FROM (SELECT pcampocnt FROM campo WHERE campocnt='$cid') AS coiso))";
	$stmt = $con->prepare($query);
	$stmt->execute();
	
	$query = "UPDATE campo SET idseq=(SELECT * FROM (SELECT MAX(contador_sequencia) FROM sequencia) AS coiso), ativo=0, pcampocnt=(SELECT * FROM (SELECT MAX(campocnt) FROM campo) AS coiso) WHERE campocnt='$cid'";
	$stmt = $con->prepare($query);
	$stmt->execute();
	
	$result = array(success => true, uid => $uid, tid => $tid);

	echo json_encode($result);
	
	$con = null;
} catch (Exception $e){
	echo $e->getMessage();
}

?>