// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// Search Tab Creation
//
var searchWindow = Titanium.UI.createWindow({
    backgroundColor:'#fff',
    barColor:'#000',
    navBarHidden:'true'
});

var searchTab = Titanium.UI.createTab({
    window:searchWindow,
    title:"Search"
});


var searchBar = Titanium.UI.createSearchBar({
    barColor:'#000',
    showCancel:true,
    height:43,
    top:0
});

var mySearchTable = Titanium.UI.createTableView({
    rowHeight:100.0,
    top:43
});


function populateSearchTable(e){
  if(e.value.length < 3) {return;}
  mySearchTable.setData([]);
  var db = Ti.Database.install('magicdeck.sqlite', 'magicdeck');
  var rows = db.execute('SELECT mtg_id, name FROM cards where name like "%' + e.value + '%"');


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

    mySearchTable.setData(cardArray);
    searchBar.blur();

    rows.close();
}

searchBar.addEventListener('return', populateSearchTable);


searchWindow.add(mySearchTable);
searchWindow.add(searchBar);

//
// My Decks Tab Creation
//
var myDecksWindow = Titanium.UI.createWindow({
    title:'My Decks',
    backgroundColor:'#fff',
    barColor:'#000'
});
var myDecksTab = Titanium.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'My Decks',
    window:myDecksWindow
});


//
//    Top Rated Tab Creation
//
var topRatedWindow = Titanium.UI.createWindow({
    title:'Top Rated',
    backgroundColor:'#fff',
    barColor:'#000'
});
var topRatedTab = Titanium.UI.createTab({
    title:'Top Rated',
    window:topRatedWindow
});


if(Ti.Platform.osname == "iphone"){
  searchTab.icon = Ti.UI.iPhone.SystemIcon.SEARCH;
  topRatedTab.icon = Ti.UI.iPhone.SystemIcon.TOP_RATED;
}

//
//   Setting Tab Creation
//

var settingsWindow = Titanium.UI.createWindow({
  title:'Settings',
  backgroundColor:'#fff',
  barColor:'#000'
});
var settingsTab = Titanium.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'Setting',
    window:settingsWindow
});

//
//  add tabs
//
tabGroup.addTab(searchTab);
tabGroup.addTab(myDecksTab);
tabGroup.addTab(topRatedTab);
tabGroup.addTab(settingsTab);

// open tab group
tabGroup.open();

