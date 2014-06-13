angular.module('scotchTodo', ['communityController','ProfileController','SinglePostController','SigninController','PostController','SignupController', 'communityService','ngRoute'])

.config(function($routeProvider) {
$routeProvider
    .when('/', {
    controller:'mainController',
    templateUrl:'views/list.html'
    })
    .when('/post/:postid', {
    controller:'getPostController',
    templateUrl:'views/post.html'
    })
    .when('/profile/:profileid', {
    controller:'profileController',
    templateUrl:'views/profile.html'
    })
    .when('/signin', {
    controller:'signinController',
    templateUrl:'views/signin.html'
    })
    .when('/signup', {
    controller:'signupController',
    templateUrl:'views/signup.html'
    })
    .when('/post', {
    controller:'postController',
    templateUrl:'views/createPost.html'
    })
    .otherwise({
    redirectTo:'/'
    });
})

