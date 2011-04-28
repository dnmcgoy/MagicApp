Ti.include('Views/SearchWindow.js');
Ti.include('Views/DecksWindow.js');
Ti.include('Views/TopRatedWindow.js');
Ti.include('Views/SettingsWindow.js');

Ti.include('Models/Cards.js');
Ti.include('Models/Database.js');
Ti.include('Models/Decks.js');

Ti.include('Models/Database.js');

Database.init();


Titanium.UI.setBackgroundColor('#000');

var searchWindow = SearchWindow.createSearchWindow();
var searchTab = Titanium.UI.createTab({
    window:searchWindow,
    title:"Search"
});

var decksWindow = DecksWindow.createDecksWindow();
var decksTab = Titanium.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'My Decks',
    window:decksWindow
});

var topRatedWindow = TopRatedWindow.createTopRatedWindow();
var topRatedTab = Titanium.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'Top Rated',
    window:topRatedWindow
});

var settingsWindow = SettingsWindow.createSettingsWindow();
var settingsTab = Titanium.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'Setting',
    window:settingsWindow
});

var tabGroup = Titanium.UI.createTabGroup();
tabGroup.addTab(searchTab);
tabGroup.addTab(decksTab);
tabGroup.addTab(topRatedTab);
tabGroup.addTab(settingsTab);

if(Ti.Platform.osname == "iphone"){
  searchTab.icon = Ti.UI.iPhone.SystemIcon.SEARCH;
  topRatedTab.icon = Ti.UI.iPhone.SystemIcon.TOP_RATED;
}

tabGroup.open();

