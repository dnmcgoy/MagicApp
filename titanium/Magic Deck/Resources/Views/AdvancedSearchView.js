Ti.include('/Views/SetListComponent.js');

(function() {
   MD.createAdvancedSearchView = function() {
     var advancedSearchView = Titanium.UI.createView({
                                                       top: 65,
                                                       left: 0,
                                                       height:500,
                                                       width: 400
                                                     });
     var cmcButton = Titanium.UI.createButton({
                                                label:"CMC",
                                                top:30,
                                                left:30,
                                                height: 75,
                                                width: 125
                                              });

     var rarityButton = Titanium.UI.createButton({
                                                label:"Rarity",
                                                top:30,
                                                left:175,
                                                height: 75,
                                                width: 125
                                              });

     var colorButton = Titanium.UI.createButton({
                                                label:"Color",
                                                top:125,
                                                left:175,
                                                height: 75,
                                                width: 125
                                              });
     var basicTypeButton = Titanium.UI.createButton({
                                                label:"Basic Type",
                                                top:125,
                                                left:30,
                                                height: 75,
                                                width: 125
                                              });
     var setListComponent = MD.createSetListComponent();

     setListComponent.addEventListener('click', function(){
                                         alert("clicked set list");
                                       });
     setListComponent.bottom = 0;
     setListComponent.left = 10;
     setListComponent.width = 300;
     advancedSearchView.add(setListComponent);
     advancedSearchView.add(cmcButton);
     advancedSearchView.add(rarityButton);
     advancedSearchView.add(colorButton);
     advancedSearchView.add(basicTypeButton);
     return advancedSearchView;
   }
})();