'use strict';

// Configuring the Articles module
angular.module('pages').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Pages', 'pages');
		Menus.addMenuItem('topbar', 'New Page', 'pages/create');
	}
]);