PhSim.DynSim.prototype.assignPhRender = function(phRender) {

	/** PhRender object */

	this.phRender = phRender;

	/** Refence to simulation in PhRender */

	this.phRender.sim = this.sim;

	/** Refence to dynamic simulation in PhRender */

	this.phRender.dynSim = this;
	return phRender;
}

PhSim.DynSim.prototype.setRadius = function(dynObject,radius) {

	var ratio = radius / dynObject.radius;

	if(dynObject.regPolygon || dynObject.circle) {
		Matter.Body.scale(dynObject.object, ratio, ratio);
	}

}

PhSim.DynSim.prototype.setRectWidthAndHeight = function(dynObject,w,h) {

}

/**
 * 
 * @param {*} dyn_object - Dynamic Object
 * @param {*} colorStr - Color
 */

PhSim.DynSim.prototype.setColor = function(dyn_object,colorStr) {
	dyn_object.fillStyle = colorStr;
}

/**
 * 
 * @param {*} dyn_object 
 * @param {*} colorStr 
 */

PhSim.DynSim.prototype.setBorderColor = function(dyn_object,colorStr) {
	dyn_object.strokeStyle = colorStr;
}

/**
 * 
 * @param {*} dyn_object 
 * @param {*} lineWidth 
 */

PhSim.DynSim.prototype.setLineWidth = function(dyn_object,lineWidth) {
	dyn_object.lineWidth = lineWidth;
}