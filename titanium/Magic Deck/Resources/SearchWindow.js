Ti.include("CardDetailWindow.js");

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
  var db = Ti.Database.install('magicdeck.sqlite', 'magicdeck');
  var rows = db.execute('SELECT mtg_id, name, rules FROM cards where name like "%' + e.value + '%"');

  var cardArray = [];
  var i = 0;
  while (rows.isValidRow() && i < 500)
    {
      i = 0;
      var row = Ti.UI.createTableViewRow({height:150});
      row.className = "cardRow";

      var label = Ti.UI.createLabel({
		text: '' + rows.fieldByName('name') + '',
		color: '#111',
		textAlign:'left',
		left:130,
		top:20,
		font:{fontWeight:'bold',fontSize:18},
		width:'auto',
		height:'auto'
      });
      
      row.add(label);

      row.mtg_id = rows.fieldByName('mtg_id');
      row.name = rows.fieldByName('name');
      row.rules = rows.fieldByName('rules');

      var cardImage = Ti.UI.createImageView({
	        	defaultImage:"CardBack.jpg",
				image: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" +
		        	   rows.fieldByName('mtg_id') +
					   "&type=card",
				top: 0,
				left: 0,
				width:107,
                height:150
       });
      row.add(cardImage);


      var plusOneButton = Ti.UI.createButton({
			title: "+1",
			height:"50",
			width:"50",
			bottom:"5",
			left:"135"
      });

      row.add(plusOneButton);

      var plusFourButton = Ti.UI.createButton({
			title: "+4",
	  		height:"50",
	  		width:"50",
	  		left:"195",
	  		bottom:"5"
	  });

      row.add(plusFourButton);

      var plusXButton = Ti.UI.createButton({
			title: "+X",
			height:"50",
			width:"50",
			left:"255",
			bottom:"5"
      });

      row.add(plusXButton);

      cardArray.push(row);
      rows.next();
    }

    searchTable.setData(cardArray);
    searchBar.blur();

    rows.close();
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
