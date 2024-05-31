<?php
require_once "../BBDD/m_consultas.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$idUsuario = $obj['idUsuario'];
$idTarea = $obj['idTarea'];
$puntuacion = $obj['puntuacion'];

$campos = array('puntuacion'=>intval($puntuacion));
$llamada = update("tareasentregadas","idUsuario = ". intval($idUsuario)." AND idTarea = ". intval($idTarea), $campos );

if($llamada> 0){
    echo json_encode($puntuacion);
}else{
    echo json_encode("");
}

?>