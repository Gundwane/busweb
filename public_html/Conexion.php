<?php
class Conexion{
    private $_conexion = null;
    private $_usuario = 'root';
    private $_pass = '';

    public function __construct(){
        try{
            $this->_conexion = new PDO("mysql:host=localhost;dbname=carrito;charset=utf8", $this->_usuario, $this->_pass);
            $this->_conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }catch(PDOException $e){
            echo 'Falló la conexión: ' . $e->getMessage();
        }
    }

    /**
     *
     * @return PDO
     */
    public function getConexion(){
        return $this->_conexion;
    }
}
