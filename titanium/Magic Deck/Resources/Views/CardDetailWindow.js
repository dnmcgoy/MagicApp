(function() {
MD.createDetailWindow = function(cardData) {
	var cardImage = Ti.UI.createImageView({
    		defaultImage:"CardBack.jpg",
    		image: "CardBack.jpg",
    		top: 0,
    		left: 0,
			width:250,
    		height:350
  		});
  		
	var detailWindow = Ti.UI.createWindow({
		title:cardData.name,
    	        backgroundColor:'#fff',
                navBarHidden:false,
                barColor:'#000'
	});

	cardImage.image = "http://www.logic-by-design.com/magic_images/low_res/" +
           			   cardData.mtg_id +
	   		 		   ".jpg";

	detailWindow.add(cardImage);

    return detailWindow;
};

})();

