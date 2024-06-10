<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$codAula = $obj['codAula'];

$datos = array();
$idAula = getAulaID($codAula);
if( $idAula != "" ){
    $consulta = selectsql("select post.* , usuario.name from post , usuario where idAula =".$idAula." && post.idUsuario = usuario.idUsuario ORDER BY fecha DESC");
    if($fi = $consulta->fetchAll(PDO::FETCH_ASSOC)){
        echo json_encode($fi);
    }else{
        echo json_encode("");
    }
}else{
    echo json_encode("");
}


?>