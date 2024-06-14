<?php
require_once "../BBDD/getIDs.php";
$target_dir = "../../files/aulas/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);

if(isset($_POST['ajax'])){
    if($_POST['ajax'] == 1){
        $codAula = $_POST['codAula'];
        if(isset($_FILES['fileToUpload'])){
            move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $target_file);
            $campos = array('imagenAula'=>basename($_FILES["fileToUpload"]["name"]));
            $llamada = update("aula","codAula = '". $codAula."'", $campos );
            if($llamada){
                echo json_encode($llamada);
            }else{
                echo json_encode("");
            }
        }
    }
}

?>