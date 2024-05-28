<?php
require_once "../BBDD/m_consultas.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);

$nombre = $obj['nombre'];
$apellidos = $obj['apellidos'];
$email = $obj['email'];
$password = $obj['password'];
$hashed_password = password_hash($password,PASSWORD_DEFAULT);
$consulta = selectsql("SELECT * FROM USUARIO WHERE email = '".$email."'");
if(!$fi = $consulta->fetch(PDO::FETCH_ASSOC)){
      $campos = array();
      array_push( $campos,0, $nombre, $apellidos , $email,  $hashed_password,0, "",0,"", 0);
      echo json_encode($consulta2 = insert("usuario", $campos)?$email:"");
}else{
      echo json_encode("");
}
// if(!$consulta = selectsql("SELECT * FROM USUARIO WHERE email = '".$email."'")){
//       $campos = array();
//       array_push( $campos,0, $nombre, $apellidos , $email,  $hashed_password,0, "",0,"");

//  echo json_encode($consulta2 = insert("usuario", $campos));

// }else{
//       echo json_encode($consulta);
// }


?>