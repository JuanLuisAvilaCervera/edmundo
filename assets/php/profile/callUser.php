<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$email = $obj['email'];

$idUsuario = getUserID($email);
$consulta = select("usuario where idUsuario = ".$idUsuario);
if($fi = $consulta->fetch(PDO::FETCH_ASSOC)){
    echo json_encode($fi);
}else{
    echo json_encode("");
}


?>