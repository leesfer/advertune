'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

	.controller('LandingPageController', [function() {
		confetti();
		bubbles();
	}])

	.controller('advertiserController', ['$scope', 'advertiserService', function($scope, advertiserService){

		// Store data from the advertiser form
		$scope.advertiser = {firstname: '', lastname: '', email: '', budget: ''};

		//Save a new advertiser to the waitlist
		$scope.saveAdvertiser = function() {
			advertiserService.saveAdvertiser($scope.advertiser);
			$scope.advertiser = {firstname: '', lastname: '', email: '', budget: ''};
		};

	}])

	.controller('publisherController', ['$scope', 'publisherService', function($scope, publisherService){

		// Store data from the publisher form
		$scope.publisher = {firstname: '', lastname: '', email: '', size: ''};

		//Save a new publisher to the waitlist
		$scope.savePublisher = function() {
			publisherService.savepublisher($scope.publisher);
			$scope.publisher = {firstname: '', lastname: '', email: '', size: ''};
		};

	}])
	
	.controller('AuthController', ['$scope', 'authService', function($scope, authService){

		// Object bound to inputs on the register and log in pages
		$scope.user = {email: '', password: ''};

		// Method to register a new user using the authService
		$scope.register = function() {
			authService.register($scope.user);
		};

		// Method to log in a user using the authService
		$scope.login = function() {
			authService.login($scope.user);
		};

		// Method to log out a user using the authService
		$scope.logout = function() {
			authService.logout();
		};

	}])

	.controller('DashboardController', ['$scope', function($scope) {
		$scope.hide = true;
	}]);