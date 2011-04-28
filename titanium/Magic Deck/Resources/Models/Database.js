var Database = {};

(function(){
	Database.init = function() {
		Database.db = Ti.Database.install('magicdeck.sqlite', 'magicdeck');
	};
})();
