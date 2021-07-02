<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('comments', 'CommentController@index');
$router->post('comments', 'CommentController@store');
$router->options('comments', 'CommentController@info');
$router->head('comments', 'CommentController@count');

$router->get('comments/{id:\d+}', 'CommentController@show');
$router->put('comments/{id:\d+}', 'CommentController@update');
$router->patch('comments/{id:\d+}', 'CommentController@update');
$router->delete('comments/{id:\d+}', 'CommentController@destroy');

// TODO
$router->get('comments/{slug}', 'CommentController@…');
