<?php

$xml = simplexml_load_file("$root/db_conf.xml");

$host = $xml->host[0];
$dbname = $xml->dbname[0];
$user = $xml->user[0];
$password = $xml->password[0];
$table = $xml->table[0];

$db = new \PDO("mysql: host=$host; dbname=$dbname", $user, $password);
        
$db->setAttribute( \PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION );
$db->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_NUM); 
$db->exec("SET NAMES 'utf8'"); 
$db->exec("SET CHARACTER SET 'utf8'");
$db->exec("SET SESSION collation_connection = 'utf8_general_ci'");