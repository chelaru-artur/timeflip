'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
  'appServices',
  'appControllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
