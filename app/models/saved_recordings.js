exports.definition = {
	config: {
		columns: {
		    "title": "TEXT",
		    "source": "TEXT",
		    "source_mp3": "TEXT",
		    "date": "TEXT",
		    "note": "TEXT",
		    "num":"INTEGER",
		    "enable_mp3":"BOOL"
		},
		adapter: {
			type: "sql",
			collection_name: "saved_recordings"
		}
	},		
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});
		
		return Model;
	},

	
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			 comparator : function(file) {
	        	 return -file.get('num');
	        	 
	        	 //renverser l'ordre
	        	 //return -file.get('alloy_id');
	        	 
	        	 
	        	 
	         }

		});
		
		return Collection;
	}
}

