angular.module('communityController', ['angularMoment','infinite-scroll'])


	// inject the Todo service factory into our controller
	.controller('mainController', function($scope,$rootScope,$location, $http, Communities) {
		$scope.formData = {};
		$scope.loading = true;
		var posts = [];
		var number = 0;
		$scope.posts = [];
		var page = {number:number};
		var noMore = false;

		Communities.get(page)
		.success(function(data) {
			for(i=0;i<data.length;i++) {
				posts.push(data[i]);
			}
			$scope.posts = posts;
			$scope.loading = false;
			setTimeout(function () {
				var container = document.querySelector('.listContain');
				var msnry = new Masonry( container, {
			 	 	itemSelector: '.item'
				});
			$scope.init();
			},400);
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

		$scope.loadMore = function() {
			alert("TEST")
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


    	$scope.init =function() {
			$(window).scroll(function()
			{
			    if($(window).scrollTop() == $(document).height() - $(window).height())
			    {
			    	number++;
					page = {number:number};

					if(noMore === false) {
			        	Communities.get(page)
						.success(function(data) {
						if(data.length===0) {
							noMore=true;
						}
						for(i=0;i<data.length;i++) {
							posts.push(data[i]);
						}
						$scope.posts = posts;
						$scope.loading = false;
						setTimeout(function () {
							var container = document.querySelector('.listContain');
							var msnry = new Masonry( container, {
						 	 	itemSelector: '.item'
							});
						},100);
						}); 
					}
			   	}
			});
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

		$scope.init();

	});

