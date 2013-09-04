(function() {
	'use strict';

	var audios = document.getElementsByTagName('audio');

	// https://bugzilla.mozilla.org/show_bug.cgi?id=910340#c12
	Array.forEach(audios, function(audio) {
		var before = audio.mozAudioChannelType || '""';
		audio.mozAudioChannelType = 'content';
		alert(before + ' -> ' + audio.mozAudioChannelType);
	});

	function onHide() {
		var paused = Array.filter(audios, function(audio) {
			if (audio.paused) {
				return false;
			}
			audio.$forcePaused = true;
			audio.pause();
			return true;
		}).length;
		log('Change: Hidden. ' + paused + ' playing');
	}

	function onShow() {
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

	// BUG: Does not fire when screen is switched off while audio is playing!
	// FIX: Set .mozAudioChannelType on audio element to 'content'
	document.addEventListener('mozvisibilitychange', function() {
		if (document.mozHidden) {
			onHide();
		} else {
			onShow();
		}
	});

	// BUG/FIX: Works also only with the aforementioned fix
	/*
	window.addEventListener('focus', function() {
		log('window.onfocus');
		onShow();
	});
	window.addEventListener('focusout', function() {
		log('window.onfocusout');
		onHide();
	});
	window.addEventListener('blur', function() {
		log('window.onblur');
		onHide();
	});
	*/


	// Debugging
	var logs = '';

	function log(msg) {
		console.log(msg);
		var el = document.getElementById('log');
		logs = msg + '\n' + logs;
		el.textContent = logs;
	}

})();
