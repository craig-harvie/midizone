<?php

use Symfony\Component\HttpFoundation\Request;

$home = $app['controllers_factory'];

$home->get('/', function ( Request $request ) use ($app) {

	try {

		$qs = $request->query->get('o');
		$jsonPath = "loaders/default.json";

		if( !is_null( $qs ) ) {
			$jsonPath = "loaders/${qs}.json";
		}

		if( !file_exists( "loaders/${qs}.json" ) ) {
			throw new Exception('File does not exist');
		}

		$optionsString = file_get_contents($jsonPath, FILE_USE_INCLUDE_PATH);
		$optionsJson = json_decode($optionsString, true);

	} catch ( \Exception $e ) {

		$optionsString = file_get_contents("loaders/default.json", FILE_USE_INCLUDE_PATH);
		$optionsJson = json_decode($optionsString, true);

	}

    return $app['twig']->render(
        'home/home.html.twig',
        array(
            'options' => $optionsJson,
        )
    );
});

return $home;