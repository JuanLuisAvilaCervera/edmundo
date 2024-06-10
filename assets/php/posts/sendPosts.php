<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$codAula = $obj['codAula'];
$email = $obj['email'];
$text = $obj['text'];

$datos = array();
$idUsuario = getUserID($email);
$idAula = getAulaID($codAula);
$zonaHoraria = new DateTimeZone("Europe/Madrid");
$fecha = date("Y/m/d h:i:00");

if( $idUsuario != "" && $idAula != "" && $text != ""){
    // //Añadir datos del insert al array $datos
    array_push($datos, 0, $idUsuario, $idAula, $text, $fecha);
    // //INSERTAR NUEVO POST
    $consulta = insert("post", $datos);
    // //DEVOLVEMOS LOS DATOS TRAS HACER LAS LLAMADAS A BBDD
    // $consulta = selectsql("SELECT * FROM post WHERE idAula = ".$idAula." AND idUsuario = ".$idUsuario." AND texto = ".$text);
    if($consulta == 1){
        echo json_encode("Completado");
    }else{
        echo json_encode("");
    }
}else{
    echo json_encode("");
}

?>