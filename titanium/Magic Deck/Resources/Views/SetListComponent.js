(function() {
   MD.createSetListComponent = function() {
     //
     // HORIZONTAL SCROLLING TABS
     //
     var scrollView = Titanium.UI.createScrollView({
        contentWidth:500,
	contentHeight:75,
	top:10,
	height:75,
	width:230,
	borderRadius:10,
	backgroundColor:'#13386c'
     });

     scrollView.addEventListener('scroll', function(e)
     {
	Ti.API.info('x ' + e.x + ' y ' + e.y);

	if (e.x > 50)
	{
		leftImage.show();
	}
	else
	{
		leftImage.hide();
	}
	if (e.x < 130)
	{
		rightImage.show();
	}
	else
	{
		rightImage.hide();
	}

     });

     var magicSets = Database.getMagicSets();
     var blocks = Database.getMagicBlocks();

     var i = 0;
     for(setInfo in magicSets) {
       var myView = Ti.UI.createView({
         backgroundColor:'#FFFFFF',
         borderWidth:1,
         borderRadius:20,
         borderColor:'#336699',
         width:40,
	 height:40,
         bottom:3,
	 left:(i*50)
       });
       scrollView.add(myView);

       var setImageUrl = 'http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=' +
                           magicSets[setInfo].short_name + '&size=large&rarity=C';
       var setImage = Ti.UI.createImageView({image:setImageUrl,
                                             width:30,
                                             height:30,
                                             hires:true});

       myView.add(setImage);
       i = i + 1;
     }

     scrollView.contentWidth = (magicSets.length*50);


     return scrollView;
   };
 })();