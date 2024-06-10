<?php
require_once "../BBDD/m_consultas.php";
require_once "./joinAula.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$aulaName = $obj['aulaName'];
$email = $obj['email'];
$characters = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 1 2 3 4 5 6 7 8 9 0";
$charArray = explode(" ", $characters);
$codAula = "";
for($i = 0 ; $i < 6 ; $i++){
    //obtener posición aleatoria dentro del array charArray
    $n = rand(0 , count($charArray)-1);
    $codAula .= $charArray[$n];
}
$campos = array();

$idUsuario = getUserID($email);

array_push( $campos, 0 , $aulaName , $codAula , $idUsuario );
if(insert("aula", $campos )){
    joinAula($email,$codAula);
    $consulta = selectsql("select * from aula where codAula = '".$codAula."'");
    $fi = $consulta -> fetch(PDO::FETCH_ASSOC);
    echo json_encode( $fi);

}else{
    echo json_encode("fallo joinaula");
}

?>