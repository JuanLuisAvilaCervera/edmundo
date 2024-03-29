<?php
require_once "../BBDD/m_consultas.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$email = $obj['email'];
$password = $obj['password'];
$hashed_password = password_hash($password,PASSWORD_DEFAULT);
$campos = array();
array_push( $campos,0, "", "" , $email,  $hashed_password,0, "");
insert("usuario", $campos);
$consulta = selectsql("SELECT * FROM USUARIO WHERE email = '".$email."'");
 if($fi = $consulta->fetch(PDO::FETCH_ASSOC)){
        echo json_encode ($fi);
 }else{
       echo json_encode("");
 }
//  echo json_encode($consulta);
// echo $consulta;
?>