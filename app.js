var app = angular.module('tiles', ['ui.router'],function($rootScopeProvider) {
	$rootScopeProvider.digestTtl(10);
	})
    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';
        $urlRouterProvider.otherwise("/");

        $stateProvider.state('index', {
            url: "/",
            templateUrl: "main/main.html",
            controller: 'MainController'
        });
    });