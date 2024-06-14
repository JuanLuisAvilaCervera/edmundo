<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);


$idAviso = intval($obj['idAviso']);
$title = $obj['titulo'];
$text = $obj['text'];
$tarea = $obj['tarea'];
$fecha = $obj['fecha'];
$atrasada = $obj['atrasada'];

    $datos = array(
        'titulo' => $title,
        'texto' => $text,
        'fecha' => $fecha,
        'tarea' => $tarea,
        'atrasada' => $atrasada
    );
    // //INSERTAR NUEVO POST
    $consulta = update("aviso", "idAviso = ".$idAviso, $datos);
    if($consulta == 1){
        echo json_encode("Completado");
    }else{
        echo json_encode("");
    }

?>