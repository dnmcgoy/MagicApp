var CardDetailWindow = {};

(function() {

var cardLabel = Ti.UI.createLabel({
    		top:300,
    		text:""
  		});

var cardImage = Ti.UI.createImageView({
    		defaultImage:"CardBack.jpg",
    		image: "CardBack.jpg",
    		top: 0,
    		left: 0,
			width:200,
    		height:300
  		});

CardDetailWindow.createDetailWindow = function(cardData) {
	var detailWindow = Ti.UI.createWindow({
		title:'Card Info',
    	backgroundColor:'#fff',
    	navBarHidden:false,
    	barColor:'#000',
	});

	cardImage.image = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" +
           			   cardData.mtg_id +
	   		 		   "&type=card";
	cardLabel.text = cardData.rules;

	detailWindow.add(cardImage);
    detailWindow.add(cardLabel);

    return detailWindow;
};

})();

