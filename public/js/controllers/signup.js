angular.module('SignupController', [])

// inject the Todo service factory into our controller
.controller('signupController', function($scope, $http, Communities,$location) {

	$scope.signup = function() {
		var email = $scope.signupData.email;
		email = email.toLowerCase();
		var check = email.indexOf('miamioh.edu');
		alert(check);
		if(check >= 0) {
			Communities.postSignUp($scope.signupData)
			.success(function(data){
				if(data!="") {
					$rootScope.user = data;
					console.log(data);
					$location.url("/");
				}
			})
		}
		else {
			alert("Must contain miami email")
		}
	}
});