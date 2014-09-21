'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Sub page Schema
 */
var SubPageSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Sub page name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('SubPage', SubPageSchema);