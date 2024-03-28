<?php
require_once "BBDD/m_consultas.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$codAula = $obj['codAula'];
// $campos = array('rol'=>$obj['rol']);
$consulta = selectsql("SELECT * from aula where codAula = '".$codAula."'");
if($fi = $consulta->fetch(PDO::FETCH_ASSOC)){
        echo json_encode ($fi);
}else{
        echo json_encode("");
}
?>