<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$codAula = $obj['codAula'];
$email = $obj['email'];

$datos = array();
$idUsuario = getUserID($email);
$idAula = getAulaID($codAula);
if( $idUsuario != "" && $idAula != "" && $text != ""){
    // //Añadir datos del insert al array $datos
    array_push($datos, $text, $idUsuario, $idAula, "");
    // //INSERTAR NUEVO POST
        insert("post", $datos);
    // //DEVOLVEMOS LOS DATOS TRAS HACER LAS LLAMADAS A BBDD
    //R: COMO COMPROBAR EXACTAMENTE QUE EL MENSAJE ENVIADO ES CORRECTO
    return selectsql("SELECT * FROM post WHERE idAula = ".$idAula." AND idPoster = ".$idUsuario." AND texto = ".$text);
}else{
    return "";
}
?>