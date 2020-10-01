// Simulation Camera

var DynSimCamera = function(dynSim) {

	/**
	 * Dynamic Simulation
	 * @type {PhSim.DynSim}
	 */

	this.dynSim = dynSim;

}

DynSimCamera.prototype.scale = 1;
DynSimCamera.prototype.x = 0;
DynSimCamera.prototype.y = 0;
DynSimCamera.prototype.targetObj = null;
DynSimCamera.prototype.transformingObjects = []

DynSimCamera.prototype.zoomIn = function(scaleFactor) {
	this.scale = this.scale * scaleFactor;
	this.dynSim.simCtx.scale(scaleFactor,scaleFactor);
}

DynSimCamera.prototype.translate = function(dx,dy) {
	this.x = this.x + dx;
	this.y = this.y + dy;
	this.dynSim.simCtx.translate(dx,dy);

	for(var i = 0; i < this.transformingObjects.length; i++) {
		this.dynSim.translate(this.transformingObjects[i],dx,dy);
	}
}

DynSimCamera.prototype.setPosition = function(x,y) {
	this.dynSim.simCtx.translate(-this.x,-this.y)
	this.x = x;
	this.y = y;
}

export default DynSimCamera;