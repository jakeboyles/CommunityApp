angular.module('communityService', [])
// super simple service
// each function returns a promise object 
.factory('Communities', function($http) {
return {
	get : function() {
	return $http.get('/api/posts');
	},
	getPost : function(id) {
	return $http.get('/api/posts/'+ id);
	},
	create : function(todoData) {
	return $http.post('/api/posts', todoData);
	},
	delete : function(id) {
	return $http.delete('/api/posts/' + id);
	},
	postSignUp: function(data) {
		return $http.post('/signup',data);
	},
	postSignIn: function(data) {
		return $http.post('/login',data);
	},
	loggedIn: function(data) {
		return $http.get('/login');
	},
	postComment: function(data) {
		return $http.post('/api/comment',data);
	}
}
});