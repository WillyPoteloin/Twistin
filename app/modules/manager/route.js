var app = angular.module('app');

app.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'manager/views/home.html'
	})
	.when('/home', {
		redirectTo: '/'})
	.when('/medias', {
		templateUrl: 'manager/views/medias.html'})
	.when('/medias/add', {
		templateUrl: 'manager/views/media.html'})
	.when('/medias/:id', {
		templateUrl: 'manager/views/media.html'})
	.when('/channels', {
		templateUrl: 'manager/views/channels.html'})
	.when('/channels/add', {
		templateUrl: 'manager/views/channel.html'})
	.when('/channels/:id', {
		templateUrl: 'manager/views/channel.html'})
	.when('/404', {
		templateUrl: 'manager/views/404.html'
	})
	.otherwise({
		redirectTo: '/404'
	});

	// $locationProvider.html5Mode(true);
});