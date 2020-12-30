const PhSim = require(".");

// Try to import matter-js as a commonJS module

try {
	const Matter = require("matter-js");
}

catch {
	
}

/**
 * Assign PhRender to PhSim simulation
 * @param {PhSim.PhRender} phRender 
 */

PhSim.prototype.assignPhRender = function(phRender) {

	/** PhRender object */

	this.phRender = phRender;

	/** Refence to simulation in PhRender */

	this.phRender.sim = this.sim;

	/** Refence to dynamic simulation in PhRender */

	this.phRender.dynSim = this;
	return phRender;
}

PhSim.prototype.setRadius = function(dynObject,radius) {

	var ratio = radius / dynObject.radius;

	if(dynObject.shape === "regPolygon" || dynObject.shape === "circle") {
		Matter.Body.scale(dynObject.object, ratio, ratio);
	}

}