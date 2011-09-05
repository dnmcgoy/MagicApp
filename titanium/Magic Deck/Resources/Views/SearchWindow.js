Ti.include('/Views/CardListingView.js');
Ti.include('/Views/AdvancedSearchView.js');

(function() {

	MD.createSearchWindow = function() {
		var searchBar = Titanium.UI.createSearchBar({
    						barColor:'#000',
    						showCancel:false,
    						height:43,
   			 			top:0
		        		});
                var advancedSearchShow = Ti.UI.createLabel({
			text:"Advanced Search",
    		        top:43,
    		        height:30,
    		        color:"#FFFFFF",
			backgroundColor:"#303030",
			editable: false,
			opacity: 0.67
		});

		var deckInfoView = Ti.UI.createLabel({
			text:"Currently Editing",
    		        bottom:0,
    		        height:30,
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


   		var searchWindow = Ti.UI.createWindow({
			title:'Search',
	    	        navBarHidden:true
    	        });

                var advancedSearchView = MD.createAdvancedSearchView();


                advancedSearchShow.addEventListener('click', function() {
                                                      alert("show the advanced view");
                                                      searchTable.hide();
                                                      advancedSearchView.show();
                                                    });

               deckInfoView.addEventListener('click', function() {
                                                      alert("return to deck view");
                                                    });

    	        searchTable = MD.createCardListingView();
                searchWindow.add(advancedSearchView);
   	        searchWindow.add(searchBar);
                searchWindow.add(advancedSearchShow);
   	        searchWindow.add(deckInfoView);
   	        deckInfoView.visible = true;
   	        return searchWindow;
        };
})();
