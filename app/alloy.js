// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
if(Ti.App.getVersion() != Ti.App.Properties.getString('application_current_version'))
{
	Ti.App.Properties.setString('application_current_version', Ti.App.getVersion())
}

if(Titanium.App.Properties.getInt('app_first_init') != 1)
{
	//alert('First init');
	Ti.App.Properties.setString('config_compression',JSON.stringify(Ti.Media.AUDIO_FORMAT_ULAW));
	Titanium.App.Properties.setInt('recordNum', 0);
	Titanium.App.Properties.setString('config_email', 'webmaster@processmx.com')
	Titanium.App.Properties.setInt('app_first_init', 1);
	
	var obj1 = Alloy.createModel('download_file').set({
		title: "Aucun"
	});
	obj1.save();
	
	var current_record = Titanium.App.Properties.getInt('recordNum', 0);
	for(var i=0; i<20;i++)
	{
		var obj = Alloy.createModel('saved_recordings').set({
			title: "Mon enregistrement"+i,
			source: 'fichier.wav',
			source_mp3: 'le mp3',
			note:"aucune note sur l'enregistrement",
			date:'une date',
			num:current_record,
			
		});
		obj.save();
		current_record ++;
	}
	
	Titanium.App.Properties.setInt('recordNum', current_record);
	
}


Alloy.Collections.instance('saved_recordings');
Alloy.Collections.instance('download_file');
Alloy.Globals.currentMp3 = "Aucun";


Ti.API.info(Titanium.App.Properties.getInt('recordNum', 0))



