<title>users.php</title>

<?php

try{
	$host="db.ist.utl.pt";
	$port=3306;
	$socket="";
	$user="ist178013";
	$password="gzhs9356";
	$dbname="ist178013";

	$con = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
	$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$query = "SELECT * FROM utilizador WHERE (userid<100);";

	$stmt = $con->prepare($query);
	$stmt->execute();

	echo("<table border=\"0\" cellspacing=\"5\">\n");
	foreach($stmt as $row){
		echo("<tr>\n");
		echo("<td>{$row['userid']}</td>\n");
		echo("<td>{$row['email']}</td>\n");
		echo("<td>{$row['nome']}</td>\n");
		echo("<td>{$row['password']}</td>\n");
		echo("</tr>\n");
	}
	echo("</table>\n");

	$con = null;

} catch (Exception $e){
	echo $e->getMessage();
}
	


?>