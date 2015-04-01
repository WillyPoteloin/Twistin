var app = angular.module('app');

app.controller('channels', function ($scope) {
	$scope.channels = [
		{
			name: 'Maxime Musqua',
			image: 'public/images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
			links: []
		}
	];

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