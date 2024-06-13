<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$codAula = $obj['codAula'];
$title = $obj['titulo'];
$text = $obj['text'];
$tarea = $obj['tarea'];
$fecha = $obj['fecha'];
$atrasada = $obj['atrasada'];

$datos = array();

if( $idAula != "" && $title != "" && $fecha != "" ){
    
    //idAviso, idAula, titulo, texto, tarea, fecha
    array_push($datos, 0, $idAula, $title, $text, $tarea, $fecha, $atrasada);
    // //INSERTAR NUEVO POST
    $consulta = insert("aviso", $datos);
    if($consulta == 1){
        echo json_encode("Completado");
    }else{
        echo json_encode("");
    }
}else{
    echo json_encode("");
}

?>