var Cards = {};

(function(){
	var currentSearchResults = [];
	Cards.searchCards = function(cardSearchData){
		currentSearchResults = [];
		var rows = Database.db.execute(
                  'SELECT * FROM '
                  + 'Printings, Sets, Cards '
                  + 'where '
                  + 'Printings.set_id = Sets._id AND '
                  + 'Printings.card_id = Cards._id AND '
                  + '(Sets.name = "Tenth Edition" '
                  + '     OR Sets.name = "Arabian Nights" '
                  + ')'
                  + 'AND (Cards.color LIKE "%B%" '
                  + '     OR Cards.color LIKE "%U%"'
                  + ') '
                  + 'AND (Cards.oracle_text LIKE "%Flying%") '
                  + 'AND (Cards.toughness = "3"'
                  + ') '
                  + 'AND (Cards.power = "3"'
                  + ') '
                  + 'AND (Printings.rarity = "Rare"'
                  + ') '
                  + 'AND (Cards.cardtype LIKE "%Creature%") '
                  + 'AND (Cards.cmc = 6'
                  + '  OR Cards.cmc = 7'
                  + ') '
                  + 'AND (Cards.name LIKE "%Ascend%")');


        while (rows.isValidRow())
    	{
    	  var cardInfo = {
    	           mtg_id : rows.fieldByName('mtg_id'),
      	           name : rows.fieldByName('name'),
      	           rules : rows.fieldByName('oracle_text')
      		};
      		currentSearchResults.push(cardInfo);
      		rows.next();
        }
		rows.close();
		return currentSearchResults;
	};

	Cards.getSearchResults = function(){
		return currentSearchResults;
	};
})();
