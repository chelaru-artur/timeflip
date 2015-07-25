<?php

/*
 *	Main Router
 */
class Router {
	// Initialize the router class
	public static function init() {
		self::serve();
	}

	// Figure out the controller and the action, then call the controller with the action
	private static function serve() {
		$uri = substr($_SERVER['REQUEST_URI'], strlen(BASE));
		$params = explode('/', $uri);
		$controller = ($params[0] !== '/') ? ucfirst($params[0]).'Controller' : NULL;
		$action = isset($params[1]) ? $params[1] : NULL;
		$param = isset($params[2]) ? $params[2] : NULL;
		
		self::call($controller, $action, $param);
	}

	// Instantiate the correct controller and call the correct action
	private static function call($controller = NULL, $action = NULL, $param = NULL) {
		if(!is_null($controller)) {
			$ctrl = new $controller();

			if(!is_null($action)) {
				if(!is_null($param)) {
					$ctrl->$action($param);
				} else {
					$ctrl->$action();
				}
			} else {
				$ctrl->index();
			}
		} else {
			$ctrl = new WelcomeController();
			$ctrl->index();
		}
	}
}