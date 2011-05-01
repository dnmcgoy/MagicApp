var SettingsWindow = {};

(function() {

var settingsWindow = Titanium.UI.createWindow({
  title:'Settings',
  backgroundColor:'#fff',
  barColor:'#000'
});

SettingsWindow.createSettingsWindow = function() {
	return settingsWindow;
};

})();