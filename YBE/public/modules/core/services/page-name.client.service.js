angular.module('core').service('PageName', [function(){
	var displayPageName = {
		'pages':{
			'biz': 'Biz',
			'insaat': 'İnşaat',
			'tasarim': 'Tasarım & Mimari',
			'restorasyon': 'Restorasyon & Rekreasyon',
			'altyapi': 'Altyapı',
			'izolasyon': 'İzolasyon',
			'iletisim': 'İletişim'

		}
	}
	return {
		page: function (pageName) {

			if(typeof displayPageName.pages[pageName] === 'undefined') return null;
			return displayPageName.pages[pageName];
		},
		subPage: function(pageName, subPageName){
			if(typeof displayPageName.pages[pageName + '/' + subPageName] === 'undefined') return null;
			return displayPageName.pages[pageName + '/' + subPageName];
		}
	}
}])