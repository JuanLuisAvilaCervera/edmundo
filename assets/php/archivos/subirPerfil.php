<?php
require_once "../BBDD/getIDs.php";
$target_dir = "../../files/perfiles/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);

if(isset($_POST['ajax'])){
    if($_POST['ajax'] == 1){
        $email = $_POST['email'];
        if(isset($_FILES['fileToUpload'])){
            move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $target_file);
            $campos = array('imagenPerfil'=>basename($_FILES["fileToUpload"]["name"]));
            $llamada = update("usuario","email = '". $email."'", $campos );
            if($llamada){
                echo json_encode($llamada);
            }else{
                echo json_encode("");
            }
        }
    }
}

?>