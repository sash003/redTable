<?php
//г. Винница ул. Гудвина 52/21 (000) 000-00-00
error_reporting(E_ALL);

$root = __DIR__."/../config";

require 'Connect.php';

if(isset($_POST['func'])){
  $func = escapeStr($_POST['func']);
  $func();
  $db = null;
}


function updateRow(){
  $db = $GLOBALS['db'];
  $id = intval($_POST['id']);
  $colName = escapeStr($_POST['colName'], true);
  $text = escapeStr($_POST['text']);
  $sql = 'update `'.$GLOBALS['table'].'` set `'.$colName.'`=? where `id`=?';
  $stmt = $db->prepare($sql);
  echo $stmt->execute([$text, $id]);
}

function delRow(){
  $db = $GLOBALS['db'];
  $id = escapeStr($_POST['id'], true);
  $sql = "delete from `".$GLOBALS['table']."` where `id`=?";
  $stmt = $db->prepare($sql);
  echo $stmt->execute(array($id));
}

function addRow(){
  $db = $GLOBALS['db'];
  $sql = "insert into `".$GLOBALS['table']."` (`id`) values (null)";
  $stmt = $db->prepare($sql);
  echo $stmt->execute();
}

function delColumn(){
  $db = $GLOBALS['db'];
  $colName = escapeStr($_POST['colName'], true);
  $sql =  "ALTER TABLE `".$GLOBALS['table']."` DROP `$colName`";
  $stmt = $db->prepare($sql);
  echo $stmt->execute();
}

function addColumn(){
  $db = $GLOBALS['db'];
  $colName = escapeStr($_POST['colName'], true);
  $colType = mb_strtoupper(escapeStr($_POST['colType']));
  if(preg_match('/^INT/i', $colType)){
    $charset = "";
  }else{
    $charset = "CHARACTER SET utf8 COLLATE utf8_general_ci";
  }
  $sql = "ALTER TABLE `".$GLOBALS['table']."` ADD `$colName` $colType $charset NOT NULL";
  $stmt = $db->prepare($sql);
  echo $stmt->execute();
}

function setNewColumnName(){
  $db = $GLOBALS['db'];
  $oldName = escapeStr($_POST['oldName'], true);
  $name = escapeStr($_POST['name'], true);
  $type = escapeStr($_POST['type']);
  if(preg_match('/^INT/i', $type)){
    $charset = "";
  }else{
    $charset = "CHARACTER SET utf8 COLLATE utf8_general_ci";
  }
  $sql = "ALTER TABLE `".$GLOBALS['table']."` CHANGE `$oldName` `$name`  $type $charset NOT NULL";
  $stmt = $db->prepare($sql);
  echo $stmt->execute();
}

function escapeStr($str, $param=null){
  $str = trim($str);
  $str = htmlentities($str);
  $str = preg_replace('/`/iu', '', $str);
  if($param){
    $str = preg_replace('/[^\w\-а-я]/iu', '', $str);
  }else{
    $str = preg_replace('/`/iu', '', $str);
  }
  return $str;
}
