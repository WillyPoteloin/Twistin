var app = angular.module('app');

app.controller('channels', function ($scope) {
	$scope.channels = [
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
		{
			name: 'Fail Army',
			image: 'images/failarmy.png',
			url: '',
			description: 'La chaine Fail Army',
		},
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
	];

	$scope.selectedChannels = [];

	$scope.addChannelToSelection = function(channel) {
		$scope.selectedChannels.push(channel);
	};

	// Ajout d'un channel
	$scope.add = function(channel) {
		$scope.channels.push(channel);
	};

	// Suppression d'un channel
	$scope.remove = function(channel) {
		var index = $scope.channels.indexOf(channel);
		$scope.channels.splice(index, 1);
	};

	// Récupération des liens des vidéos d'un channel
	$scope.getLinks = function(channel) {
	};

});