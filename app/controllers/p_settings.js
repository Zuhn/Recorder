var compression;
$.v_share.text = L('titre_config');
$.t_hf.text = L('titre_hf');
$.t_email.text = L('titre_email');
$.t_email_notes.text = L('titre_email_notes');
$.t_df.text = L('titre_details_fichier');
//Init switch position
if(Ti.App.Properties.getString('config_compression') == JSON.stringify(Ti.Media.AUDIO_FORMAT_LINEAR_PCM))
{
	$.switch_hf.value = true;
}
if(Titanium.App.Properties.getString('config_email_notes') == 'true')
{
	$.switch_1.value = true;
}

if(Titanium.App.Properties.getString('config_email_details') == 'true')
{
	$.switch_2.value = true;
}


$.v_back.addEventListener('click', function()
{
	//Ti.App.fireEvent('openHome');
	$.win.close({transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	
});


$.txt_email.addEventListener('change',function(e){
	Titanium.App.Properties.setString('config_email',$.txt_email.value);
});
$.switch_1.addEventListener('change',function(e){
	Titanium.App.Properties.setString('config_email_notes',JSON.stringify($.switch_1.value));
});
$.switch_2.addEventListener('change',function(e){
	Titanium.App.Properties.setString('config_email_details',JSON.stringify($.switch_2.value));
});

//Switcher Haute fidélité
$.switch_hf.addEventListener('change',function(e)
{
	if (!$.switch_hf.value)
	{
		compression = Ti.Media.AUDIO_FORMAT_ULAW;
		Alloy.Globals.trace("Compression HF désactivée");
	}
	else
	{
		compression = Ti.Media.AUDIO_FORMAT_LINEAR_PCM;
		Alloy.Globals.trace("Compression HF activée");
	}
	
	Ti.App.Properties.setString('config_compression',JSON.stringify(compression));
	
});

$.txt_email.value = Titanium.App.Properties.getString('config_email');