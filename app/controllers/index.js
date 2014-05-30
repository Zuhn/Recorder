Alloy.Globals.playerBar = $.view_playerbar;
Alloy.Globals.main = $.index;

$.index.height = Titanium.Platform.displayCaps.platformHeight;
$.index.width =Titanium.Platform.displayCaps.platformWidth;

var slideOut = Ti.UI.createAnimation();
slideOut.opacity = 0;
slideOut.curve= Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
slideOut.duration = 400;



var slideOpen = Ti.UI.createAnimation();
slideOpen.left = '0dp';
slideOpen.curve= Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
slideOpen.duration = 400;

var slideClose = Ti.UI.createAnimation();
slideClose.left = -Titanium.Platform.displayCaps.platformWidth;
slideClose.curve= Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
slideClose.duration = 400;

$.index.width = Titanium.Platform.displayCaps.platformWidth;
Ti.App.addEventListener('openHome', function()
{
	$.index.animate(slideOpen);
});

Ti.App.addEventListener('closeHome', function()
{
	$.index.animate(slideClose);
});

var window_library;

var slide_open = Ti.UI.createAnimation({
	height:'150dp',
    curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
    duration: 300
});
var timeBar = Ti.UI.createProgressBar({
	min:0,
	value:0,
	left:'20dp',
	right:'20dp',
	width:'280dp',
	height:40,
	//top:240,
	color:'black',
	style:Titanium.UI.iPhone.ProgressBarStyle.BAR
});
//$.view_playerbar.add(timeBar);
/*
Titanium.App.addEventListener('open', function (e) {
    Ti.API.info('app.js: Open event on '+Ti.Platform.osname);
});     
Titanium.App.addEventListener('close', function (e) {
    Ti.API.info('app.js: Close event on '+Ti.Platform.osname);
    player.stop();
});     
Titanium.App.addEventListener('pause', function (e) {
    Ti.API.info('app.js: Pause event on '+Ti.Platform.osname);
    player.pause();
});     
Titanium.App.addEventListener('resume', function (e) {
    Ti.API.info('app.js: Resume event on '+Ti.Platform.osname);
    //player.play();
});

*/

$.index.addEventListener('open',function(e) {

	var v_select = Alloy.createController('v_select').getView();
	$.view_select.add(v_select);
	var v_record = Alloy.createController('v_recorder').getView();
	$.view_record.add(v_record);
	
	$.intro.animate(slideOut);
	
});

$.index.addEventListener('close',function(e) {
	//alert("hello");
	//var precorder = Ti.UI.createController('page_recorder').getView().open();
	//Alloy.Globals.player1.player.stop();
});

$.index.addEventListener('focus',function(e) {
	
	
});


var openLib = function()
{
	
	window_library = Alloy.createController('p_library').getView();
	window_library.top = '500dp';
	window_library.backgroundColor='transparent';
	window_library.backgroundImage='app_background.jpg';
	// create window open animation
	var a = Titanium.UI.createAnimation();
	a.top = '117dp';
	//a.opacity = 0.8;
	a.duration = 400;
	
	window_library.open(a);
	//Ti.Media.openMusicLibrary(settings);
}

var closeLib = function()
{
	// create window open animation
	var a = Titanium.UI.createAnimation();
	a.top = '600dp';
	a.duration = 400;
	
	window_library.close(a);
	//Ti.Media.openMusicLibrary(settings);
}

Ti.App.addEventListener('openLib', openLib);
Ti.App.addEventListener('closeLib', closeLib);


var settings = {
	success:function(picked)
	{
		if (!settings.autohide) {
			Ti.API.log("You didn't autohide me!");
			Ti.Media.hideMusicLibrary();
		}
		Ti.App.fireEvent('musicSelected', {title:picked.items[0].artist+": "+picked.items[0].title});
		//player.setQueue(picked);
		//player.play();
		
		
	},
	error:function(error)
	{
		// create alert
		var a = Titanium.UI.createAlertDialog({title:'Music Picker'});

		// set message
		if (error.code == Titanium.Media.NO_MUSIC_PLAYER)
		{
			a.setMessage('Please run this test on device');
		}
		else
		{
			a.setMessage('Unexpected error: ' + error.code);
		}

		// show alert
		a.show();
	},
	mediaTypes:[Ti.Media.MUSIC_MEDIA_TYPE_ALL],
	autohide:true
};





$.index.open();


