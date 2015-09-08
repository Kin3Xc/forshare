angular.module('forshare.controllers', [])
.controller('loginController',function($scope, $location, $ionicModal, $timeout, Users, $state){

	// Form data for the login modal
  $scope.signupData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeSignup = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.signup = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doSignup = function() {
    console.log($scope.signupData);

    var users = new Firebase("https://forshare.firebaseio.com/users");
	users.createUser({
	  email    : $scope.signupData.email,
	  password : $scope.signupData.password
	}, function(error, userData) {
	  if (error) {
	    console.log("Error creating user:", error);
	  } else {
	    console.log("Successfully created user account with uid:", userData.uid);
	  }
	});

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
    	$scope.closeSignup();
      	$state.go('home');
    }, 1000);
  };
	
	//Defino el modelo a utilizar, en este caso un sensillo login
	//con los datos de usuario y clave
	$scope.login = {
		usuario: '',
		clave: ''
	};


	//Funcion para ingresar, se ejecuta al hacer clic sobre el boton Ingresar
	$scope.ingresar = function(){
		var ref = new Firebase("https://forshare.firebaseio.com/users");
		ref.authWithPassword({
		  email    : $scope.login.usuario,
		  password : $scope.login.clave
		}, function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		    $state.go('home');
		  }
		});
		//Aquí validaria los datos que ingresa el usuario
		// if ($scope.login.usuario != "" && $scope.login.clave != "") {
		// 	if ($scope.login.usuario === "root") {
		// 		if ($scope.login.clave === "root") {
		// 			// alert('Bienvenido al sistema');
		// 			$location.url("/home");
		// 		}else{
		// 			alert('Su clave es incorrecta\nPor favor vuelva a intentarlo');
		// 			$scope.login.clave = "";
		// 		}
		// 	}else{
		// 		alert('El usuario ingresado no existe\nPor favor vuelva a intentarlo');
		// 		$scope.login.usuario = "";
		// 	}
		// }else{
		// 	alert('Existen campos vacios, por favor verifique\nIngrese todos los datos.');
		// }
	};
})


//Controlador para octener la pocision actual del usuario
.controller('HomeCtrl', [ '$scope', '$cordovaGeolocation', 'mapa', function($scope, $cordovaGeolocation, mapa){
	$scope.titulo = "Pocisión actual";
	var posOptions = {timeout: 5000, enableHighAccuracy: true};
	 	$scope.lat;
	 	$scope.long;
	 	$cordovaGeolocation
	    .getCurrentPosition(posOptions)
	    .then(function(position) {
	      var lat  = position.coords.latitude
	      var long = position.coords.longitude

	      mapa.render(lat, long);

	      $scope.lat = lat;
	      $scope.long = long;

	    }, function(err) {
	      // error
	      console.log('Error: ' + err);
    });
}]);