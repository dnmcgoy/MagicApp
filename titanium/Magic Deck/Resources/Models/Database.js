var Database = {};

(function(){
	Database.init = function() {
		Database.db = Ti.Database.install('magicdeck.sqlite', 'magicdeck');
	};

        Database.getMagicSets = function() {
          var setSearchResults = [];
          var rows = Database.db.execute('SELECT * FROM Sets');
          while (rows.isValidRow())
    	  {
    	    var setInfo = {
              _id : rows.fieldByName('_id'),
    	      name : rows.fieldByName('name'),
      	      short_name : rows.fieldByName('short_name'),
      	      release_date : rows.fieldByName('release_date'),
              block : rows.fieldByName('block')
      	    };
      	    setSearchResults.push(setInfo);
      	    rows.next();
          }
	  rows.close();
	  return setSearchResults;
        };

        Database.getMagicBlocks = function() {
          var magicSets = Database.getMagicSets();
          var magicBlocks = {};

          for(setInfo in magicSets) {
            var blockname = magicSets[setInfo].block;
            if (!magicBlocks[blockname]) {
              magicBlocks[blockname] = {};
              magicBlocks[blockname]['magic_sets'] = [];
              magicBlocks[blockname]['start_date'] = magicSets[setInfo];
            }
            magicBlocks[blockname].magic_sets.push(magicSets[setInfo]);
            if (magicSets[setInfo].release_date < magicBlocks[blockname].start_date) {
              magicBlocks[blockname].start_date = magicSets[setInfo].release_date;
            }
          }

          for(key in magicBlocks) {
            Ti.API.log("Key: " + key);
            Ti.API.log("Number of Sets: " + magicBlocks[key]['magic_sets'].length);
          }
        };
 })();
