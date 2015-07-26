/**
 * Created by artur on 7/25/2015.
 */
var appServices = angular.module('appServices', []);


appServices.service('apiService', ['$http', function($http) {
    var url = '../api/countdown/gettasks';
    this.get = function() {
    	return $http({
			 method: 'POST',
			 url: url,
			 headers: {
			 	'X-Requested-With': 'XMLHttpRequest'
			 },
			 data: { test: 'test' }
		});
	};

}]);