var button = Titanium.UI.createButton({
	image:'app_icon_library.png',
	backgroundImage:'app_bt_disable.png',
	backgroundDisabledImage:'app_bt_enable.png',
	top:'15dp',
	bottom:'5dp',
	width: '32',
	height: '35',
	left:'20dp'
});

var music_label = Ti.UI.createLabel({
	color: '#FFF',
	font: { fontSize:'10dp', fontFamily:'Frutiger LT Std', fontStyle:'bold' },
	text: L('fichier_mp3'),
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	left:'62dp',
	width: Ti.UI.SIZE, height: Ti.UI.SIZE
})

var button_label = Ti.UI.createLabel({
	color: '#FFF',
	font: { fontSize:'10dp', fontFamily:'Frutiger LT Std', fontStyle:'bold' },
	text: L('ouvrir_librairie'),
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	top: '25dp',
	left:'62dp',
	width: Ti.UI.SIZE, height: Ti.UI.SIZE
})

var separator = Ti.UI.createView({
	backgroundImage:'app_separator.png',
	height:'10dp'
});


button.addEventListener('click',function(e)
{

	if(button.backgroundImage=='app_bt_disable.png')
	{
		button_label.text = L('fermer_librairie');
		button.backgroundImage='app_bt_enable.png';
		button.backgroundDisabledImage='app_bt_disable.png';
		Ti.App.fireEvent('openLib');
	}
	else
	{
		button_label.text = L('ouvrir_librairie');
		button.backgroundImage='app_bt_disable.png';
		button.backgroundDisabledImage='app_bt_enable.png';
		Ti.App.fireEvent('closeLib');
	}
	
	
});

Ti.App.addEventListener('musicSelected', function(e){
	music_label.text = e.title;
});

var openConfig = function(e)
{
	var config = Alloy.createController('p_settings').getView();
	config.open({transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
}

$.bt_config.addEventListener('click' ,openConfig);

$.row_selected.add(button);
$.row_selected.add(button_label)
$.view_separator.add(separator);
//$.view.height = 'Ti.UI.SIZE';
$.view.backgroundColor='transparent';