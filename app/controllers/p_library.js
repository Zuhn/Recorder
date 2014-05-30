$.index.width=Titanium.Platform.displayCaps.platformWidth;
var button = Titanium.UI.createButton({
	image:'app_icon_download.png',
	backgroundImage:'app_bt_disable.png',
	backgroundDisabledImage:'app_bt_enable.png',
	top:'15dp',
	bottom:'5dp',
	width: '32',
	height: '35',
	left:'20dp'
});

var button_label = Ti.UI.createTextField({
	color: '#80000000',
	font: { fontSize:'10dp', fontFamily:'Frutiger LT Std', fontStyle:'bold' },
	hintText: L('url_mp3'),
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	top: '20dp',
	left:'62dp',
	width: '238dp', height: '25dp',
	backgroundColor:'transparent',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
})
var ind = Ti.UI.createProgressBar({
	min:0,
	value:0,
	left:'20dp',
	right:'20dp',
	width:'280dp',
	height:40,
	top:'50dp',
	color:'black',
	style:Titanium.UI.iPhone.ProgressBarStyle.BAR
});
ind.show();
$.index.add(button);
$.index.add(button_label);
$.index.add(ind);
button.addEventListener('click',function(e)
{
	if(button_label.value=="")
	{
		alert('Entrez une adresse valide pour le fichier mp3')
	}
	else
	{
		var re1='.*?';	// Non-greedy match on filler
	      var re2='(?:[a-z][a-z\\.\\d_]+)\\.(?:[a-z\\d]{3})(?![\\w\\.])';	// Uninteresting: file
	      var re3='.*?';	// Non-greedy match on filler
	      var re4='((?:[a-z][a-z\\.\\d_]+)\\.(?:[a-z\\d]{3}))(?![\\w\\.])';	// File Name 1

	      var p = new RegExp(re1+re2+re3+re4,["i"]);
	      var m = p.exec(button_label.value);
	      if (m != null)
	      {
	          var file1=m[1];
	      }
		
		download(button_label.value, file1.replace(/</,"&lt;"));
	}
	
	
});

function download(filename, _name)
{
    ind.value = 0;
    c = Titanium.Network.createHTTPClient();
    c.setTimeout(10000);
    c.onload = onSuccess;
    function onSuccess()
    {
        var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,_name);
        f.write(c.responseData);
        var obj = Alloy.createModel('download_file').set({
    		title: _name,
    	});
    	obj.save();
    	//Refresh TableView
    	library.fetch();
    }
 
    c.ondatastream = function(e)
    {
        ind.value = e.progress ;
    };
    c.onerror = function(e)
    {
        Ti.API.info('XHR Error ' + e.error);
    };
    c.open('GET', filename);
 
    c.send();
};

$.tbl.addEventListener('click', function(e){
	// alert(JSON.stringify(e.rowData));
	Alloy.Globals.currentMp3 = e.rowData.title;   
	Ti.App.fireEvent('changeMp3');
    // the example above would print your name
});
function transformFunction(model) {
    // Need to convert the model to a JSON object
    var transform = model.toJSON();
    transform.title = transform.title;
    // Example of creating a custom attribute, reference in the view using {custom}
    transform.custom = transform.title;
    return transform;
}

// Trigger the synchronization
var library = Alloy.Collections.download_file;
library.fetch();


