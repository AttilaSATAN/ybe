'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core');
	//app.route('/').get(core.index);
	app.route('/ask').get(function (req, res) {
		res.send('oldu');
	});
	app.route('*').get(core.index);
};