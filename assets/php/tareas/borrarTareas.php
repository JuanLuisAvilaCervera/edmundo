<?php
require_once "../BBDD/m_consultas.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
// $tarea = intval($obj['idTareaEntregada']);
$tarea = $obj['idTareaEntregada'];
$consulta = deletesql('DELETE FROM tareasentregadas WHERE idTareaEntregada = '.$tarea);

if($consulta){
    echo json_encode($consulta);
}else{
    echo json_encode("");
}


?>