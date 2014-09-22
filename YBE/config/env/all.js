'use strict';

module.exports = {
	app: {
		title: 'YBE Yapı',
		description: '',
		keywords: 'İnşaat, Dükkan Tasarım, Dış Cephe, Restorasyon'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'aşk böcüğüm',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/lodash/dist/lodash.min.js',
				'//maps.googleapis.com/maps/api/js?sensor=false',
				'public/lib/angular-google-maps/dist/angular-google-maps.js',

			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
