angular.module('forshare.services', [])


// retorna un arry de objetos con todos los usuarios
.factory("Users", function($firebaseArray) {
	var users = new Firebase("https://forshare.firebaseio.com/users");
	return $firebaseArray(users);
})

// factoria para obtener la pocicion actual
.factory('mapa', function(){
	service = {};

	service.render = function(lat, long){
		var location = new google.maps.LatLng(lat, long);
		var option = {
			zoom: 14,
			center: location,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		directionsDisplay = new google.maps.DirectionsRenderer();

		map = new google.maps.Map(document.getElementById('map'), option);

		directionsDisplay.setMap(map);

		marker = new google.maps.Marker({
			map: map,
			position: location,
			title: 'Mi ubicación'
		});

	}
	return service;
})