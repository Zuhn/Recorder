var currentSessionMode = Titanium.Media.audioSessionMode;
var current_debug = 0;
var recording = Ti.Media.createAudioRecorder();
var timer;	

	
Ti.Media.addEventListener('recordinginput', function(e) {
	Ti.API.info('Input availability changed: '+e.available);
	if (!e.available && recording.recording) {
		button.fireEvent('click', {});
	}
});

var file;
var timer;
var last_row;

//Player son 1
var soundPlayer1;
soundPlayer1 = Titanium.Media.createSound();


//Player son 2
var soundPlayer2;
soundPlayer2 = Titanium.Media.createSound();

function showLevels()
{
	//var peak = Ti.Media.peakMicrophonePower;
	//var avg = Ti.Media.averageMicrophonePower;
	//duration++;
	//label.text = 'duration: '+duration+' seconds\npeak power: '+peak+'\navg power: '+avg;
}

//Bouton départ/arrêt de l'enregistrement
var button = Titanium.UI.createButton({
	image:'app_icon_recording.png',
	backgroundImage:'app_bt_disable.png',
	backgroundDisabledImage:'app_bt_enable.png',
	top:'0dp',
	bottom:'15dp',
	width: '32',
	height: '35',
	left:'20dp'
});
//Label du bouton
var button_label = Ti.UI.createLabel({
	color: '#FFF',
	font: { fontSize:'10dp', fontFamily:'Frutiger LT Std', fontStyle:'bold' },
	text: L('enregistrer'),
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	top: '10dp',
	left:'62dp',
	width: Ti.UI.SIZE, height: Ti.UI.SIZE
});

var debug = Ti.UI.createTextArea({
	top:'0dp',
	editable:false,
	height:'100dp',
	width:'150dp',
	right:'10dp',
	value:'version : '+Ti.App.getVersion(),
	color: '#80000000',
	borderWidth: 1,
	borderColor: '#30000000',
	backgroundColor:'#10000000',
	borderRadius: 2,
	//backgroundColor:'transparent',
	font: { fontSize:'8dp', fontFamily:'Frutiger LT Std', fontStyle:'bold' }
});

var setDebug = function(_t)
{
	//debug.value = current_debug+': '+_t+'\n'+debug.value;
	//current_debug++;
}

button.addEventListener('click', function()
{
	if (recording.recording)
	{
		stopAndSave();
		slider.enabled = false;
	}
	else
	{
		startRecording();
		slider.enabled = true;
	}
});

var slider = Titanium.UI.createSlider({
    top: '80dp',
    left:'167dp',
    min: 0,
    max: 100,
    width: '130dp',
    value: 50,
    color:'black',
    enabled:false
    });
var labelMusic = Ti.UI.createLabel({
    text: L('aucun_mp3_select'),
    width: '130dp',
    height: 'auto',
    top: '11dp',
    left: '170dp',
    color:'white',
    font: { fontSize:'10dp', fontFamily:'Frutiger LT Std', fontStyle:'bold' },
    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
    });   
var label = Ti.UI.createLabel({
    text: slider.value,
    width: Ti.UI.SIZE,
    height: 'auto',
    top: '55dp',
    left: '170dp',
    color:'white',
    font: { fontSize:'10dp', fontFamily:'Frutiger LT Std', fontStyle:'bold' },
    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
    });

slider.addEventListener('change', function(e) {
    label.text = "VOLUME: "+String.format("%3.1f", e.value);
    soundPlayer2.volume = e.value/100;
});
var changeTitle = function(e)
{
	labelMusic.text = L("source_enregistrement")+":\n"+Alloy.Globals.currentMp3;
}
Ti.App.addEventListener('changeMp3', changeTitle)
$.index.add(button);
$.index.add(button_label);
//$.index.add(debug);
$.index.add(label);
$.index.add(slider);
$.index.add(labelMusic);

var startRecording = function()
{
	Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAY_AND_RECORD;
	if (!Ti.Media.canRecord) {
		Ti.UI.createAlertDialog({
			title:'Error!',
			message:'No audio recording hardware is currently connected.'
		}).show();
		return;
	}
	recording = null;
	recording = Ti.Media.createAudioRecorder();
	recording.compression = JSON.parse(Ti.App.Properties.getString('config_compression'));
	recording.format = Ti.Media.AUDIO_FILEFORMAT_WAVE;
	
	
	
	if(Alloy.Globals.currentMp3 != "")
	{
		labelMusic.text = L("source_enregistrement")+":\n"+Alloy.Globals.currentMp3;
		slider.enabled=true;
		soundPlayer2 = Titanium.Media.createSound({url: Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,Alloy.Globals.currentMp3)});
		soundPlayer2.volume = slider.value/100;
	}
	else
	{
		labelMusic.text =  L("no_source_enregistrement");
		slider.enabled =false;
	}
	button.backgroundImage='app_bt_enable.png';
	button.backgroundDisabledImage='app_bt_disable.png';
	timer = setInterval(updateBarRecord,500);
	Ti.Media.startMicrophoneMonitor();
	if(Alloy.Globals.currentMp3 != "")
	{
		soundPlayer2.play();
	}
	recording.start();
}

var updateBarRecord = function(e)
{
	$.v_voice.width = Titanium.Platform.displayCaps.platformWidth*Ti.Media.peakMicrophonePower;
	try
	{
	var per = (100/soundPlayer2.duration)*(soundPlayer2.time/100);
	var per2 = (Titanium.Platform.displayCaps.platformWidth/1000)*per;
	Alloy.Globals.playerBar.width = per2;

	Ti.API.log('Time Played: ' + soundPlayer1.duration+"    "+per+"   "+per2);
	
	//var peak = Ti.Media.peakMicrophonePower;
	//var avg = Ti.Media.averageMicrophonePower;
	
	
	}
	catch(e)
	{
		//fdgdf
	}
}

var stopAndSave = function()
{
	$.v_voice.width = 0;
	clearInterval(timer);
	if(Alloy.Globals.currentMp3 != "" || Alloy.Globals.currentMp3 != "Aucun")
	{
		try
		{
			soundPlayer2.stop();
		}
		catch(e)
		{
			//ff;
		}
	}
	button.backgroundImage='app_bt_disable.png';
	button.backgroundDisabledImage='app_bt_enable.png';
	file = recording.stop();

	Ti.Media.stopMicrophoneMonitor();

	var timeStamp = new Date().getTime();
	var f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'recording_'+timeStamp+'.wav');

	f.write(file.toBlob);
	var current_record = Titanium.App.Properties.getInt('recordNum', -1);
	current_record ++;
	Titanium.App.Properties.setInt('recordNum', current_record);
	var obj = Alloy.createModel('saved_recordings').set({
		title: L("nom_enregistrement")+current_record,
		source:'recording_'+timeStamp+'.wav',
		source_mp3: Alloy.Globals.currentMp3,
		note:L("aucune_note"),
		date:getDate(),
		num:current_record,
		enable_mp3:true
	});
	obj.save();
	//Refresh TableView
	Alloy.Globals.library.fetch();
	Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
	Alloy.Globals.trace('Enregistrement du fichier : recording_'+timeStamp+'.wav');
}

	
	
//recording.compression = Alloy.Globals.record_compression;

//GESTION DU TABLEVIEW

function transformFunction(model) {
    // Need to convert the model to a JSON object
    var transform = model.toJSON();
    transform.title = transform.title;
    // Example of creating a custom attribute, reference in the view using {custom}
    transform.custom = transform.title;
    return transform;
}

// Show only book models by Mark Twain
function filterFunction(collection) {
    return collection.where({author:'Mark Twain'});
}

// Trigger the synchronization
Alloy.Globals.library = Alloy.Collections.saved_recordings;
Alloy.Globals.library.fetch();

var slideLeft = Ti.UI.createAnimation();
slideLeft.left = 0;
slideLeft.duration = 300;

$.tbl.addEventListener('longpress', function(e){
	 
	if(e.rowData.title == undefined)
	{
		return;
	}
	Titanium.API.info("huzzah, a row was swiped "+JSON.stringify(e));
	//Titanium.API.info("huzzah, a row was swiped "+JSON.stringify(e));
	//alert(e.source);
	var details = Alloy.createController('p_details',{
		data:e.rowData,
		index:e.index
	}).getView();
	details.left=Titanium.Platform.displayCaps.platformWidth;
	
	details.open(slideLeft);
	Ti.App.fireEvent('closeHome');
	 
});

$.tbl.addEventListener('click', function(e){
   // alert(JSON.stringify(e.rowData));
	if(last_row != null)
	{
		if(e.rowData == last_row)
		{
			last_row.backgroundColor = "#50000000";
			endUpdateBar(null);
			soundPlayer1.stop();
			soundPlayer1.release();
			soundPlayer1 = null;
			
			soundPlayer2.stop();
			soundPlayer2.release();
			soundPlayer2 = null;
			
			
			last_row = null;
			
			return;
		}
		
		last_row.backgroundColor = "#50000000";	
	    
	}
	
	last_row = e.rowData;

	clearInterval(timer);

	e.rowData.backgroundColor='#a40228';

	
		try
		{
			soundPlayer1.stop();
			soundPlayer1.release();
			soundPlayer1 = null;
		}
		catch(e)
		{
			//hgj
		}
		
		try
		{
			soundPlayer2.stop();
			soundPlayer2.release();
			soundPlayer2 = null;
		}
		catch(e)
		{
			//hgj
		}
		soundPlayer1 = Titanium.Media.createSound();
		var f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,e.rowData.source);
		soundPlayer1.url=f;
		//alert(JSON.stringify(f));
		if(e.rowData.enable_mp3 == true)
		{
			slider.enabled = true;
			if(e.rowData.source_mp3 != "" || e.rowData.source_mp3 != L("aucun"))
			{
				soundPlayer2 = Titanium.Media.createSound({url: Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,e.rowData.source_mp3)});
				soundPlayer2.volume = slider.value/100;
				soundPlayer2.play();
				labelMusic.text = L("source_enregistrement")+":\n"+e.rowData.source_mp3;
			}
			
		}
		else
		{
			slider.enabled = false;
		}
		
		
		soundPlayer1.play();
		
		soundPlayer1.addEventListener('complete',endUpdateBar);
		timer = setInterval(updateBar,100);
		
	

    // the example above would print your name
});

Alloy.Globals.playerBar.width = $.index.width;

var endUpdateBar = function(e)
{
	
	clearInterval(timer);
	Ti.API.log('FIN');
	soundPlayer1.removeEventListener('complete',endUpdateBar);
	try
	{
	soundPlayer2.stop();
	}
	catch(e)
	{
		//gf
	}

	last_row.backgroundColor = "#50000000";
	last_row = null;
	Alloy.Globals.playerBar.width = Titanium.Platform.displayCaps.platformWidth;
}
var updateBar = function(e)
{
	try
	{
	var per = (100/soundPlayer1.duration)*(soundPlayer1.time/100);
	var per2 = (Titanium.Platform.displayCaps.platformWidth/1000)*per;
	Alloy.Globals.playerBar.width = per2;

	Ti.API.log('Time Played: ' + soundPlayer1.duration+"    "+per+"   "+per2);
	
	//var peak = Ti.Media.peakMicrophonePower;
	//var avg = Ti.Media.averageMicrophonePower;
	
	
	}
	catch(e)
	{
		//fdgdf
	}
		   // set the progress bar's progress value with current time played.. (milliseconds) 
		  // pb.value =  Math.round(e.progress/1000) ; 
}
	
	
function getDate() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    
    if (day < 10) { day = "0" + day}; 
    if (month < 10) { month = "0" + month}; 
    
    if (hours < 10) { hours = "0" + hours}; 
    if (minutes < 10) { minutes = "0" + minutes};
    if (seconds < 10) { seconds = "0" + seconds};
 
    return month + "/" + day + "/" + year + " à " + hours + ":" + minutes + ":" + seconds;
}
	
Alloy.Globals.trace = setDebug;
Alloy.Globals.trace('Initialisation terminée.');
	
	
	




