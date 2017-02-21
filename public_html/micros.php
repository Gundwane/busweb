<?php
require './Conexion.php';

class Micros{
    private $_matrizButacas = array();
    private $_conexion = null;
    
    public function __construct(){
        $conexion = new Conexion();
        $this->_conexion = $conexion->getConexion();
    }
    
    public function constructBus() {
        try {
            for ($i = 0; $i <= 48; $i++) {
                $this->_matrizButacas[$i] = 0;
            }
            $serializedArrayButacas = serialize($this->_matrizButacas);

            $query = "UPDATE buses SET cantButacas=48, arrayButacas=? WHERE patenteBus='AF465FG'";
            $statement = $this->_conexion->prepare($query);
            $statement->bindParam(1, $serializedArrayButacas);
            $statement->execute();
            
            print_r($this->_matrizButacas);
        } catch (PDOException $e) {
            echo 'Exception caught: ' . $e->getMessage();
        }
    }

    public function showBus($array){
        for ($i = 0; $i <= 11; $i++) {
                echo "| ";
                for ($j = 0; $j <= 3; $j++) {
                    echo $array[$i][$j]." ";
                }
                echo "|";
                echo "<br>";
            }
    }
    
    public function showTableBus(){
        $count = 0;
        $query = "SELECT arrayButacas FROM buses WHERE patenteBus='AF465FG'";
        $statement = $this->_conexion->prepare($query);
        $statement->execute();
        $row = $statement->fetchColumn();
        $arrayBus = unserialize($row);
        
        for ($i = 0; $i < count($arrayBus)-1; $i++) {
            if ($arrayBus[$i] === 0) {
                $count++;
            }
        }
        
        return $count;
    }
    
    public function markButaca(){
         for ($i = 0; $i <= 12; $i++) {
                for ($j = 0; $j <= 4; $j++) {
                    $this->_matrizButacas[1][1] = 1;
                }
            }
    }
}
