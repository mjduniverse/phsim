
// Play Audio Index

PhSim.DynSim.prototype.playAudioByIndex = function(i) {
	this.audioArray.array[i].play();
}

PhSim.DynSim.prototype.pauseAudioByIndex = function(i) {
	this.audioArray.array[i].pause();
}

PhSim.DynSim.prototype.pauseAudioByIndex = function(i) {
	this.audioArray.array[i].pause();
}

PhSim.DynSim.prototype.setAudioVolByIndex = function(i,v) {
	this.audioArray.array[i].volume = v;
	return this.audioArray.array[i].volume; 
}

PhSim.DynSim.prototype.setAudioMuteByIndex = function(i) {
	this.audioArray.array[i].muted = v;
	return this.audioArray.array[i].muted;
}

PhSim.DynSim.prototype.toggleAudioByIndex = function(i) {
	
	if(	this.audioArray.array[i].muted === true) {
		this.audioArray.array[i].muted = false;
		return false;
	}

	if(	this.audioArray.array[i].muted === false) {
		this.audioArray.array[i].muted = true;
		return true;
	}

}