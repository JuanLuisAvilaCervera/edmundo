<?php
require_once "../BBDD/m_consultas.php";

function getUserID($email){
    $consulta = select("usuario where email = '".$email."'");
    
    if($fi = $consulta -> fetch(PDO::FETCH_ASSOC);){
        return $fi["id_user"];
    }else{
        return "";
    }
}

function getAulaID($codAula){
    $consulta = select("aula where codAula = '".$codAula."'")
    
    if($fi = $consulta -> fetch(PDO::FETCH_ASSOC);){
        return $fi["idAula"];
    }else{
        return "";
    }
}


?>