<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);

$idAviso = intval($obj['idTarea']);
$consulta = deletesql("DELETE FROM aviso WHERE idAviso = ".$idAviso);
    if($consulta == 1){
        echo json_encode("Completado");
    }else{
        echo json_encode("");
    }

?>