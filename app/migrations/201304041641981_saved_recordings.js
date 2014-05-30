migration.up = function(db) {
	db.createTable({
		'columns': {
			"title": "TEXT",
		    "source": "TEXT",
		    "source_mp3": "TEXT",
		    "date": "TEXT",
		    "note": "TEXT",
		    "num":"INTEGER",
		    "enable_mp3":"BOOL"
		},
		'adapter': {
			'type': "sql",
			'collection_name': "saved_recordings"
		}
    });
};

migration.down = function(db) {

};
