'use strict';

//Setting up route
angular.module('sub-pages').config(['$stateProvider',
	function($stateProvider) {
		// Sub pages state routing
		$stateProvider.
		state('listSubPages', {
			url: '/sub-pages',
			templateUrl: 'modules/sub-pages/views/list-sub-pages.client.view.html'
		}).
		state('createSubPage', {
			url: '/sub-pages/create',
			templateUrl: 'modules/sub-pages/views/create-sub-page.client.view.html'
		}).
		state('viewSubPage', {
			url: '/sub-pages/:subPageId',
			templateUrl: 'modules/sub-pages/views/view-sub-page.client.view.html'
		}).
		state('editSubPage', {
			url: '/sub-pages/:subPageId/edit',
			templateUrl: 'modules/sub-pages/views/edit-sub-page.client.view.html'
		});
	}
]);