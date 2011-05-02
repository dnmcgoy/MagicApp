Ti.include("/Views/CardDetailWindow.js");
Ti.include("/Views/Components/CardTableRow.js");

var CardListingView = {};

(function(){

   CardListingView.createCardListingView = function(){

     var cardListingTable = Titanium.UI.createTableView({
    				rowHeight:100.0,
    				top:43
                       });

     cardListingTable.populate = function (cardsData){
  	var cardArray = [];
  	var i = 0;
  	while (i < 500 && i < cardsData.length) {
            var row = CardTableRow.createCardRow(cardsData[i]);
      	    cardArray.push(row);
      	    i++;
  	}
        cardListingTable.setData(cardArray);
     };

     cardListingTable.addEventListener('click', function(e){
       if(e.detail) {
	 var cardData = {
                         mtg_id: e.rowData.mtg_id,
  	                 rules: e.rowData.rules,
                         name: e.rowData.name
                        };
	 var cardDetailWindow = CardDetailWindow.createDetailWindow(cardData);
	 tabGroup.activeTab.open(cardDetailWindow);
       }
     });

     return cardListingTable;
   };
})();