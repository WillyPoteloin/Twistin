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

	// méthode pour l'éxécution de js dans la vue qui utilise le controller
	$scope.init = function() {
		var drake = dragula([document.querySelector('#channels'),document.querySelector('#mix_zone')],{
			revertOnSpill: true,
			direction: 'horizontal',
			moves: function(el, container) {
				return ($(el).hasClass('no_drag')) ? false : true;
			},
			accepts: function(el, target, source, siblings){
				if($(target).is($(source))) return false;
				return true;
			},
		});
		drake.on('dragend', function(){	
			// si on a rien dans la sélection alors on la cache
			if($('#mix_zone').find('*:not(.placeholder)').length <= 0) {
				$("#mix_zone").fadeOut();
			}
		});
		drake.on('cancel', function(){	
			// si on a rien dans la sélection alors on la cache
			if($('#mix_zone').find('*:not(.placeholder)').length <= 0) {
				$("#mix_zone").fadeOut();
			}
		});
		drake.on('drag', function(el, container){
			$('#mix_zone').fadeIn();
			if($('#mix_zone').find('*:not(.placeholder)').length <= 0) {
				$("#mix_zone p.no_drag").show();
			}
		});
		drake.on('drop', function(el, container, source){
			// si on a rien dans la sélection alors on la cache
			if($('#mix_zone').find('*:not(.placeholder)').length <= 0) {
				$("#mix_zone").fadeOut();
			}

			// si on drop dans la sélection alors on doit ajouter la chaine à la liste des chaines sélectionnées
			if($(container).is($('#mix_zone'))) {
			}
		});
		drake.on('shadow', function(el, container){
			// si on drop dans la zone de sélection on supprime le message
			if($(container).is($('#mix_zone'))) {
				$("#mix_zone p.no_drag").hide();
			}
			else {
				if($('#mix_zone').find('*:not(.placeholder)').length <= 0) {
					$("#mix_zone p.no_drag").show();
				}
			}
		});
	};

	$scope.init();

});