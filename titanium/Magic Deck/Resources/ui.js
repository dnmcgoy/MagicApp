(function(){
	MD.createApplicationTabGroup = function() {
		MD.searchWindow = MD.createSearchWindow();
		MD.searchTab = Titanium.UI.createTab({
    		window:MD.searchWindow,
    		title:"Search"
		});

		MD.decksWindow = MD.createDecksWindow();
		MD.decksTab = Titanium.UI.createTab({
    		icon:'DeckTabBarIcon30.png',
    		title:'My Decks',
    		window:MD.decksWindow
		});

		MD.topRatedWindow = MD.createTopRatedWindow();
		MD.topRatedTab = Titanium.UI.createTab({
    		icon:'KS_nav_ui.png',
    		title:'Top Rated',
    		window:MD.topRatedWindow
		});

		MD.settingsWindow = MD.createSettingsWindow();
		MD.settingsTab = Titanium.UI.createTab({
    		icon:'settingsicon.png',
    		title:'Setting',
    		window:MD.settingsWindow
		});
		
		if(Ti.Platform.osname == "iphone"){
 		 MD.searchTab.icon = Ti.UI.iPhone.SystemIcon.SEARCH;
  		 MD.topRatedTab.icon = Ti.UI.iPhone.SystemIcon.TOP_RATED;
		}

		var tabGroup = Titanium.UI.createTabGroup();
		tabGroup.addTab(MD.searchTab);
		tabGroup.addTab(MD.decksTab);
		tabGroup.addTab(MD.topRatedTab);
		tabGroup.addTab(MD.settingsTab);

		return tabGroup;
	};
})();
