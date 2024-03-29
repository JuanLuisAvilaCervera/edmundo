<?php
require_once "../BBDD/m_consultas.php";
function joinAula($email, $codAula){
    $datos = array();
    $consulta = select("aula where codAula = '".$codAula."'");
    $consulta2 = select("usuario where email = '".$email."'");
    $fi = $consulta->fetch(PDO::FETCH_ASSOC);
    $fu = $consulta2->fetch(PDO::FETCH_ASSOC);
    if( $fi && $fu ){
        $idAula = $fi["idAula"];
        $idUsuario = $fu["id_user"];
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