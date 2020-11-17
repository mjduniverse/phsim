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

PhSim.prototype.exit = function() {
	this.callEventClass("exit",this,new PhSim.PhEvent());
	this.deregisterKeyEvents();
	this.exitSl();
}