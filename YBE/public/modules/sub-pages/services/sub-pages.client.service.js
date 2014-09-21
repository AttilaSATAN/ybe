'use strict';

//Sub pages service used to communicate Sub pages REST endpoints
angular.module('sub-pages').factory('SubPages', ['$resource', function($resource) {
    return $resource('sub-pages/:subPageId', {
        subPageId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);