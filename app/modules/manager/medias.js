var app = angular.module('app');

app.controller('medias', function ($scope, $http, $routeParams) {

	$scope.getAll = function() {	
		// on appel l'API pour récupérer les medias
		$http.get('/medias').
		success(function(data, status, headers, config) {
			$scope.medias = data;
			// on regarde si on est sur un média
			if($routeParams.id != undefined) {
				// on doit trouver le media dans le tableau de media
				$.each($scope.medias, function(index, val) {
					if($routeParams.id === val._id) {
						$scope.mediaCurrent = val;
					}
				});
			}
		}).
		error(function(data, status, headers, config) {
		});
	};

	$scope.add = function() {
		$http.post('/medias/add', {media: $scope.mediaToAdd}).
		success(function(data, status, headers, config) {
			// on vide l'objet pour l'ajout d'un média
			$scope.mediaToAdd.nom = '';
			$scope.mediaToAdd.url = '';
			$scope.mediaToAdd.nbChaine = 0;
		}).
		error(function(data, status, headers, config) {
			// on vide l'objet pour l'ajout d'un média
			$scope.mediaToAdd.nom = '';
			$scope.mediaToAdd.url = '';
			$scope.mediaToAdd.nbChaine = 0;
		});

	};
	$scope.edit = function() {
		
	};
	$scope.delete = function() {
		if($scope.mediaCurrent._id != undefined) {
			$http.delete('/medias/delete/'+$scope.mediaCurrent._id).
			success(function(data, status, headers, config) {
				// on vide l'objet pour l'ajout d'un média
				$scope.mediaCurrent._id = undefined;
				$scope.mediaCurrent.nom = '';
				$scope.mediaCurrent.url = '';
				$scope.mediaCurrent.nbChaine = 0;
			}).
			error(function(data, status, headers, config) {
				// on vide l'objet pour l'ajout d'un média
				$scope.mediaCurrent._id = undefined;
				$scope.mediaCurrent.nom = '';
				$scope.mediaCurrent.url = '';
				$scope.mediaCurrent.nbChaine = 0;
			});

		}
	};

	// objet pour l'édition d'un média
	$scope.mediaCurrent = {
		nom: '',
		url: '',
		nbChaine: 0
	};

	// objet pour l'ajout d'un média
	$scope.mediaToAdd = {
		nom: '',
		url: '',
		nbChaine: 0
	};

	// on doit récupérer tous les medias en base
	$scope.medias = $scope.getAll();
});