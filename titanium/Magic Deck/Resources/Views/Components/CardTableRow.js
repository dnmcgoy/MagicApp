var CardTableRow = {};

(function(){

	CardTableRow.createCardRow = function(cardData) {
	  var row = Ti.UI.createTableViewRow({height:150,
					      hasDetail:true,
					      backgroundColor:"#FFFFFF"
                                             });
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
			image: "http://www.logic-by-design.com/magic_images/low_res/" +
           			cardData.mtg_id +
	   		 	".jpg",
			top: 0,
			left: 0,
			width:107,
                        height:150,
                        hires: true
       	});
      	row.add(cardImage);

      	var plusOneButton = Ti.UI.createButton({
			title: "+1",
			height:"40",
			width:"60",
			bottom:"45",
			left:"115"
     	});

      	row.add(plusOneButton);

      	var plusFourButton = Ti.UI.createButton({
			title: "+4",
	  		height:"40",
	  		width:"60",
	  		left:"175",
	  		bottom:"45"
	  	});

      	row.add(plusFourButton);

      	var plusXButton = Ti.UI.createButton({
			title: "+X",
			height:"40",
			width:"120",
			left:"115",
			bottom:"5"
      	});

     	row.add(plusXButton);

     	return row;
    };

})();
