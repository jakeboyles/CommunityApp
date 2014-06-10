angular.module('communityController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', function($scope,$rootScope,$location, $http, Communities) {
		$scope.formData = {};
		$scope.loading = true;


		Communities.get()
		.success(function(data) {
			$scope.posts = data;
			$scope.loading = false;
		});

		Communities.loggedIn()
		.success(function(data){
			$rootScope.user = data;
		}).
		error(function(data){
			$location.url("/signin")
		})


    	setTimeout(function () {
		var container = document.querySelector('.listContain');
			var msnry = new Masonry( container, {
			  // options
			  itemSelector: '.item'
			});
		},200);


    	$scope.menuClick = function() {
				$(".mobileNav").toggle();
    	}



		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deletepost = function(id) {
			$scope.loading = true;

			Communities.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					if(data.error){
						alert(data.error);
						$scope.loading = false;
					}else {
						$scope.loading = false;
						$scope.posts = data; // assign our new list of todos
					}
				})
		};
	});