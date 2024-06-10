<?php
require_once "../BBDD/m_consultas.php";
require_once "../correo/modelo.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);

$email = $obj['idUsuario'];
$idUsuario = getUserID($email);
$campos = array('solicitud' => 2);
if($consulta = update("usuario", "idUsuario = ". $idUsuario, $campos)){
    $message = "Tu solicitud para volverse docente en Edmundo ha sido aceptada. Pulse aquí para volver a la página de Edmundo:
    <a href='http://www.edmundo.com/edmundo/'>http://www.edmundo.com/edmundo/</a>";
            if(mandaCorreo($email, $message)){
                  echo json_encode(true);
            }else{
                  echo json_encode("");
            }
}else{
    echo json_encode("");
}

