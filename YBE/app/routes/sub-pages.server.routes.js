'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var subPages = require('../../app/controllers/sub-pages');

	// Sub pages Routes
	app.route('/sub-pages')
		.get(subPages.list)
		.post(users.requiresLogin, subPages.create);
	
	app.route('/sub-pages/:subPageId')
		.get(subPages.read)
		.put(users.requiresLogin, subPages.hasAuthorization, subPages.update)
	    .delete(users.requiresLogin, subPages.hasAuthorization, subPages.delete);

	// Finish by binding the Sub page middleware
	app.param('subPageId', subPages.subPageByID);
};