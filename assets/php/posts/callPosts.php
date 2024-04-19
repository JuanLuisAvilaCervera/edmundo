<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$codAula = $obj['codAula'];

$datos = array();
$idAula = getAulaID($codAula);
if( $idAula != "" ){
    $consulta = selectsql("SELECT * FROM post WHERE idAula = ".$idAula);
    if($fi = $consulta->fetch(PDO::FETCH_ASSOC)){
        echo json_encode($fi);
    }else{
        echo json_encode("");
    }
}else{
    echo json_encode("");
}


?>