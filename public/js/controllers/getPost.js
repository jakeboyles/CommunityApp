angular.module('SinglePostController', [])

	// inject the Todo service factory into our controller
	.controller('getPostController', function($scope, $routeParams,$location, $http, Communities) {
		$scope.post;
		var id =  $routeParams.postid;
		var post = {
    	postid:id,
		};
		str = JSON.stringify(post);


		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Communities.getPost($routeParams.postid)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.post = data[0]; // assign our new list of todos
					
				}).
		    error(function(data, status, headers, config) {
		    	$scope.error(data);
		});



    	Communities.getComments(str)
	 		.success(function(data){
	 			$scope.comments = data;
			}).
			error(function(data, status, headers, config) {
		    	$scope.error(data);
		    })

		    		




		$scope.createComment = function(){
			$scope.comment.postid = $routeParams.postid;
			Communities.postComment($scope.comment)
			.success(function(data){
				if(typeof data.redirect == 'string') {
					$location.url("/signin");
				} else {
					Communities.getComments(str)
					 .success(function(data){
					 	$scope.comments = data;
					 })
				}
			})
		};

	});

