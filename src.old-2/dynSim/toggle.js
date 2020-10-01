PhSim.DynSim.prototype.play = function() {

	if(this.init === false) {
		this.initSim(0);
	}

	else {
		this.paused = false;
	}

}

PhSim.DynSim.prototype.toggle = function() {
	
	if(this.paused === false) {
		this.paused = true;
		return true;
	}

	if(this.paused === true) {
		this.paused = false;
		return false;
	}; 

}

PhSim.DynSim.prototype.pause = function() {
	this.paused = true;
}

PhSim.DynSim.prototype.exitSl = function() {
	this.callEventClass("beforeslchange",this,new PhSim.PhEvent());
	this.paused = false;
	clearInterval(this.intervalLoop);
}

PhSim.DynSim.prototype.exit = function() {
	this.callEventClass("exit",this,new PhSim.PhEvent());
	this.deregisterKeyEvents();
	this.exitSl();
}