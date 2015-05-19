var app = angular.module('app');

app.controller('medias', function ($scope, $http, $routeParams, $location) {

	$scope.getAll = function(callback) {	
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

			callback();
		}).
		error(function(data, status, headers, config) {
		});
	};

	$scope.add = function() {
		if($scope.form.$invalid) return false;
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
	$scope.update = function() {
		if($scope.form.$invalid) return false;
		$http.post('/medias/update/'+$scope.media._id, {media: $scope.media}).
		success(function(data, status, headers, config) {
			$location.path('/medias');
		}).
		error(function(data, status, headers, config) {
		});
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

	// on doit récupérer tous les medias en base
	$scope.medias = $scope.getAll(function() {

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
					notEmpty: function($viewValue, $modelValue, scope) {
						var value = $modelValue || $viewValue;
						return value !== '';
					},
					isUnique: function($viewValue, $modelValue, scope) {
						var value = $modelValue || $viewValue;
						// On parcours chaque média pour voir si le nom existe déjà
						var test = true;
						$.each($scope.medias, function(index, val) {
							if(val.nom == value && val._id != $scope.media._id) {
								test = false;
								return;
							}
						});

						return test;
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
					notEmpty: function($viewValue, $modelValue, scope) {
						var value = $modelValue || $viewValue;
						return value !== '';
					},
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
					},
					isUnique: function($viewValue, $modelValue, scope) {
						var value = $modelValue || $viewValue;
						// On parcours chaque média pour voir si le nom existe déjà
						var test = true;
						$.each($scope.medias, function(index, val) {
							if(val.url == value && val._id != $scope.media._id) {
								test = false;
								return;
							}
						});

						return test;
					}
				}
			}
		];
	});

});