<?php
class Conexion{
    private $_conexion = null;
    private $_usuario = 'root';
    private $_pass = '';
    
    public function __construct(){
        try{
            $this->_conexion = new PDO("mysql:host=localhost;dbname=carrito;charset=utf8", $this->_usuario, $this->_pass);
        }catch(PDOException $e){
            echo "Error en la conexion: ".$e->getMessage();
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
