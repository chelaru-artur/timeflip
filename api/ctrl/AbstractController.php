<?php

/*
 *	Abstract Controller class
 */
abstract class AbstractController {
	public function index() {
		echo 'test';
	}

	protected function is_ajax() {
		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			return true;
		}

		return false;
	}
}