<?php

$app->mount('/', include 'routes/home.php');
$app->mount('/hello', include 'routes/hello.php');