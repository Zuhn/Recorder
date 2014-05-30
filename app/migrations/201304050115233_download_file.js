migration.up = function(db) {
	db.createTable({
		'columns': {
		    "title": "TEXT",
		    'url':"TEXT"
		},
		'adapter': {
			'type': "sql",
			'collection_name': "download_file"
		}
    });
};

migration.down = function(db) {

};