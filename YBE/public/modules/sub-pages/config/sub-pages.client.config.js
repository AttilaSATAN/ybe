'use strict';

// Configuring the Articles module
angular.module('sub-pages').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Sub pages', 'sub-pages');
		Menus.addMenuItem('topbar', 'New Sub page', 'sub-pages/create');
	}
]);