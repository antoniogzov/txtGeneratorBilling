<?php
class data_conn
{
    
    private $db_name = "families_ykt";
    private $db_port = 3306;
    private $db_user = "usuario";
    private $db_pass = "UsuarioRemoto2020";
    private $db_host = "servykt.homeip.net:3306";
    private $db_conn;

    /* protected $db_name = "families_ykt";
    protected $db_user = "developer";
    protected $db_pass = "Ykt2021a*";
    protected $db_host = "servykt.homeip.net:3307";
    private $db_conn; */
/**/
    public function dbConn()
    {
        try {
            $this->db_conn = new PDO("mysql:host={$this->db_host}; dbname={$this->db_name}; charset=utf8", $this->db_user, $this->db_pass);
            $this->db_conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //echo "Connected";
        } catch (PDOException $e) {
            //echo "ERROR" . $e->getMessage();
            $response = array('response' => false,
                              'message' => 'Error al intentar conectarse a la base de datos :/');
            echo json_encode($response);
            exit();
        }
        return $this->db_conn;
    }
    
}
