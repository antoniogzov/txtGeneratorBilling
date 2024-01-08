<?php
set_time_limit(0);

class Groups extends data_conn
{
    private $conn;
    public function __construct()
    {
        $this->conn = $this->dbConn();
    }

    public function getData($stmt)
    {
        $results = array();

        try {

            $query = $this->conn->query($stmt);

            while ($row = $query->fetch(PDO::FETCH_OBJ)) {
                $results[] = $row;
            }
        } catch (Exception $e) {
            print_r($stmt);
            var_dump($e->getMessage());
        }

        return $results;
    }

    public function insertData($stmt)
    {
        $result = false;

        try {

            if ($this->conn->query($stmt)) {
                $result = true;
            }
        } catch (Exception $e) {
            echo 'Exception -> ' . $this->conn->query($stmt);
            var_dump($e->getMessage());
        }

        return $result;
    }

}