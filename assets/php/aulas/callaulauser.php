<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$codAula = $obj['codAula'];

$idAula = getAulaID($codAula);

$consulta = selectsql("select aula.idCreator , aulausuario.* , usuario.* from aula, aulausuario , usuario where aula.idAula =".$idAula." and aula.idAula = aulausuario.idAula and aulausuario.idUsuario = usuario.idUsuario");
if($fi = $consulta->fetchAll(PDO::FETCH_ASSOC)){
    echo json_encode($fi);
}else{
    echo json_encode("");
}
?>