'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
  'appServices',
  'appControllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/addtasks', {
        templateUrl : 'partials/tasklist.html',
        controller : 'MainCtrl'
      })
      .when('/tasklist', {
        templateUrl : 'partials/runtasks.html',
        controller : 'MainCtrl'
      })
      .otherwise({redirectTo: '/addtasks'});
}]);
