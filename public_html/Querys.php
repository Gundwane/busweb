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

    public function getEmpresa(){

        $query = "SELECT nombreEmpresa FROM empresas";
        $statement = $this->_conexion->prepare($query);
        $statement->execute();
        $array = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $array;
    }

    public function getBus(){
        $query = "SELECT arrayButacas FROM buses WHERE patenteBus='AF465FG'";
        $statement = $this->_conexion->prepare($query);
        $statement->execute();
        $row = $statement->fetchColumn();
        $arrayBus = unserialize($row);
        return $arrayBus;
    }

    public function getTramo() {
        $ciudadOrigen = $_POST['ciudadOrigen'];
        $ciudadDestino = $_POST['ciudadDestino'];

        try {
            $query = "SELECT empresa.nombreEmpresa, tramos.horarioSalida, tramos.horarioLlegada, buses.arrayAsientos
                     FROM tramos
                     INNER JOIN empresa ON tramos.fk_empresa = empresa.idEmpresa
                     INNER JOIN buses ON tramos.fk_bus = buses.idBus
                     INNER JOIN ciudades AS corigen ON tramos.fk_ciudadOrigen = corigen.idCiudad
                     INNER JOIN ciudades AS cdestino ON tramos.fk_ciudadDestino = cdestino.idCiudad
                     WHERE corigen.nombre = ? AND cdestino.nombre = ?";

            $statement = $this->_conexion->prepare($query);
            $statement->bindParam(1, $ciudadOrigen);
            $statement->bindParam(2, $ciudadDestino);
            $statement->execute();
            $array = $statement->fetchAll(PDO::FETCH_ASSOC);

            //Unserializa array de asientos de micros
            foreach ($array as $key => $subarray) {
              foreach ($subarray as $subkey => $value) {
                if ($subkey === 'arrayAsientos') {
                  $array[$key][$subkey] = unserialize(base64_decode($value));
                }
              }
            }
            return $array;
        } catch (PDOException $e) {
            print $e->getMessage();
        }
    }

}
