<?php
require_once "../BBDD/m_consultas.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$tarea = $obj['tarea'];


//CAMBIAR ROL POR CREADOR DE LA CLASE
$consulta = selectsql("SELECT usuario.*  FROM usuario where usuario.rol <> 1  
AND usuario.idUsuario 
NOT IN 
(SELECT tareasentregadas.idUsuario FROM tareasentregadas WHERE tareasentregadas.idTarea = ".intval($tarea).") 
AND usuario.idUsuario IN (SELECT aulausuario.idUsuario FROM aulausuario WHERE aulausuario.idAula 
IN (SELECT aviso.idAula FROM aviso WHERE aviso.idAviso = ".intval($tarea)."))");
if($fi = $consulta->fetchAll(PDO::FETCH_ASSOC)){
    echo json_encode($fi);
}else{
    echo json_encode("");
}


?>