angular.module('SigninController', [])

// inject the Todo service factory into our controller
.controller('signinController', function($rootScope,$scope, $http, Communities,$location) {


	$scope.showMessage = function(message) {
			$(".messages").hide();
			$(".backButton").show();
			$scope.oneMessage = message;
			$(".singleMessage").show();
	}

	$scope.signin = function() {
		Communities.postSignIn($scope.signupData)
		.success(function(data){
				$scope.user = data;
				console.log(data);
				$location.url("/");
				if(!data._id) {
					var n = notyfy({
						text: "Wrong Username or Password",
						timeout: 3000,
						type: 'error',
					});
				}
		}).
		error(function(data){
			var n = notyfy({
				text: "Wrong Username or Password",
				timeout: 3000,
				type: 'error',
			});
		})
	}
});