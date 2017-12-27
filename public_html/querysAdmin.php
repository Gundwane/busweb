<?php
header('Content-Type: text/html; charset=UTF-8');
require_once './Conexion.php';

class querysAdmin
{
  private $conexion = null;

  function __construct()
  {
    $classConexion = new Conexion();
    $this->conexion = $classConexion->getConexion();
  }

  public function getCiudades(){
    $query = "SELECT idCiudad, nombre FROM ciudades";

    $statement = $this->conexion->prepare($query);
    $statement->execute();
    $array = $statement->fetchAll(PDO::FETCH_ASSOC);

    $new_array = simpleArray('idCiudad', 'nombre');

    return $new_array;
  }

  public function getEmpresas(){
    $query = "SELECT idEmpresa, nombreEmpresa FROM empresa";

    $statement = $this->conexion->prepare($query);
    $statement->execute();
    $array = $statement->fetchAll(PDO::FETCH_ASSOC);

    /*foreach ($array as $key => $value) {
      $id = $value['idCiudad'];
      $ciudad = $value['nombre'];
      $new_array[$id] = $ciudad;
    }*/
    $new_array = simpleArray();

    return $new_array;
  }

  //Asociativo a simple
  function simpleArray($array, $idArr, $valueArr){
    echo $idArr.' '.$valueArr;
    $new_array = array();
    foreach ($array as $key => $value) {
      $id = $value[$idArr];
      $ciudad = $value[$valueArr];
      $new_array[$id] = $ciudad;
    }

    print_r($new_array);
  }
}
