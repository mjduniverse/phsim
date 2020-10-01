var DynEventObjects = {};

DynEventObjects.PhEvent = function () {
	this.target = null;
	this.timestamp = null;
	this.type = null;
}

DynEventObjects.PhDynEvent = function() {
	PhSim.PhEvent.call(this);
	this.layer = null;
	this.simulation = null;
	this.object = null;
}

DynEventObjects.PhDynEvent.prototype = Object.create(DynEventObjects.PhEvent.prototype);

DynEventObjects.PhKeyEvent = function() {
	PhSim.PhDynEvent.call(this);
	this.key = null;
	this.domEvent = null;
}

DynEventObjects.PhKeyEvent.prototype = Object.create(DynEventObjects.PhDynEvent.prototype);

DynEventObjects.PhMouseEvent = function() {
	PhSim.PhDynEvent.call(this);
	this.x = null;
	this.y = null;
	this.domEvent = null;
	this.dynArr = null;
}

DynEventObjects.PhMouseEvent.prototype = Object.create(DynEventObjects.PhDynEvent.prototype);


DynEventObjects.CollisionReport = function() {
	this.before = null;
	this.current = null;
	this.difference = null;
	this.objectA = null;
	this.objectB = null;
}

DynEventObjects.phSimCollision = function() {
	this.bodyA = null;
	this.bodyB = null;
	this.matter = null;
}

export default DynEventObjects;
