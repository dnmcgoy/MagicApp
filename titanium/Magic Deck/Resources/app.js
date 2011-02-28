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

    mySearchTable.setData(cardArray);
    searchBar.blur();

    rows.close();
}

searchBar.addEventListener('return', populateSearchTable);

mySearchTable.addEventListener('click', function(e){
  var cardInfoWindow = Titanium.UI.createWindow({
    title:'Card Info',
    backgroundColor:'#fff',
    navBarHidden:false,
    barColor:'#000'
  });
  var cardLabel = Ti.UI.createLabel({
    text:e.rowData.rules,
    top:300
  });

  var cardImage = Ti.UI.createImageView({
    defaultImage:"CardBack.jpg",
    image: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" +
           e.rowData.mtg_id +
	   "&type=card",
    top: 0,
    left: 0,
    width:200,
    height:300
  });
  cardInfoWindow.add(cardImage);

  cardInfoWindow.add(cardLabel);
  searchTab.open(cardInfoWindow,{animated:true});
});


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

var facebookLoginButton = Titanium.Facebook.createLoginButton({
  apikey:"e7f31e2f4689d811b61cc1a2bad54d17",
  secret:"a394843aaf0ce9e4c6190b7291ca2865",
  style:"wide"
});

var topRatedWindow = Titanium.UI.createWindow({
    title:'Top Rated',
    backgroundColor:'#fff',
    barColor:'#000'
});

var topRatedMainView = Ti.UI.createView();
topRatedMainView.add(facebookLoginButton);
topRatedWindow.add(topRatedMainView);

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


var settingsTableView = Ti.UI.createTableView({
			  rowHeight:100.0});
settingsWindow.add(settingsTableView);

function getProfile(uid){
  Ti.Facebook.query("SELECT name, pic, id FROM profile WHERE id=" + uid,
    function(subresponse) {
      if(subresponse.success){
	var row = Ti.UI.createTableViewRow({height:100,
					    hasDetail:true});
	row.className = "friendRow";
	var label = Ti.UI.createLabel({
	  text: '' + subresponse.data[0].name + '',
	  color: '#111',
	  textAlign:'left',
	  left:130,
	  top:20,
	  font:{fontWeight:'bold',fontSize:15},
	  width:'auto',
	  height:'auto'
	});
	row.add(label);

	var image = Ti.UI.createImageView({image:subresponse.data[0].pic,
					   right : 200,
					   height: 100});
	row.add(image);
	settingsTableView.appendRow(row);
      }
    }
  );
}

function placeProfileRows(e){
    Ti.API.debug("Facebook user logged in");
    if(Ti.Facebook.userId != 0){
      Ti.Facebook.query( "SELECT uid1 FROM friend WHERE uid2=" + Ti.Facebook.userId,
		   function(response){
		     if(response.success){
		       for (i in response.data) {
			 getProfile(response.data[i].uid1);
		       }
		     }
		   }
      );
    }
}

Titanium.Facebook.addEventListener('login', placeProfileRows);
Titanium.Facebook.fireEvent('login');

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

