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
		return $http.post('/api/signup',data);
	},
	postSignIn: function(data) {
		return $http.post('/login',data);
	},
	loggedIn: function(data) {
		return $http.get('/login');
	},
	getProfile: function(data) {
		return $http.get('/api/profile/'+ data);
	},
	postComment: function(data) {
		return $http.post('/api/comment',data);
	},
	getComments: function(data) {
		return $http.post('/api/allComments',data);
	},
	acceptOffer:function(data) {
		return $http.post('/api/acceptOffer',data);
	}
}
});