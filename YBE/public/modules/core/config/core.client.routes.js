'use strict';
// Setting up route
angular.module('core')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            // Redirect to home view when route not found
            $urlRouterProvider.otherwise('/');
            // Home state routing
            $stateProvider.state('home', {
                url: '/',
                views: {
                    '': {
                        templateUrl: 'modules/core/views/home.client.view.html'
                    },
                    'content-inner@home': {
                        templateUrl: 'modules/core/views/static-views/home-content.client.view.html',
                        controller: ['$scope', '$stateParams',
                            function ($scope, $stateParams) {
                                $scope.pageName = $stateParams.page;
                            }
                        ]
                    },
                    'header-inner@home': {
                        templateUrl: 'modules/core/views/static-views/home-header.client.view.html',
                        controller: ['$scope', '$stateParams',
                            function ($scope, $stateParams) {
                                $scope.pageName = $stateParams.page;
                            }
                        ]
                    }
                }
            })
                .state('home.page', {
                    url: ':page',
                    views: {
                        'content-inner': {
                            templateUrl: 'modules/core/views/static-views/content.client.view.html',
                            controller: ['$scope', '$stateParams',
                                'PageName',
                                function ($scope, $stateParams,
                                    PageName) {
                                    $scope.pageName = $stateParams.page;
                                    $scope.displayPageName = PageName.page(
                                        $scope.pageName);
                                    $scope.staticPage =
                                        'modules/core/views/static-views/' +
                                        $stateParams.page +
                                        '-content.client.view.html';
                                }
                            ]
                        },
                        'header-inner': {
                            templateUrl: 'modules/core/views/static-views/header.client.view.html',
                            controller: ['$scope', '$stateParams',
                                'PageName',
                                function ($scope, $stateParams,
                                    PageName) {
                                    $scope.pageName = $stateParams.page;
                                    $scope.displayPageName = PageName.page(
                                        $scope.pageName);
                                    $scope.staticPage =
                                        'modules/core/views/static-views/' +
                                        $stateParams.page +
                                        '-header.client.view.html';
                                }
                            ]
                        }
                    }
                })
                .state('home.subpage', {
                    url: ':page/:subpage',
                    views: {
                        'content-inner': {
                            templateUrl: function ($stateParams) {
                                return
                            },
                            controller: ['$scope', '$stateParams',
                                'PageName',
                                function ($scope, $stateParams,
                                    PageName) {
                                    $scope.pageName = $stateParams.page;
                                    $scope.displayPageName = PageName.page(
                                        $scope.pageName);
                                    $scope.staticPage =
                                        'modules/core/views/static-views/' +
                                        $stateParams.page + '-content.' +
                                        $stateParams.subpage +
                                        '.client.view.html';
                                }
                            ]
                        },
                        'header-inner': {
                            templateUrl: 'modules/core/views/static-views/header.client.view.html',
                            controller: ['$scope', '$stateParams',
                                'PageName',
                                function ($scope, $stateParams,
                                    PageName) {
                                    $scope.pageName = $stateParams.page;
                                    $scope.displayPageName = PageName.page(
                                        $scope.pageName);
                                    $scope.staticPage =
                                        'modules/core/views/static-views/' +
                                        $stateParams.page + '-header.' +
                                        $stateParams.subpage +
                                        '.client.view.html';
                                }
                            ]
                        }
                    }
                });;
        }
    ]);