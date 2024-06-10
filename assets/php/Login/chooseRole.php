<?php
require_once "../BBDD/m_consultas.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$rol = $obj['rol'];
$campos = array('rol'=>$rol , 'solicitud' => 0);
$llamada = update("usuario","email = '". $obj['email']."'", $campos );
$consulta = select("usuario where email = '". $obj['email']."' and rol = ".$obj['rol']);
if($fi = $consulta->fetch(PDO::FETCH_ASSOC) ){
  echo json_encode ($fi);
}else{
  echo json_encode("");
}
?>