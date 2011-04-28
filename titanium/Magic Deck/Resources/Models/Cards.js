var Cards = {};

(function(){
	var currentSearchResults = [];
	Cards.searchCards = function(cardSearchData){
		currentSearchResults = [];
		var rows = Database.db.execute('SELECT mtg_id, name, rules FROM cards where name like "%' + 
										cardSearchData.name + 
										'%"');
		
		while (rows.isValidRow())
    	{
    		var cardInfo = {
    		    mtg_id : rows.fieldByName('mtg_id'),
      			name : rows.fieldByName('name'),
      			rules : rows.fieldByName('rules')
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
