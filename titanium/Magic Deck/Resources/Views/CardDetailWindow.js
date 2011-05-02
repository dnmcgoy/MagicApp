var CardDetailWindow = {};

(function() {

var cardImage = Ti.UI.createImageView({
    		defaultImage:"CardBack.jpg",
    		image: "CardBack.jpg",
    		top: 0,
    		left: 0,
		width:250,
    		height:350
  		});

CardDetailWindow.createDetailWindow = function(cardData) {
	var detailWindow = Ti.UI.createWindow({
		title:cardData.name,
    	        backgroundColor:'#fff',
                navBarHidden:false,
                barColor:'#000'
	});

	cardImage.image = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" +
           			   cardData.mtg_id +
	   		 		   "&type=card";

	detailWindow.add(cardImage);

    return detailWindow;
};

})();

