<?php

  error_reporting(E_ALL);
  
  header ("Content-Type:text/html; charset=UTF-8", false);
  header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
  header("Last-Modified: " . gmdate("D, d M Y H:i:s")." GMT");
  header("Cache-Control: no-cache, must-revalidate");
  header("Cache-Control: post-check=0,pre-check=0", false);
  header("Cache-Control: max-age=0", false);
  header("Pragma: no-cache");
  
  $root = __DIR__."/config";
  
  require 'php/Connect.php';
  
?>

<!doctype html>

<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="stylesheet" href="css/style.css" />    
</head>

<body>
<div id="addWrap">
  <span id="addColumn">Добавить столбец</span><br /><br />
  <span id="addRow">Добавить строку</span>
</div>
<div class="wrap">
<h1>Редактор табличных данных</h1><br />

<div id="tableWrap">

<?php
  $sql="select * from `$table`";
  $sql2 = "SHOW COLUMNS FROM `$table`";
  $result=$db->query($sql);
  $result2=$db->query($sql2);
  $data = $result->fetchAll();
  $data2 = $result2->fetchAll(\PDO::FETCH_ASSOC);
  $countFields = count($data2);
  echo "<table>";
  echo "<thead><tr>";
  
  for($i = 0; $i < $countFields; $i++){
    echo "<td spellcheck='false'  data-type='".$data2[$i]['Type']."'>".$data2[$i]['Field']."<span class='reddel' contenteditable='false'><img src='images/red.png' class='red' alt='' /><img src='images/del.png' class='del' alt='' /></span></td>";
  }
  echo "</tr></thead>";
  
  if($data){
    $countCols = count($data[0]);
    echo "<tbody>";
    foreach($data as $row){
      echo "<tr>";
      for($i = 0; $i < $countCols ; $i++){
        echo "<td id='row".$row[0]."_col_".$data2[$i]['Field']."'>".$row[$i]."</td>";
      }
      echo "</tr>";
    }
    echo "</tbody>";
  }
  echo "</table>";
?>
</div>
</div>

<div id="addColumnDo">
  Введите имя столбца<br /><br />
  <span contenteditable="true" id="colName">Column</span><br /><br />
  Введите тип столбца<br /><br />
  <span contenteditable="true" id="colType">varchar(255)</span>
  <br /><br />
  <span id="addCol">Добавить</span>
</div>

<div id="delColumn">
  <span id="delCol">Точно?</span>
</div>

<div id="delRow">
  <span id="delRowConf">Точно?</span>
</div>

<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/script.js"></script>

</body>
</html>