<?php
require_once 'ConexionDB.php';

//SELECT
function select($tabla,$columna = '*'){
    $conexion = ConexionDB::getConexion(BBDD);
    $sql = "SELECT ".$columna.' FROM '.$tabla;
    $consulta = $conexion -> query($sql);
    return $consulta;
}
//SELECT (SQL COMPLETO)
function selectsql($sql){
    $conexion = ConexionDB::getConexion(BBDD);
    return $conexion -> query($sql);
}
//UPDATE
function update($tabla, $condicion,  $arraycampos){
    $conexion = ConexionDB::getConexion(BBDD);
    $sql = "UPDATE ".$tabla." SET ";
    foreach ($arraycampos as $campo => $valor){
        $sql.=" ".$campo." = '".$valor."', ";
    }
    $sql = substr($sql,0, strlen($sql)-2);
    $sql.= " WHERE ".$condicion;
    return $conexion ->exec($sql);
}
//INSERT
function insert($tabla,$campos){
    $conexion = ConexionDB::getConexion(BBDD);
    $sql = "INSERT INTO ".$tabla." VALUES (";
    for ($i = 0 ; $i < count($campos) ; $i++){
        if(is_numeric($campos[$i])){
            $sql .= " ". $campos[$i].",";
        }else{
            $sql .= " '". $campos[$i]."',";
        }
    }
    $sql = substr($sql,0,strlen($sql)-1);
    $sql .=")";
    return $conexion->exec($sql);
}

?>
