'use strict';

// Sub pages controller
angular.module('sub-pages').controller('SubPagesController', ['$scope', '$stateParams', '$location', 'Authentication', 'SubPages',
    function($scope, $stateParams, $location, Authentication, SubPages) {
        $scope.authentication = Authentication;

        // Create new Sub page
        $scope.create = function() {
        	// Create new Sub page object
            var subPage = new SubPages({
                name: this.name
            });

            // Redirect after save
            subPage.$save(function(response) {
                $location.path('sub-pages/' + response._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            // Clear form fields
            this.name = '';
        };

        // Remove existing Sub page
        $scope.remove = function(subPage) {
            if (subPage) {
                subPage.$remove();

                for (var i in $scope.subPages) {
                    if ($scope.subPages[i] === subPage) {
                        $scope.subPages.splice(i, 1);
                    }
                }
            } else {
                $scope.subPage.$remove(function() {
                    $location.path('sub-pages');
                });
            }
        };

        // Update existing Sub page
        $scope.update = function() {
            var subPage = $scope.subPage;

            subPage.$update(function() {
                $location.path('sub-pages/' + subPage._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };

        // Find a list of Sub pages
        $scope.find = function() {
            $scope.subPages = SubPages.query();
        };

        // Find existing Sub page
        $scope.findOne = function() {
            $scope.subPage = SubPages.get({
                subPageId: $stateParams.subPageId
            });
        };
    }
]);