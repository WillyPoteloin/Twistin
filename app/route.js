var app = angular.module('app');

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'public/views/home.html'
	})
	.when('/404', {
		templateUrl: 'public/views/404.html'
	})
	.otherwise({
		redirectTo: '/404'
	});
});