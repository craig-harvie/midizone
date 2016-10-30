<?php

$home = $app['controllers_factory'];

$home->get('/', function () use ($app) {
    return $app['twig']->render(
        'hello/hello.html.twig'
    );
});

return $home;