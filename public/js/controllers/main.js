angular.module('communityController', ['angularMoment'])


	// inject the Todo service factory into our controller
	.controller('mainController', function($scope,$rootScope,$location, $http, Communities) {
		$scope.formData = {};
		$scope.loading = true;


		Communities.get()
		.success(function(data) {
			$scope.posts = data;
			$scope.loading = false;
			setTimeout(function () {
				var container = document.querySelector('.listContain');
				var msnry = new Masonry( container, {
			 	 	itemSelector: '.item'
				});
			},100);
		});

		Communities.loggedIn()
		.success(function(data){
			$rootScope.user = data;
		}).
		error(function(data){
			$location.url("/signin")
		})


		$scope.searchButton = function() {
		 $location.url("/search/"+$scope.search);
		 $(".search").hide();
		}


		$scope.showSearch = function() {
			$(".search").toggle();
		}


		Communities.getMessage()
		.success(function(data){
			$rootScope.messages = data;
		})
		

		$scope.showMessageBox = function() {
			$('#viewModal').modal();
		}

		$scope.deleteMessage = function(id){
			Communities.deleteMessage(id)
			.success(function(data){
				Communities.getMessage()
				.success(function(data){
					$rootScope.messages = data;
					var n = notyfy({
						text: 'Message Deleted',
						timeout: 3000,
						type: 'success',
					});
				})
			})
		}
	
		$scope.showMessage = function(message) {
			$(".messages").hide();
			$(".backButton").show();
			$scope.oneMessage = message;
			$(".singleMessage").show();
			Communities.readMessage(message)
			.success(function(data){
				Communities.getMessage()
				.success(function(data){
					$rootScope.messages = data;
				})
			})
		}

		$scope.viewMessages = function() {
			$('#viewModal').modal();
			$(".backButton").hide();
			$(".singleMessage").hide();
			$(".messages").show();
		}


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


