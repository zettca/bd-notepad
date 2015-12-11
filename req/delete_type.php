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
	$tid = $_REQUEST['tid'];
	
	if (!($uid && $tid)) die();

	$query = "INSERT INTO sequencia (contador_sequencia, moment, userid) VALUES ((SELECT * FROM (SELECT MAX(contador_sequencia) FROM sequencia) AS coiso)+1, NOW(), $uid )";
	$stmt = $con->prepare($query);
	$stmt->execute();
	
	$query = "INSERT INTO tipo_registo (userid, typecnt, nome, idseq, ativo, ptypecnt) VALUES ($uid, (SELECT * FROM (SELECT MAX(typecnt) FROM tipo_registo) AS coiso)+1, (SELECT * FROM (SELECT nome FROM tipo_registo WHERE typecnt=$tid) AS coiso), (SELECT * FROM (SELECT idseq FROM tipo_registo WHERE typecnt=$tid) AS coiso), 0, (SELECT * FROM (SELECT ptypecnt FROM tipo_registo WHERE typecnt=$tid) AS coiso))";
	$stmt = $con->prepare($query);
	$stmt->execute();
	
	$query = "UPDATE tipo_registo SET idseq=(SELECT * FROM (SELECT MAX(contador_sequencia) FROM sequencia) AS coiso), ativo=0, ptypecnt=(SELECT * FROM (SELECT MAX(typecnt) FROM tipo_registo) AS coiso) WHERE typecnt=$tid";
	$stmt = $con->prepare($query);
	$stmt->execute();
	
	$result = array(success => true, uid => $uid, tid => $tid);

	echo json_encode($result);
	
	$con = null;
} catch (Exception $e){
	echo $e->getMessage();
}

?>