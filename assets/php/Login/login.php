<?php
require_once "../BBDD/m_consultas.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$email = $obj['email'];
$password = $obj['password'];
$consulta = select("usuario where email = '".$email."'");
if($fi = $consulta->fetch(PDO::FETCH_ASSOC)){
    if(password_verify($password, $fi['password'])){
        echo json_encode ($fi);
    }else{
        echo json_encode("");
    }
}
?>