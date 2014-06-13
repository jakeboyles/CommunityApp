angular.module('SigninController', [])

// inject the Todo service factory into our controller
.controller('signinController', function($rootScope,$scope, $http, Communities,$location) {

	$scope.signin = function() {
		Communities.postSignIn($scope.signupData)
		.success(function(data){
				$scope.user = data;
				console.log(data);
				$location.url("/");
		}).
		error(function(data){
			var n = notyfy({
				text: "Wrong Username or Password"
				timeout: 3000,
				type: 'error',
			});
		})
	}
});