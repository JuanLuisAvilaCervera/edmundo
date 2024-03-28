<?php
require_once "BBDD/m_consultas.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$aulaName = $obj['aulaName'];
$characters = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 1 2 3 4 5 6 7 8 9 0";
$charArray = explode(" ", $characters);
$codAula = "";
for($i = 0 ; $i < 6 ; $i++){
    //obtener posición aleatoria dentro del array charArray
    $n = rand(0 , count($charArray)-1);
    $codAula += $n;
}
$campos = array();
array_push( $campos,);
$llamada = insert("usuarios", 0 , $aulaName , $codAula );
// $consulta = selectsql("SELECT * from aula where codAula = '".$codAula."'");
if($fi = $consulta->fetch(PDO::FETCH_ASSOC)){
        echo json_encode ($fi);
}else{
        echo json_encode("");
}
?>