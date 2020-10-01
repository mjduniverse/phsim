
/**
 * Assign a blank PhRender object to the PhSim.
 * @function configRender
 * 
 */

export var configRender = function() {
	
	this.assignPhRender(new PhSim.PhRender(this.simCtx));
	
	if(!this.noCamera) {
		this.camera = new PhSim.DynSimCamera(this);
		this.camera.translate(-this.camera.x,-this.camera.y);
	}

}

/***
 * Assign a phRender object ot the PhSim object
 * 
 * @function assignPhRender
 * @param {PhSim.PhRender}
 * 
 */

export var assignPhRender = function(phRender) {

	/** PhRender object */

	this.phRender = phRender;

	/** Refence to simulation in PhRender */

	this.phRender.sim = this.sim;

	/** Refence to dynamic simulation in PhRender */

	this.phRender.dynSim = this;
	return phRender;
}