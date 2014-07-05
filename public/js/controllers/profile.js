angular.module('ProfileController', ['angularFileUpload'])

// inject the Todo service factory into our controller
.controller('profileController', function($scope, $upload, $http,$routeParams,Communities,$location) {
	$scope.formData = "";

		Communities.getProfile($routeParams.profileid)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.profile = data; // assign our new list of todos				
				}).
		    error(function(data, status, headers, config) {
		    	$scope.error(data);
		});


		$scope.showPosts = function(){
			$(".profilePosts").show();
			$(".profileComments").hide();
		}

		$scope.showSendMessage = function() {
			$('#myModal').modal();
		}

		$scope.sendMessage = function(to) {
			$scope.message.to = to;
			$scope.message.from = $scope.user._id;
			Communities.postMessage($scope.message)
			.success(function(data){
				$('#myModal').modal('hide');
				var n = notyfy({
					text: 'Message Sent!',
					timeout: 3000,
					type: 'success',
				});
			})
		}


		$scope.showComments = function() {
			$(".profilePosts").hide();
			$(".profileComments").show();
		}

});


