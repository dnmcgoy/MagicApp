Ti.include("Views/CardDetailWindow.js");
Ti.include('Views/Components/CardTableRow.js');

var SearchWindow = {};

(function() {
	
var searchBar = Titanium.UI.createSearchBar({
    				barColor:'#000',
    				showCancel:true,
    				height:43,
   			 		top:0
		        });

var searchTable = Titanium.UI.createTableView({
    				rowHeight:100.0,
    				top:43
			  	 });

var populateSearchTable = function (e){
  	if(e.value.length < 3) {return;}
  	searchTable.setData([]);
  	var searchResults = Cards.searchCards({name:e.value});
  	var cardArray = [];
  	var i = 0;
  	while (i < 500 && i < searchResults.length) {
      	var row = CardTableRow.createCardRow(searchResults[i]);
      	cardArray.push(row);
      	i++;
  	}

    searchTable.setData(cardArray);
    searchBar.blur();
};

searchBar.addEventListener('return', populateSearchTable);
searchTable.addEventListener('click', function(e){
		var cardData = {
			mtg_id: e.rowData.mtg_id,
  			rules: e.rowData.rules
		};
		var cardDetailWindow = CardDetailWindow.createDetailWindow(cardData);
		tabGroup.activeTab.open(cardDetailWindow);	
	});
	
SearchWindow.createSearchWindow = function() {
   	var searchWindow = Ti.UI.createWindow({
		title:'Search',
	    navBarHidden:true
    });
   	searchWindow.add(searchTable);
   	searchWindow.add(searchBar);
   	return searchWindow;
};


})();
