<?php
require_once "../BBDD/m_consultas.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$tarea = $obj['tarea'];

$consulta = selectsql("SELECT tareasentregadas.* , usuario.* FROM tareasentregadas , usuario where tareasentregadas.idUsuario = usuario.idUsuario AND tareasentregadas.idTarea = ".intval($tarea)." ORDER BY usuario.surname");

if($fi = $consulta->fetchAll(PDO::FETCH_ASSOC)){
    echo json_encode($fi);
}else{
    echo json_encode("");
}


?>