var SettingsWindow = {};

(function() {

var settingsWindow = Titanium.UI.createWindow({
  title:'Settings',
  backgroundColor:'#fff',
  barColor:'#000'
});


var settingsTableView = Ti.UI.createTableView({
			  rowHeight:100.0});
settingsWindow.add(settingsTableView);

//topRatedMainView.add(facebookLoginButton);
//topRatedWindow.add(topRatedMainView);


var facebookLoginButton = Titanium.Facebook.createLoginButton({
  apikey:"e7f31e2f4689d811b61cc1a2bad54d17",
  secret:"a394843aaf0ce9e4c6190b7291ca2865",
  style:"wide"
});


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

SettingsWindow.createSettingsWindow = function() {
	return settingsWindow;
};

})();