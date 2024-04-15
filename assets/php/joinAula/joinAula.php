<?php
require_once "../BBDD/m_consultas.php";
require_once "../BBDD/getIDs.php";
function joinAula($email, $codAula){
    $datos = array();
    $idUsuario = getUserID($email);
    $idAula = getAulaID($codAula);
    if( $idUsuario != "" && $idAula != "" ){
        //Añadir datos del insert al array $datos
        array_push($datos, 0, $idAula, $idUsuario);
        //INSERTAR NUEVA CLASE
        insert("aulaUsuario", $datos);
        //UPDATE USUARIO LASTCODAULA
        $campos = array('lastCodAula'=>$codAula);
        update("usuario", "email = '". $email."'", $campos);
        //DEVOLVEMOS LOS DATOS TRAS HACER LAS LLAMADAS A BBDD
        return selectsql("SELECT * FROM aulausuario WHERE idAula = ".$idAula." AND idUsuario = ".$idUsuario);
    }else{
        return "";
    }

}
?>