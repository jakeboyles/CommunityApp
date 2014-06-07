angular.module('PostController', ['angularFileUpload'])

// inject the Todo service factory into our controller
.controller('postController', function($scope, $upload, $http, Communities,$location) {

Communities.loggedIn()
	.success(function(data){
		if(data.error) {
			$location.url("/signin")
		}
		$scope.user = data;

	}).
	error(function(data){
		$location.url("/signin")
})

// CREATE ==================================================================
// when submitting the add form, send the text to the node API
$scope.createpost = function() {
	$scope.loading = true;
	$scope.formData.images = images;
	// validate the formData to make sure that something is there
	// if form is empty, nothing will happen

		// call the create function from our service (returns a promise object)
		Communities.create($scope.formData)
			// if successful creation, call our get function to get all the new todos
			.success(function(data) {
				if(data!=="0") {
					$scope.loading = false;
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.posts = data; // assign our new list of todos
					$location.url("/");
				} else {
					$scope.loading = false;
				}
			});
};


var images = [];

$scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    if(images.length<5) {
    for (var i = 0; i < $files.length; i++) {
      var $file = $files[i];
      $upload.upload({
        url: 'post/image',
        file: $file,
        progress: function(e){}
      }).then(function(data, status, headers, config) {
      	var str = data.data;
      	str = str.replace(/"/g, "");
      	images.push(str);
        $scope.image = images[0];
        $scope.formData.images = images;
        $scope.$apply()
      }); 
    }
    } else {
    	var n = notyfy({
					text: 'You can only upload 5 images',
					type: 'error',
		});
    }
 }

});

