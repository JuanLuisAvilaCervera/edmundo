<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$email = $obj['email'];
$solicitud = $obj['solicitud'];

$idUsuario = getUserID($email);
$campos = array();
if($solicitud == 1){
    $campos = array('rol'=>$solicitud , 'solicitud' => 1);
}else if($solicitud == 2){
    $campos = array('rol'=>$solicitud , 'solicitud' => 0);

}
$llamada = update("usuario","email = '". $obj['email']."'", $campos );
if($llamada){
    echo json_encode($llamada);
}else{
    echo json_encode("");
}


?>