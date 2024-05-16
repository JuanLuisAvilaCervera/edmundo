<?php
require_once "../BBDD/m_consultas.php";
// $json = file_get_contents('php://input');
// $obj = json_decode($json,true);

$consulta = select("usuario WHERE NOT rol = 3");

if($fi = $consulta->fetchAll(PDO::FETCH_ASSOC)){
    echo json_encode($fi);
}else{
    echo json_encode("");
}


?>