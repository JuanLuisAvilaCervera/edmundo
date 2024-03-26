<?php
require_once "BBDD/m_consultas.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$rol = $obj['rol'];
$campos = array('rol'=>$obj['rol']);
$consulta = update("usuario","email = '". $obj['email']."'", $campos );
//  if($fi = $consulta->fetch(PDO::FETCH_ASSOC)){
//         echo json_encode ($fi);
//  }else{
//        echo json_encode("");
//  }
  echo json_encode($fi = $consulta->fetch(PDO::FETCH_ASSOC));
// echo $consulta;
?>