angular.module('scotchTodo', ['communityController','SigninController','PostController','SignupController', 'communityService','ngRoute'])

.config(function($routeProvider) {
$routeProvider
    .when('/', {
    controller:'mainController',
    templateUrl:'views/post.html'
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
    .when('/projects/:projectid', {
    controller:'projectCtrl',
    templateUrl:'project.html'
    })
    .otherwise({
    redirectTo:'/'
    });
})

