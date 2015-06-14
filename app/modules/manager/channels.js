var app = angular.module('app');

app.controller('channels', function ($scope, $http, $routeParams, $location, FileUploader) {

	// model d'une chaine
	$scope.channel = {
		nom: '',
		description: '',
		url: '',
		media: '',
		img: '',
		followerSource: 0,
		followerTwistin: 0,
		nbRefus: 0,
		dateAjout: '',
		dateMaj: '',
	};

	// on déclare une variable sur le scope pour récupérer l'upload d'une image pour la chaine
	$scope.uploader = new FileUploader({
		url: '/upload'
	});

	$scope.uploader.onWhenAddingFileFailed = function(item, filter, options) {
	};
	$scope.uploader.onAfterAddingFile = function(fileItem) {
		$scope.uploader.uploadItem(fileItem);
	};
	$scope.uploader.onBeforeUploadItem = function(item) {
	};
	$scope.uploader.onProgressItem = function(fileItem, progress) {
	};
	$scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
	};
	$scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
	};
	$scope.uploader.onCancelItem = function(fileItem, response, status, headers) {
	};
	$scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
		if(response == 'nok') {

		}
		else if(response.path !== undefined) {
			var file = response;
			$scope.channel.img = file.path.replace('public/', '');
		}
	};

	// on regarde si on est sur une chaine en particulier avec la route
	if($routeParams.id != undefined) {
		// on doit trouver la chaine en base
		$http.get('/channels/'+$routeParams.id).
		success(function(data, status, headers, config) {
			$scope.channel = data;
		}).
		error(function(data, status, headers, config){
		});
	}

	$scope.getAll = function(callback) {	
		// on appel l'API pour récupérer les chaines
		$http.get('/channels').
		success(function(data, status, headers, config) {
			$scope.channels = data;
			callback();
		}).
		error(function(data, status, headers, config) {
		});
	};

	$scope.add = function() {
		if($scope.form.$invalid) return false;
		$http.post('/channels/add', {channel: $scope.channel}).
		success(function(data, status, headers, config) {
			// on vide l'objet pour l'ajout d'une chaine
			$scope.channel = {
				nom: '',
				description: '',
				url: '',
				media: '',
				img: '',
				followerSource: 0,
				followerTwistin: 0,
				nbRefus: 0,
				dateAjout: '',
				dateMaj: '',
			};
			$location.path('/channels');
		}).
		error(function(data, status, headers, config) {
			// on vide l'objet pour l'ajout d'une chaine
			$scope.channel = {
				nom: '',
				description: '',
				url: '',
				media: '',
				img: '',
				followerSource: 0,
				followerTwistin: 0,
				nbRefus: 0,
				dateAjout: '',
				dateMaj: '',
			};
		});
	};
	$scope.update = function() {
		if($scope.form.$invalid) return false;
		$http.post('/channels/update/'+$scope.channel._id, {media: $scope.channel}).
		success(function(data, status, headers, config) {
			$location.path('/channels');
		}).
		error(function(data, status, headers, config) {
		});
	};
	$scope.delete = function() {
		if($scope.channel._id != undefined) {
			$http.delete('/channels/delete/'+$scope.channel._id).
			success(function(data, status, headers, config) {
				// on vide l'objet pour l'ajout d'une chaine
				$scope.channel = {
					nom: '',
					description: '',
					url: '',
					media: '',
					img: '',
					followerSource: 0,
					followerTwistin: 0,
					nbRefus: 0,
					dateAjout: '',
					dateMaj: '',
				};
				$location.path('/medias');
			}).
			error(function(data, status, headers, config) {
				// on vide l'objet pour l'ajout d'une chaine
				$scope.channel = {
					nom: '',
					description: '',
					url: '',
					media: '',
					img: '',
					followerSource: 0,
					followerTwistin: 0,
					nbRefus: 0,
					dateAjout: '',
					dateMaj: '',
				};
			});
		}
	};
	$scope.imgDelete = function(){
		$scope.channel.img = '';
	};

	// on doit récupérer tous les chaines en base
	$scope.channels = $scope.getAll(function() {

		// liste des champs pour le formulaire d'une chaine
		$scope.fields = [];
	});

});