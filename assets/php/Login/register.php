<?php
require_once "../BBDD/m_consultas.php";
require_once "../correo/modelo.php";
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
      if($consulta2 = insert("usuario", $campos)){
            $message = "Este correo sirve para que valides tu cuenta de correo electronico 
                  <br> para validarlo pincha en el siguiente enlace:
                  <br> <a href='http://www.edmundo.com/edmundo/html/verRegistro.php?c=$email'>http://www.edmundo.com/edmundo/html/verRegistro.php</a>";
            if(mandaCorreo($email, $message)){
                  echo json_encode(true);
            }else{
                  echo json_encode("");
            }
      }else{
            echo json_encode("");
      }
      
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