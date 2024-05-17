<?php
require_once "../BBDD/m_consultas.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);

$idUsuario = $obj['idUsuario'];
$campos = array('solicitud' => 2);
if($consulta = update("usuario", "idUsuario = ". $idUsuario, $campos)){
    echo json_encode($consulta);
}else{
    echo json_encode("");
}

