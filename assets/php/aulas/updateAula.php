<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$codAula = $obj['codAula'];
$email = $obj['email'];
$campos = array('lastCodAula'=>$codAula);
if($consulta = update("usuario", "email = '". $email."'", $campos)){
    echo json_encode($consulta);
}else{
    echo json_encode("");
}
?>