
/**
 * Play audio in 
 * @param {Number} i - Index in audio array. 
 */

PhSim.prototype.playAudioByIndex = function(i) {
	return this.audioArray.array[i].play();
}

/**
 * 
 * @param {*} i 
 */

PhSim.prototype.pauseAudioByIndex = function(i) {
	return this.audioArray.array[i].pause();
}

/**
 * 
 * @param {*} i 
 */

PhSim.prototype.pauseAudioByIndex = function(i) {
	return this.audioArray.array[i].pause();
}

/**
 * 
 * @param {*} i 
 * @param {*} v 
 */

PhSim.prototype.setAudioVolByIndex = function(i,v) {
	this.audioArray.array[i].volume = v;
	return this.audioArray.array[i].volume; 
}

/**
 * 
 * @param {*} i 
 */

PhSim.prototype.setAudioMuteByIndex = function(i) {
	this.audioArray.array[i].muted = v;
	return this.audioArray.array[i].muted;
}

/**
 * 
 * @param {*} i 
 */

PhSim.prototype.toggleAudioByIndex = function(i) {
	
	if(	this.audioArray.array[i].muted === true) {
		this.audioArray.array[i].muted = false;
		return false;
	}

	if(	this.audioArray.array[i].muted === false) {
		this.audioArray.array[i].muted = true;
		return true;
	}

}