<?php

/*
 *	ENTRY POINT
 */
require 'config.php';

function __autoload($class) {
	include_once CTRL.$class.'.php';
}

Router::init();