angular.module('SignupController', [])

// inject the Todo service factory into our controller
.controller('signupController', function($scope, $http, Communities,$location) {

	$scope.signup = function() {

			Communities.postSignUp($scope.signupData)
			.success(function(data){
					$rootScope.user = data;
					$location.url("/");
			}).
			error(function(data){
				var n = notyfy({
				text: data,
				type: 'error',
			});
			})
		
	}
});