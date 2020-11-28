/**
 * @constructor
 * @memberof PhSim
 * @param {*} dynSim 
 */

var Camera = function(dynSim) {

	/**
	 * Dynamic Simulation
	 * @type {PhSim}
	 */

	this.dynSim = dynSim;

}

/**
 * Camera scale
 * @type {Number}
 */

Camera.prototype.scale = 1;

/**
 * Camera offset x 
 * @type {Number}
 */

Camera.prototype.x = 0;

/**
 * Camera offset y
 * @type {Number}
 */

Camera.prototype.y = 0;

/**
 * Target object
 * @type {StaticObject}
 */

Camera.prototype.targetObj = null;

/**
 * Objects that will transform with the camera
 * @type {StaticObject[]}
 */

Camera.prototype.transformingObjects = []

Camera.prototype.zoomIn = function(scaleFactor) {
	this.scale = this.scale * scaleFactor;
	this.dynSim.simCtx.scale(scaleFactor,scaleFactor);
}

Camera.prototype.translate = function(dx,dy) {
	this.x = this.x + dx;
	this.y = this.y + dy;
	this.dynSim.simCtx.translate(dx,dy);

	for(var i = 0; i < this.transformingObjects.length; i++) {
		PhSim.Motion.translate(this.transformingObjects[i],dx,dy);
	}
}

Camera.prototype.setPosition = function(x,y) {
	this.dynSim.simCtx.translate(-this.x,-this.y)
	this.x = x;
	this.y = y;
}

module.exports = Camera;