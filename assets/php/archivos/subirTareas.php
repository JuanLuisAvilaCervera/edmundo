<?php
require_once "../BBDD/getIDs.php";
$target_dir = "../../files/tareasEntregadas/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);

if(isset($_POST['ajax'])){
    if($_POST['ajax'] == 1){
        $idTarea = $_POST['idTarea'];
        $email = $_POST['email'];

        $idUsuario = getUserId($email);

        $zonaHoraria = new DateTimeZone("Europe/Madrid");
        $fecha = date("Y/m/d h:i:00");

        if(isset($_FILES['fileToUpload'])){
            move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $target_file);
            $datosEntregadas = array();
            array_push($datosEntregadas, "", $idTarea, $idUsuario,basename($_FILES["fileToUpload"]["name"]),$fecha);
            $consulta = insert("tareasentregadas", $datosEntregadas);
            if($consulta == 1){
                echo json_encode("Completado");
            }
        }
    }
}

echo json_encode("");

?>