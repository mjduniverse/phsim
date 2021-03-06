const Vector = require("./tools/vector.js")
const Motion = require("./motion");

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
	this.dynSim.ctx.scale(scaleFactor,scaleFactor);
}

/**
 * Translate camera by the vector `(dx,dy)`.
 * 
 * @param {Number} dx - Amount to transform camera in `x` direction.
 * @param {Number} dy - Amount to transform camera in `y` direction.
 * 
 */

Camera.prototype.translate = function(dx,dy) {

	dx = dx || 0
	dy = dy || 0

	this.x = this.x + dx;
	this.y = this.y + dy;
	this.dynSim.ctx.translate(dx,dy);

	for(var i = 0; i < this.transformingObjects.length; i++) {
		Motion.translate(this.transformingObjects[i],new Vector(-dx,-dy));
	}
}

Camera.prototype.setPosition = function(x,y) {
	this.dynSim.ctx.translate(-this.x,-this.y)
	this.x = x;
	this.y = y;
}

module.exports = Camera;