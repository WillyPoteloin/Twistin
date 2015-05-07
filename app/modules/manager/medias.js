var app = angular.module('app');

app.controller('medias', function ($scope, $http) {

	// on doit récupérer tous les medias en base
	$scope.medias = [];

	// on appel l'API pour récupérer les medias
	$http.get('/medias').
	success(function(data, status, headers, config) {
		// this callback will be called asynchronously
		// when the response is available
	}).
	error(function(data, status, headers, config) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
	});

	$scope.add = function() {
		$http.post('/medias/add').
		success(function(data, status, headers, config) {
			// this callback will be called asynchronously
			// when the response is available
		}).
		error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	};
});