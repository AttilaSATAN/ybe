angular.module('core').service('Menus', [function(){
	var banners = {
		'pages':{
			'biz': '/modules/core/img/banners/construction-2.jpg',
			'insaat': '/modules/core/img/banners/construction-2.jpg',
		}
	}
	return {
		page: function (pageName) {
			if(typeof banners.pages[pageName] === 'undefined') return null;
		},
		subPage: function(pageName, subPageName){
			if(typeof banners.pages[pageName + '/' + subPageName] === 'undefined') return null;
			return banners.pages[pageName + '/' + subPageName];
		}
	}
}])