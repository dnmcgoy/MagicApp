Ti.include('/Views/CardListingView.js');

var SearchWindow = {};

(function() {

var searchBar = Titanium.UI.createSearchBar({
    				barColor:'#000',
    				showCancel:true,
    				height:43,
   			 		top:0
		        });

var deckInfoView = Ti.UI.createTextArea({
	value:"Currently Editing",
    bottom:0,
    height:25,
    color:"#FFFFFF",
	backgroundColor:"#303030",
	editable: false,
	opacity: 0.67
});

var searchTable;

var search = function (e){
  	if(e.value.length < 3) {return;}
  	var searchResults = Cards.searchCards({name:e.value});
  	searchTable.populate(searchResults);
    searchBar.blur();
};

searchBar.addEventListener('return', search);

SearchWindow.createSearchWindow = function() {
   		var searchWindow = Ti.UI.createWindow({
			title:'Search',
	    	navBarHidden:true
    	});
    	searchTable = CardListingView.createCardListingView();
   		searchWindow.add(searchTable);
   		searchWindow.add(searchBar);
   		searchWindow.add(deckInfoView);
   		deckInfoView.visible = true;
   		return searchWindow;
	};
})();
