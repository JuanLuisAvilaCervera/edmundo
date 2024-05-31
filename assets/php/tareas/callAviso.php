<?php
require_once "../BBDD/m_consultas.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$tarea = $obj['tarea'];

$consulta = select("aviso where idAviso = ".intval($tarea));

if($fi = $consulta->fetch(PDO::FETCH_ASSOC)){
    echo json_encode($fi);
}else{
    echo json_encode("");
}


?>