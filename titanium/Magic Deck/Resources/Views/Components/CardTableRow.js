var CardTableRow = {};

(function(){

	CardTableRow.createCardRow = function(cardData) {
		var row = Ti.UI.createTableViewRow({height:150});
      	row.className = "cardRow";
      	
      	row.mtg_id = cardData.mtg_id;
      	row.rules = cardData.rules;
      	row.name = cardData.name;

      	var label = Ti.UI.createLabel({
			text: '' + cardData.name + '',
			color: '#111',
			textAlign:'left',
			left:130,
			top:20,
			font:{fontWeight:'bold',fontSize:18},
			width:'auto',
			height:'auto'
      	});
      
      	row.add(label);

      	var cardImage = Ti.UI.createImageView({
	        defaultImage:"CardBack.jpg",
			image: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" +
		        	cardData.mtg_id +
					"&type=card",
			top: 0,
			left: 0,
			width:107,
            height:150
       	});
      	row.add(cardImage);
      	
      	var plusOneButton = Ti.UI.createButton({
			title: "+1",
			height:"50",
			width:"50",
			bottom:"5",
			left:"135"
     	});

      	row.add(plusOneButton);

      	var plusFourButton = Ti.UI.createButton({
			title: "+4",
	  		height:"50",
	  		width:"50",
	  		left:"195",
	  		bottom:"5"
	  	});

      	row.add(plusFourButton);

      	var plusXButton = Ti.UI.createButton({
			title: "+X",
			height:"50",
			width:"50",
			left:"255",
			bottom:"5"
      	});

     	row.add(plusXButton);
     	
     	return row;
    };
      
})();
