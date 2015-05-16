var app = angular.module('app');

app.controller('medias', function ($scope, $http, $routeParams, $location) {

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
						$scope.media = val;
					}
				});
			}
		}).
		error(function(data, status, headers, config) {
		});
	};

	$scope.add = function() {
		$http.post('/medias/add', {media: $scope.media}).
		success(function(data, status, headers, config) {
			// on vide l'objet pour l'ajout d'un média
			$scope.media.nom = '';
			$scope.media.url = '';
			$scope.media.nbChaine = 0;
			$location.path('/medias');
		}).
		error(function(data, status, headers, config) {
			// on vide l'objet pour l'ajout d'un média
			$scope.media.nom = '';
			$scope.media.url = '';
			$scope.media.nbChaine = 0;
		});

	};
	$scope.edit = function() {
		
	};
	$scope.delete = function() {
		if($scope.media._id != undefined) {
			$http.delete('/medias/delete/'+$scope.media._id).
			success(function(data, status, headers, config) {
				// on vide l'objet pour l'ajout d'un média
				$scope.media._id = undefined;
				$scope.media.nom = '';
				$scope.media.url = '';
				$scope.media.nbChaine = 0;
				$location.path('/medias');
			}).
			error(function(data, status, headers, config) {
				// on vide l'objet pour l'ajout d'un média
				$scope.media._id = undefined;
				$scope.media.nom = '';
				$scope.media.url = '';
				$scope.media.nbChaine = 0;
			});
		}
	};

	// model d'un média
	$scope.media = {
		nom: '',
		url: '',
		nbChaine: 0
	};

	// liste des champs pour le formulaire d'un média
	$scope.fields = [
		{
			type: 'input',
			key: 'nom',
			templateOptions: {
				label: 'Nom du média',
				placeholder: 'Youtube'
			},
			validators: {
				isUnique: function($viewValue, $modelValue, scope) {
					var value = $modelValue || $viewValue;
					// Vérifier que le média n'est pas déjà présent en base
					return true;
				}
			}
		},
		{
			type: 'input',
			key: 'url',
			templateOptions: {
				label: 'Site du média',
				placeholder: 'https://youtube.com'
			},
			validators: {
				isUrl: function($viewValue, $modelValue, scope) {
					var value = $modelValue || $viewValue;
					// Vérifier que l'url est bien une url
					var regexUrl = /^https?\:\/\/.*\..{2,4}$/;
					if(value.match(regexUrl) !== null) {
						return true;
					}
					else {
						return false;
					}
				}
			}
		}
	];

	// on doit récupérer tous les medias en base
	$scope.medias = $scope.getAll();
});