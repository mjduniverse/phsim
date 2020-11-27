PhSim.prototype.play = function() {
	this.paused = false;
	this.intervalLoop = setInterval(this.loopFunction.bind(this),this.delta);
}

PhSim.prototype.pause = function() {
	clearInterval(this.intervalLoop);
	this.paused = true;
}

PhSim.prototype.toggle = function() {
	
	if(this.paused) {
		this.play();
	}

	else {
		this.pause();
	}

}

PhSim.prototype.exitSl = function() {
	this.callEventClass("beforeslchange",this,new PhSim.PhEvent());
	this.paused = false;
	clearInterval(this.intervalLoop);
}

/**
 * @function
 * Completely reset PhSim object. That is, make it as if it is a new one.
 * 
 */

PhSim.prototype.exit = function() {

	// Remove references to avoid memory leak

	delete this.camera.dynSim
	delete this.phRender.dynSim

	for(var i = 0; i < this.objUniverse.length; i++) {
		delete this.objUniverse[i].phSim;
	}

	this.callEventClass("exit",this,new PhSim.PhEvent());
	this.deregisterCanvasEvents();
	this.deregisterKeyEvents();
	this.exitSl();

	// Erase all things

	Object.assign(this,new PhSim());
}