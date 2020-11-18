/**
 * @namespace
 */

PhSim.Audio = {}

/**
 * @constructor
 * @param {Object} p_audio - Static Audio Object
 * @param {Function} onload 
 */

PhSim.Audio.AudioArray = function(p_audio,onload) {

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

		audio.addEventListener("canplaythrough",function() {
			self.loaded_n++;

			if(self.array.length === self.loaded_n) {
				self.loaded = true;
				self.onload();
			}

		})

		audio.src = p_audio[i].src;
		audio.loop = p_audio[i].loop

		this.array.push(audio);

	}

}