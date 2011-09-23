Ti.include('/Views/SetListComponent.js');

(function() {
   MD.createAdvancedSearchView = function() {
     var advancedSearchView = Titanium.UI.createView({
                                                       backgroundImage:'AdvancedSearch.png',
                                                       top: 0,
                                                       left: 0,
                                                       height:411
                                                     });
     var cmcView = Titanium.UI.createView({
                                              top:70,
                                              left:10,
                                              height: 75,
                                              width: 150
                                            });

     var rarityView = Titanium.UI.createView({
                                              top:70,
                                              right:10,
                                              height: 75,
                                              width: 150
                                            });

     var colorView = Titanium.UI.createView({
                                              top:165,
                                              right:10,
                                              height: 75,
                                              width: 150
                                            });

     var basicTypeView = Titanium.UI.createView({
                                                  top:165,
                                                  left:10,
                                                  height: 75,
                                                  width: 150
                                                });

     var rulesField = Titanium.UI.createTextField({
     													   color:'#333333',
                                                           value:'',
                                                           height:25,
                                                           fontSize:8,
                                                           top:30,
                                                           width:'44%',
                                                           right:13,
                                                           borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
                                                        });

     var nameField = Titanium.UI.createTextField({
     	                                           color:'#333333',
                                                   value:'',
                                                   height:25,
                                                   width:'44%',
                                                   fontSize:8,
                                                   top:30,
                                                   left:13,
                                                   borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
                                                 });

     var setListComponent = MD.createSetListComponent();

     setListComponent.addEventListener('click', function(){
                                         alert("clicked set list");
                                       });
     setListComponent.bottom = 0;
     setListComponent.left = 10;
     setListComponent.width = 300;
     advancedSearchView.add(setListComponent);
     advancedSearchView.add(cmcView);
     advancedSearchView.add(rarityView);
     advancedSearchView.add(colorView);
     advancedSearchView.add(basicTypeView);
     advancedSearchView.add(rulesField);
     advancedSearchView.add(nameField);
     return advancedSearchView;
   }
})();