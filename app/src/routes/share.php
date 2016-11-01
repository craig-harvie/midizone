<?php

$share = $app['controllers_factory'];

$share->get('/', function () use ($app) {
    return "Shared";
});

$share->post('/', function () use ($app) {
    return "Shared";
});

return $share;