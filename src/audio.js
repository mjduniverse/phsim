const PhSim = require(".");

/**
 * @namespace
 * @memberof PhSim
 */

var Audio = {}

/**
 * @constructor
 * @param {Object} p_audio - Static Audio Object
 * @param {Function} onload 
 */

Audio.AudioArray = function(p_audio,onload) {

	// force load function if audio list is empty
	
	this.array = [];
	this.loaded_n = 0;
	this.loaded = false;
	this.onload = onload;

	var self = this;

	
	if(p_audio.length === 0) {
		self.loaded = true;
		self.onload();
	}

	for(var i = 0; i < p_audio.length; i++) {

		var audio = document.createElement("audio");

		var f = function() {
			self.loaded_n++;

			if(self.array.length === self.loaded_n) {
				self.loaded = true;
				self.onload();
				audio.removeEventListener("canplaythrough",f);
			}

		}

		audio.addEventListener("canplaythrough",f)

		audio.src = p_audio[i].src;
		audio.loop = p_audio[i].loop

		this.array.push(audio);

	}

}

/**
 * Play audio by index.
 * Alternative function: {@link PhSim#playAudioByIndex}
 * 
 * @function 
 * @param {PhSim} phsim - PhSim instance.
 * @param {Number} i - Index in audio array.
 * @returns {Promise} - Promise that is fulfilled when the audio is played. 
 */

Audio.playAudioByIndex = function(phsim,i) {
	return phsim.audioArray.array[i].play();
}

/**
 * Play audio by index
 * Alternative function: {@link PhSim.Audio#playAudioByIndex}
 * 
 * @function 
 * @param {PhSim} phsim - PhSim instance.
 * @param {Number} i - Index in audio array.
 * @returns {Promise} - Promise that is fulfilled when the audio is played.  
 */

PhSim.prototype.playAudioByIndex = function(i) {
	Audio.playAudioByIndex(this,i);
};

/**
 * Pause audio by index.
 * Alternative function: {@link PhSim#pauseAudioByIndex}
 * @function
 * @param {PhSim} phsim - PhSim instance.
 * @param {Number} i 
 */

Audio.pauseAudioByIndex = function(phsim,i) {
	return phsim.audioArray.array[i].pause();
}

/**
 * Pause audio by index.
 * Alternative function: {@link PhSim.Audio#pauseAudioByIndex}
 * @function
 * @param {Number} i 
 */

PhSim.prototype.pauseAudioByIndex = function(i) {
	return Audio.pauseAudioByIndex(this,i);
}

/**
 * Set volume by index
 * Alternative function: {@link PhSim#setAudioVolByIndex}
 * @function
 * @param {PhSim} phsim - PhSim instance
 * @param {Number} i - Index
 * @param {Number} v - Volume
 */

Audio.setAudioVolByIndex = function(phsim,i,v) {
	return phsim.audioArray.array[i].volume = v;
}

/**
 * Set volume by index
 * Alternative function: {@link PhSim.Audio#setAudioVolByIndex}
 * @function
 * @param {Number} i - Index
 * @param {Number} v - Volume
 */

PhSim.prototype.setAudioVolByIndex = function(i,v) {
	return Audio.setAudioVolByIndex(this,i,v);
}


/**
 * 
 * Mute the `i`th element of the audio array.
 * 
 * Alternative function: {@link PhSim#setAudioMuteByIndex}
 * 
 * @function
 * @param {Number} i
 * @param {PhSim} phsim - PhSim instance 
 */

Audio.setAudioMuteByIndex = function(phsim,i) {
	return phsim.audioArray.array[i].muted = v;
}

/**
 * 
 * Mute the `i`th element of the audio array.
 * 
 * Alternative function: {@link PhSim.Audio#setAudioMuteByIndex}
 * 
 * @function
 * @param {PhSim} phsim - PhSim instance 
 */

PhSim.prototype.setAudioMuteByIndex = function(i) {
	return Audio.setAudioMuteByIndex(this,i);
}

/**
 * @function
 * @param {PhSIm} phsim - PhSim instance
 * @param {Number} i - Index number
 * @returns {Boolean} - True if paused, false otherwise.
 */


Audio.toggleAudioByIndex = function(phsim,i) {
	return phsim.audioArray.array[i].muted = !phsim.audioArray.array[i].muted;
}

/**
 * @function
 * @param {Number} i
 * @returns {Boolean} - True if paused, false otherwise.
 */

PhSim.prototype.toggleAudioByIndex = function(i) {
	return Audio.toggleAudioByIndex(this,i);
}

module.exports = Audio;