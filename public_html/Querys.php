<?php
header('Content-Type: text/html; charset=UTF-8');
require './Conexion.php';

class Querys {

    private $_conexion = null;

    public function __construct() {
        $conexion = new Conexion();
        $this->_conexion = $conexion->getConexion();
    }

    public function ciudades() {
        $query = "SELECT nombre FROM ciudades";
        $statement = $this->_conexion->prepare($query);
        $statement->execute();
        $array = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $array;
    }
    
    public function tramos(){
        $ciudadOrigen = $_POST['ciudadOrigen'];
        $ciudadDestino = $_POST['ciudadDestino'];
        
        $query = "";
    }
}
