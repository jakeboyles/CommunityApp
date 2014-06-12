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


		$scope.acceptOffer = function(number,comment) {

			var data = {
				user: number,
				comment: comment,
			}

			data = JSON.stringify(data);

			Communities.acceptOffer(data)
			.success(function(data){
				var n = notyfy({
						text: "Offer Accepted, Email Has Been Sent To Buyer",
						type: 'success',
						timeout: 3000,
				});
			})
			
			return false;
		};

		$scope.init = function() {
			$(document).ready(function(){
  				$('.bxslider').bxSlider({
  					pager:true,
  					controls:false,
  				});
			});	
		}



		$scope.createComment = function(){
			alert("B:"+$scope.comment.offer);
			if(!isNaN($scope.comment.offer) || $scope.comment.offer===undefined || $scope.comment.offer=="") {
			$scope.comment.postid = $routeParams.postid;
			Communities.postComment($scope.comment)
			.success(function(data){
				if(data.error) {
				var n = notyfy({
								text: data.error,
								type: 'error',
								timeout: 3000,
							});

				} else {
					Communities.getComments(str)
					 .success(function(data){
					 	$scope.comments = data;

					 	var n = notyfy({
								text: "Comment Posted!",
								type: 'success',
								timeout: 3000,
						});
					 })
				}
			})
		} else {
			var n = notyfy({
				text: "Quote must be a valid number",
				timeout: 3000,
				type: 'error',
			});
		}
		};
		    setTimeout(function(){
		$scope.init();
	},400);
	});

