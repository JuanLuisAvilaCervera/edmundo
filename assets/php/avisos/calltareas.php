<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$email = $obj['email'];

$datos = array();
$idUsuario = getUserID($email);
if( $idUsuario != "" ){
    $consulta = select("tareasentregadas where idUsuario = ".$idUsuario);
    if($fi = $consulta->fetchAll(PDO::FETCH_ASSOC)){
        echo json_encode($fi);
    }else{
        echo json_encode("");
    }
}else{
    echo json_encode("");
}


?>