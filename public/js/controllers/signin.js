angular.module('SigninController', [])

// inject the Todo service factory into our controller
.controller('signinController', function($scope, $http, Communities,$location) {

	$scope.signin = function() {
		alert("HE");
		Communities.postSignIn($scope.signupData)
		.success(function(data){
			if(data!="") {
				$scope.user = data;
				console.log(data);
				$location.url("/");
			}
		})
	}
});