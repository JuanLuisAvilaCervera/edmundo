<?php
require_once 'configuracion.php';
class ConexionDB{
    private static $instancia;

    private function __construct($nombreBD){
        try {
            $option=SGBD.":host=".SERVIDOR.";dbname=".$nombreBD;
            self::$instancia = new PDO($option, USERDB, PASSWORDDB);
        }catch(PDOException $e){
            self::$instancia=null;
        }
    }

    private function __clone(){}

    public static function getConexion($nombreBD){
        if(self::$instancia==null){
            new ConexionDB($nombreBD);
        }
        return self::$instancia;
    }
}
?>