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
	$pid = $_REQUEST['pid'];
	$tid = $_REQUEST['tid'];
	$name = $_REQUEST['name'];
	
	if (!($pid && $name)) die();

	$con->beginTransaction();

	$query = "INSERT INTO sequencia (contador_sequencia, moment, userid) VALUES ((SELECT * FROM (SELECT MAX(contador_sequencia) FROM sequencia) AS coiso)+1, NOW(), '$uid')";
	$stmt = $con->prepare($query);
	$stmt->execute();
	
    $query = "INSERT INTO registo (userid, typecounter, regcounter, nome, ativo, idseq, pregcounter) VALUES ('$uid', '$tid', (SELECT * FROM (SELECT MAX(regcounter) FROM registo) AS coiso)+1, '$name', 1, (SELECT * FROM (SELECT MAX(contador_sequencia) FROM sequencia) AS coiso), NULL)";
	$stmt = $con->prepare($query);
	$stmt->execute();

	$query = "INSERT INTO sequencia (contador_sequencia, moment, userid) VALUES ((SELECT * FROM (SELECT MAX(contador_sequencia) FROM sequencia) AS coiso)+1, NOW(), '$uid')";
	$stmt = $con->prepare($query);
	$stmt->execute();
	
    $query = "INSERT INTO reg_pag (idregpag, userid, pageid, typeid, regid, idseq, ativa, pidregpag) VALUES ((SELECT * FROM (SELECT MAX(idregpag) FROM reg_pag) AS coiso)+1, '$uid', '$pid', '$tid', (SELECT * FROM (SELECT MAX(regcounter) FROM registo) AS coiso), (SELECT * FROM (SELECT MAX(contador_sequencia) FROM sequencia) AS coiso), 1, NULL)";
	$stmt = $con->prepare($query);
	$stmt->execute();

	$con->commit();
	
	$result = array(success => true, uid => $uid, name => $name);
	
	echo json_encode($result);
	
	$con = null;
} catch (Exception $e){
	$con->rollBack();
	echo $e->getMessage();
}

?>