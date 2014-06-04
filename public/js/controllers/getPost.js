angular.module('SinglePostController', [])

	// inject the Todo service factory into our controller
	.controller('getPostController', function($scope, $routeParams, $http, Communities) {
		$scope.post;
		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Communities.getPost($routeParams.postid)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.post = data[0]; // assign our new list of todos
				}).
		    error(function(data, status, headers, config) {
		      alert(data)
		});


		$scope.createComment = function(){
			$scope.comment.id = $routeParams.postid;
			Communities.postComment($scope.comment)
			.success(function(data){
				$scope.post = data;
			})
		};

	});

