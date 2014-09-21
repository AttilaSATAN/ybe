'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	SubPage = mongoose.model('SubPage'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Sub page already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Sub page
 */
exports.create = function(req, res) {
	var subPage = new SubPage(req.body);
	subPage.user = req.user;

	subPage.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(subPage);
		}
	});
};

/**
 * Show the current Sub page
 */
exports.read = function(req, res) {
	res.jsonp(req.subPage);
};

/**
 * Update a Sub page
 */
exports.update = function(req, res) {
	var subPage = req.subPage;

	subPage = _.extend(subPage, req.body);

	subPage.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(subPage);
		}
	});
};

/**
 * Delete an Sub page
 */
exports.delete = function(req, res) {
	var subPage = req.subPage;

	subPage.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(subPage);
		}
	});
};

/**
 * List of Sub pages
 */
exports.list = function(req, res) {
	SubPage.find().sort('-created').populate('user', 'displayName').exec(function(err, subPages) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(subPages);
		}
	});
};

/**
 * Sub page middleware
 */
exports.subPageByID = function(req, res, next, id) {
	SubPage.findById(id).populate('user', 'displayName').exec(function(err, subPage) {
		if (err) return next(err);
		if (!subPage) return next(new Error('Failed to load Sub page ' + id));
		req.subPage = subPage;
		next();
	});
};

/**
 * Sub page authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.subPage.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};