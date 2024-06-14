<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$email = $obj['email'];
$nombre = $obj['nombre'];
$apellidos = $obj['apellidos'];

$idUsuario = getUserID($email);
$campos = array();

$campos = array('name'=>$nombre , 'surname' => $apellidos);

$llamada = update("usuario","email = '". $obj['email']."'", $campos );
if($llamada){
    echo json_encode($llamada);
}else{
    echo json_encode("");
}


?>