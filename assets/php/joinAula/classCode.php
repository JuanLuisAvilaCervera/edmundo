<?php
require_once "../BBDD/m_consultas.php";
require_once "./joinAula.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$codAula = $obj['codAula'];
$consulta = selectsql("SELECT * from aula where codAula = '".$codAula."'");
if($fi = $consulta->fetch(PDO::FETCH_ASSOC) && $joined = joinAula($obj["email"], $codAula)){
    echo json_encode($fi);
}else{
        echo json_encode("");
}
?>