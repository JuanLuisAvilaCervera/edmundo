<?php
require_once "../BBDD/m_consultas.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$email = $obj['email'];
$campos = array('solicitud' => 1);
$llamada = update("usuario","email = '". $email."'", $campos );
$consulta = select("usuario where email = '". $email."'");
if($fi = $consulta->fetch(PDO::FETCH_ASSOC) ){
  echo json_encode ($fi);
}else{
  echo json_encode("");
}
?>