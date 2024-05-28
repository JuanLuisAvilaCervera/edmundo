<?php
    require_once "modelo.php";
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
    $email = $obj['email'];
    $message = "Este correo sirve para que valides tu cuenta de correo electronico <br> para validarlo pincha en el siguiente enlace:
     <br> <a href='http://www.edmundo.com/edmundo/html/verRegistro.php?c=$email'>http://www.edmundo.com/edmundo/html/verRegistro.php</a>";
    if(mandaCorreo($email, $message)){
        echo json_encode(true);
    }else{
        echo json_encode(false);
    }


?>