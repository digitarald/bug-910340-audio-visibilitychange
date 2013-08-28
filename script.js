'use strict';

var audios = document.getElementsByTagName('audio');

// BUG: Does not fire when screen is switched off while audio is playing!
document.addEventListener('mozvisibilitychange', function() {
	if (document.mozHidden) {
		var paused = Array.filter(audios, function(audio) {
			if (audio.paused) {
				return false;
			}
			audio.$forcePaused = true;
			audio.pause();
			return true;
		}).length;
		log('Change: Hidden. ' + paused + ' playing');
	} else {
		var resumed = Array.filter(audios, function(audio) {
			if (!audio.$forcePaused) {
				return false;
			}
			audio.$forcePaused = false;
			audio.play();
			return true;
		}).length;
		log('Change: Visible. ' + resumed + ' resumed');
	}
})

document.addEventListener('blur', function() {
	log('Blurred');
});


// Debugging
var logs = '';

function log(msg) {
	console.log(msg);
	var el = document.getElementById('log');
	logs = msg + '\n' + logs;
	el.textContent = logs;
}
