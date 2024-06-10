<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$email = $obj['email'];

$datos = array();
$idUsuario = getUserID($email);
if( $idUsuario != "" ){
    $consulta = selectsql("SELECT * FROM aviso WHERE idAula IN (SELECT idAula FROM AULAUSUARIO WHERE idUsuario = ".$idUsuario.")");
    //select * from aviso where idAula IN (select idAula from aulausuario where idUsuario = 10)
    if($fi = $consulta->fetchAll(PDO::FETCH_ASSOC)){
        echo json_encode($fi);
    }else{
        echo json_encode("");
    }
}else{
    echo json_encode("");
}


?>