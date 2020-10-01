// Play Audio by Index

/**
 * @function playAudioByIndex
 * @param {Number} i - Index of audio in PhSim.DynSim.prototype.audioArray.
 */

export var playAudioByIndex = function(i) {
	this.audioArray.array[i].play();
}

/**
 * @function pauseAudioByIndex
 * @param {Number} i - Index of audio in PhSim.DynSim.prototype.audioArray.
 */

export var pauseAudioByIndex = function(i) {
	this.audioArray.array[i].pause();
}


/**
 * @function setAudioVolByIndex
 * @param {Number} i - Index of audio in PhSim.DynSim.prototype.audioArray.
 * @param {Number} v - Volume of audio
 */

export var setAudioVolByIndex = function(i,v) {
	this.audioArray.array[i].volume = v;
	return this.audioArray.array[i].volume; 
}

/**
 * @function setAudioMuteByIndex
 * @param {Number} i - Index of audio in PhSim.DynSim.prototype.audioArray.
 */

export var setAudioMuteByIndex = function(i) {
	this.audioArray.array[i].muted = v;
	return this.audioArray.array[i].muted;
}

/**
 * @function toggleAudioByIndex
 * @param {Number} i - Index of audio in PhSim.DynSim.prototype.audioArray.
 */

export var toggleAudioByIndex = function(i) {
	
	if(	this.audioArray.array[i].muted === true) {
		this.audioArray.array[i].muted = false;
		return false;
	}

	if(	this.audioArray.array[i].muted === false) {
		this.audioArray.array[i].muted = true;
		return true;
	}

}