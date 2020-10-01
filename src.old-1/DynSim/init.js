export function initSim(simulationI) {

	this.status = 1;
	var self = this;
	this.status = 2;

	this.status = 3;
	var e = new PhSim.PhEvent();
	self.gotoSimulationIndex(0);
	self.callEventClass("load",self,e);
	self.addEventListener("collisionstart",function() {
		//self.playAudioByIndex(self.simulation.collisionSound);
	});
	self.status = 4;

}