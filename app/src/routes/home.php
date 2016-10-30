<?php

$home = $app['controllers_factory'];

$home->get('/', function () use ($app) {
    return $app['twig']->render(
        'home/home.html.twig'
    );
});

return $home;