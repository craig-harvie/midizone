<?php

require_once __DIR__.'/../vendor/autoload.php';

// Create the application
$app = new \Silex\Application();

// Include the app and routes files
require __DIR__.'/../app/src/app.php';
require __DIR__.'/../app/src/routes.php';

$app->run();