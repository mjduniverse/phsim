/**
 * @constructor
 * @param {*} dynSim 
 */

PhSim.Camera = function(dynSim) {

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

PhSim.Camera.prototype.scale = 1;

/**
 * Camera offset x 
 * @type {Number}
 */

PhSim.Camera.prototype.x = 0;

/**
 * Camera offset y
 * @type {Number}
 */

PhSim.Camera.prototype.y = 0;

/**
 * Target object
 * @type {StaticObject}
 */

PhSim.Camera.prototype.targetObj = null;

/**
 * Objects that will transform with the camera
 * @type {StaticObject[]}
 */

PhSim.Camera.prototype.transformingObjects = []

PhSim.Camera.prototype.zoomIn = function(scaleFactor) {
	this.scale = this.scale * scaleFactor;
	this.dynSim.simCtx.scale(scaleFactor,scaleFactor);
}

PhSim.Camera.prototype.translate = function(dx,dy) {
	this.x = this.x + dx;
	this.y = this.y + dy;
	this.dynSim.simCtx.translate(dx,dy);

	for(var i = 0; i < this.transformingObjects.length; i++) {
		PhSim.Motion.translate(this.transformingObjects[i],dx,dy);
	}
}

PhSim.Camera.prototype.setPosition = function(x,y) {
	this.dynSim.simCtx.translate(-this.x,-this.y)
	this.x = x;
	this.y = y;
}


PhSim.prototype.loading = {
	"bgClr": "black",
	"txtClr": "White",
	"txtFace": "arial",
	"txtAlign": "center",
	"txt": "Loading...",
	"yPos": "center",
	"txtSize": 20
}

PhSim.prototype.drawLoadingScreen = function() {
	this.simCtx.fillStyle = this.loading.bgClr;
	this.simCtx.fillRect(0,0,this.camera.scale,this.simCanvas.height);
	this.simCtx.fillStyle = this.loading.txtClr;
	this.simCtx.textAlign = this.loading.txtAlign;
	this.simCtx.font = this.loading.txtSize + "px " + this.loading.txtFace;
	this.simCtx.fillText(this.loading.txt,this.simCanvas.width / 2,this.simCanvas.height / 2)
}