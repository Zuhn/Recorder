var args = arguments[0] || {};
var data = args.data || null;
var title = data.title;
var date = data.date;
var source = data.source;
var source_mp3 = data.source_mp3;
var note = data.note;
var num = data.num;
var index = args.index;

$.win.width = Titanium.Platform.displayCaps.platformWidth;

$.switch_hf.value = data.enable_mp3

$.r_title.value = title;
$.r_date.text = date;
$.r_source.text = "N°"+num+" - "+source;
$.r_source_mp3.text = source_mp3;
$.r_note.value = note;

var slideClose = Ti.UI.createAnimation();
slideClose.left = Titanium.Platform.displayCaps.platformWidth;
slideClose.curve= Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
slideClose.duration = 410;

$.v_back.addEventListener('click', function()
{
	var item = Alloy.Globals.library.at(index);
	item.set({'note':$.r_note.value, 'title':$.r_title.value, enable_mp3:$.switch_hf.value});
	item.save();
	Alloy.Globals.library.fetch();
	
	Ti.App.fireEvent('openHome');
	$.win.close(slideClose);
	
});

$.v_delete.addEventListener('click', function()
{
	Alloy.Globals.trace('Fichier '+source+' supprimé');
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,source);
	if (file.exists()) { 
		//alert('fichier supprimé');
		file.deleteFile(); 
	}
	var item = Alloy.Globals.library.at(index);
	item.destroy();
	Alloy.Globals.library.fetch();
	
	Ti.App.fireEvent('openHome');
	$.win.close(slideClose);
	
});
var sendByEmail = function(e)
{
	var emailDialog = Ti.UI.createEmailDialog();
	var b = '';
	if(Titanium.App.Properties.getString('config_email_details') == 'true')
	{
		b+='\Nom du fichier: '+$.r_title.value;
		b+='\nDate: '+$.r_date.text;
		b+='\nFichier enregistré: '+$.r_source.text;
		b+='\nFichier utilisé: '+$.r_source_mp3.text;
	}
	if(Titanium.App.Properties.getString('config_email_notes') == 'true')
	{
		b+='\nNotes :'
		b+='\n'+$.r_note.value
	}
	
	emailDialog.subject = "Envoi du fichier audio "+$.r_title.value;
	emailDialog.toRecipients = [Titanium.App.Properties.getString('config_email')];
	emailDialog.messageBody = b;
	var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,source);
	emailDialog.addAttachment(f);
	emailDialog.open();
}

$.v_share.addEventListener('click', sendByEmail);
