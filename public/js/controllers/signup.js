angular.module('SignupController', [])

// inject the Todo service factory into our controller
.controller('signupController', function($scope, $http, Communities,$location) {

	$scope.signup = function() {

			Communities.postSignUp($scope.signupData)
			.success(function(data){
					$scope.user = data;
					console.log(data);
					$location.url("/");
			})
		
	}
});