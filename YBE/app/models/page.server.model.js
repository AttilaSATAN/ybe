'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Page Schema
 */
var PageSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Page name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	banner:[{
			type:String,
			default: '/modules/core/img/banners/construction-2.jpg',
			trim: true
		}],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Page', PageSchema);