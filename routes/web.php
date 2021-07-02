<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('comments/{slug}', 'CommentController@index');
$router->post('comments/{slug}', 'CommentController@store');

$router->get('comments/{slug}/{lid:\d+}', 'CommentController@show');
$router->post('comments/{slug}/{lid:\d+}', 'CommentController@reply');
$router->put('comments/{slug}/{lid:\d+}', 'CommentController@update');
$router->patch('comments/{slug}/{lid:\d+}', 'CommentController@update');
$router->delete('comments/{slug}/{lid:\d+}', 'CommentController@destroy');
