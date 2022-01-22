<?php
/**
 * Router script for development server.
 * Usage:
 * > php -S localhost:8000 -t public devrouter.php
 */
$path = pathinfo($_SERVER["SCRIPT_FILENAME"]);
if ($path["extension"] == "js") {
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: text/javascript");
    readfile($_SERVER["SCRIPT_FILENAME"]);
} else {
    return false;
}
