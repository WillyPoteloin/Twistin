var app = angular.module('app');

app.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/manager/home.html'
	})
	.when('/home', {
		redirectTo: '/'	})
	.when('/404', {
		templateUrl: 'views/404.html'
	})
	.otherwise({
		redirectTo: '/404'
	});

	// $locationProvider.html5Mode(true);
});