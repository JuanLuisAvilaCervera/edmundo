<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$codAula = $obj['codAula'];
$email = $obj['email'];
$campos = array('lastCodAula'=>$codAula);
$consulta = update("usuario", "email = '". $email."'", $campos);
if($fi = $consulta->exec(PDO::FETCH_ASSOC)){
    echo json_encode($fi);
}else{
    echo json_encode("");
}
?>