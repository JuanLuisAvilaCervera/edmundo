<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$idAula = $obj['idAula'];
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
        if($tarea == "1"){
            $consulta2 = selectsql("SELECT * FROM aviso WHERE idAula = ".$idAula." and tarea = 1 ORDER BY idAviso DESC LIMIT 1");
            $fi = $consulta2->fetch(PDO::FETCH_ASSOC);
            $idTarea = $fi['idAviso'];

            $consulta3 = selectsql("SELECT * FROM AULAUSUARIO WHERE idAula =".$idAula);
            $cont = 0;
            $datosEntregadas = array();
            while ($fila = $consulta3->fetch(PDO::FETCH_ASSOC)) {
                $idUsuario = $fila['idUsuario'];
                $datosEntregadas = array();
                array_push($datosEntregadas, "", $idTarea, $idUsuario,"",null);
                insert("tareasentregadas", $datosEntregadas);
                $cont++;
            }
        }
        
        echo json_encode($datosEntregadas);
    }else{
        echo json_encode("");
    }
}else{
    echo json_encode("");
}

?>