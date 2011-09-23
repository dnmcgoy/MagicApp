(function() {
   MD.createSetListComponent = function() {
     //
     // HORIZONTAL SCROLLING TABS
     //
     var scrollView = Titanium.UI.createScrollView({
        contentWidth:500,
	contentHeight:75,
	bottom:65,
	height:75,
	width:280,
	borderRadius:10,
	backgroundColor:'#161616'
     });


     var formatView = Titanium.UI.createView({
                                               top:0,
                                               height:30
                                             });
     var formatLabel = Titanium.UI.createLabel({
                                                 top:0,
                                                 left:0,
                                                 text:"Format:",
                                                 width:80
                                               });
     var formatValue = Titanium.UI.createLabel({
                                                 text:"",
                                                 width:80,
                                                 left:80
                                               });
     formatView.add(formatLabel);
     formatView.add(formatValue);
     var magicSetView = Titanium.UI.createView({
                                                 height:110
                                               });
     //magicSetView.add(formatView);
     magicSetView.add(scrollView);

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

     var blocks = Database.getMagicBlocks();
     var i = 0;
     for(block in blocks) {
       var magicSets = blocks[block]['magic_sets'];
       var blockLabel = Ti.UI.createLabel({
	                        text:block,
                            backgroundColor:'#cccccc',
                            borderWidth:3,
                            borderColor:'#222222',
	                        font:{fontSize:13},
	                        color:'#222222',
	                        width:magicSets.length * 50,
	                        textAlign:'center',
                            height:30,
                            left:i*50,
                            top:0
                        });
       scrollView.add(blockLabel);

       for(setInfo in magicSets) {
         var myView = Ti.UI.createView({
           backgroundColor:'#FFFFFF',
           borderWidth:3,
           borderRadius:20,
           borderColor:'#FFE303',
           width:40,
	       height:40,
           bottom:3,
	       left:(i*50)
         });
         scrollView.add(myView);

         var setImageUrl = 'http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=' +
                           magicSets[setInfo].short_name + '&size=large&rarity=C';
         var imageView = Ti.UI.createImageView({image:setImageUrl,
                                               width:30,
                                               height:30,
                                               hires:true});
         myView.add(imageView);

         i = i + 1;
       }
     }
     scrollView.contentWidth = (i * 50);

     return magicSetView;
   };
 })();