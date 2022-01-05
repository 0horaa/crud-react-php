<?php

define('HOST', 'localhost');
define('DATABASE', 'crud_react');
define('USER', 'root');
define('PASSWORD', '');

$connect = new PDO('mysql:host=' . HOST . ';dbname=' . DATABASE, USER, PASSWORD);

//conexão com a porta
// DEFINE('PORT', '3306');
// $connect = new PDO('mysql:host=' . HOST . ';port=' . PORT. ';dbname=' . DATABASE, USER, PASSWORD);