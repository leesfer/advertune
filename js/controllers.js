'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

	.controller('LandingPageController', [function() {

	}])

	.controller('advertiserController', ['$scope', 'advertiserService', function($scope, advertiserService, ){


		// Store data from the waitlist form
		$scope.advertiser = {firstName: '', lastName: '', email: '', budget: ''};

		//Save a new party to the waitlist
		$scope.saveAdvertiser = function() {
			advertiserService.saveAdvertiser($scope.advertiser);
			$scope.advertiser = {firstName: '', lastName: '', email: '', budget: ''};
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

	}]);