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
	
	$pid = $_REQUEST['pid'];
	
	if (!$pid) die();

	//$query = "DELETE FROM pagina WHERE pageid=$pid";
	$query = "INSERT INTO pagina
				SELECT userid,(
						SELECT max(pagecounter)+1
						FROM pagina),
					nome, idseq, ativa, ppagecounter
				FROM pagina
				WHERE pagecounter=$pid";

	$stmt = $con->prepare($query);
	$stmt->execute();
	
	$squery = "UPDATE pagina
				SET idseq = (SELECT max(idseq)+1
							FROM pagina),
					ppagecounter = (SELECT max(pagecounter)
									FROM pagina)";
	
	$stmt = $con->prepare($query);
	$stmt->execute();
	
	
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode($result);
	
	$con = null;
} catch (Exception $e){
	echo $e->getMessage();
}

?>