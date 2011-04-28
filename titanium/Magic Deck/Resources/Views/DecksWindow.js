var DecksWindow = {};

(function(){

DecksWindow.createDecksWindow = function() {
	var decksWindow = Titanium.UI.createWindow({
    		title:'My Decks',
    		backgroundColor:'#fff',
    		barColor:'#000'
		   });
		   
    var decksTableView = Ti.UI.createTableView({
			  					rowHeight:100.0});
	decksWindow.add(decksTableView);
	return decksWindow;
};

})();
