<?php
require_once "../BBDD/m_consultas.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$nombre = $obj['nombre'];


$campos = array('nombre'=>$nombre);

$llamada = update("aula","codAula = '". $obj['codAula']."'", $campos );
if($llamada){
    echo json_encode($llamada);
}else{
    echo json_encode("");
}


?>