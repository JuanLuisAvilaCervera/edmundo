<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$email = $obj['email'];
$idUsuario = getUserID($email);
$consulta = selectsql("select aula.* , usuario.name as creator , usuario.surname as surCreator from aula, usuario where aula.idAula in (select idAula from aulausuario where idUsuario = ".$idUsuario.") and aula.idCreator = usuario.idUsuario");
//Sacar aulas por orden alfabético y meterlas en la variable consulta
if($fi = $consulta->fetchAll(PDO::FETCH_ASSOC) ){
  echo json_encode ($fi);
}else{
  echo json_encode("");
}
?>