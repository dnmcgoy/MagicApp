var MD = {};

Ti.include('/Views/SearchWindow.js');
Ti.include('/Views/DecksWindow.js');
Ti.include('/Views/TopRatedWindow.js');
Ti.include('/Views/SettingsWindow.js');

Ti.include('/Models/Cards.js');
Ti.include('/Models/Database.js');
Ti.include('/Models/Decks.js');

Ti.include('/Models/Database.js');
Ti.include('ui.js');

Database.init();

Titanium.UI.setBackgroundColor('#000');

var tabGroup = MD.createApplicationTabGroup();
tabGroup.open();

