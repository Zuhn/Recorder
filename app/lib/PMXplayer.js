/*
 * FILTERABLE ITEM PROPERTIES
 * 
 * example with treack: relator
 * only possible on device!
 * 
 * picked.items[0].mediaType        //outputs 1
 * picked.items[0].title            //outputs Relator
 * picked.items[0].albumTitle       //outputs Breakup
 * picked.items[0].artist           //outputs Pete Yorn & Scarlett Johansson
 * picked.items[0].albumArtist      //outputs Pete Yorn/Scarlett Johansson
 * picked.items[0].genre            //outputs Pop
 * picked.items[0].composer         //outputs Pete Yorn
 * picked.items[0].isCompilation    //outputs 0
 * 
 * 
 * ITEM POPERTIES
 * 
 * picked.items[0].playbackDuration //outputs 153.913
 * picked.items[0].albumTrackNumber //outputs 1
 * picked.items[0].albumTrackCount  //outputs 0
 * picked.items[0].discNumber       //outputs 1
 * picked.items[0].discCount        //outputs 0
 * picked.items[0].lyrics           //outputs 0
 * picked.items[0].podcastTitle     //outputs Breakup
 * picked.items[0].playCount        //outputs 2
 * picked.items[0].skipCount        //outputs 0
 * picked.items[0].rating           //outputs 4
 * 
 */
var Alloy = require('alloy');
var _ = require('alloy/underscore')._;
var Backbone = require('alloy/backbone');
var playback = null;

var barUpdate = function(e)
{
	var perc = (100/player.nowPlaying.playbackDurantion)*player.currentPlaybackTime;
	var bw = (Titanium.Platform.DisplayCaps.platformWidth/100)*perc;
	Alloy.Globals.playerBar.width = bw;
	console.log(bw);
}

try {
	console.log('create music player')
		exports.player = Titanium.Media.systemMusicPlayer;
		
		if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_PLAYING) {
			
			//timeBar.max = player.nowPlaying.playbackDuration;
			//timeBar.value = player.currentPlaybackTime;
			if (playback == null) {
				playback = setInterval(barUpdate, 500);
			}
		}
	
		var event1 = 'stateChange';
		var event2 = 'playingChange';
		var event3 = 'volumeChange';
		if (Ti.version >= '3.0.0') {
			event1 = 'statechange';
			event2 = 'playingchange';
			event3 = 'volumechange';
		}
		player.addEventListener(event1, function() {
			if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_STOPPED) {
				//title.text = '';
				//info.text = '';
				//timeBar.hide();
				//timeBar.max = 0;
				//timeBar.value = 0;
				clearInterval(playback);
				playback = null;
			}
			if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_PLAYING) {
				//info.text = player.nowPlaying.artist + ' : ' + player.nowPlaying.albumTitle;
				//title.text = player.nowPlaying.title;
				//timeBar.show();
				//timeBar.max = player.nowPlaying.playbackDuration;
				//timeBar.value = player.currentPlaybackTime;
				if (playback == null) {
					playback = setInterval(barUpdate, 500);
				}
			}
		});
		player.addEventListener(event2, function() {
			if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_PLAYING) {
				//info.text = player.nowPlaying.artist + ' : ' + player.nowPlaying.albumTitle;
				//title.text = player.nowPlaying.title;
				//timeBar.show();
				//timeBar.max = player.nowPlaying.playbackDuration;
				//timeBar.value = 0;
				if (playback == null) {
					playback = setInterval(barUpdate, 500);
				}
			}
		});
		player.addEventListener(event3, function() {
			Ti.API.log('Volume change: '+player.volume);
		});
		
	}
	catch (e) {
		// create alert
		Titanium.UI.createAlertDialog({
			title:'Music Player',
			message:'Please run this test on device: Inoperative on simulator'
		}).show();
	}