PhSim.DynSim.removeClickRectRegion = function(reference) {
	this.removeEventListener("mousedown",reference);
}

PhSim.PhEvent = function () {
	this.target = null;
	this.timestamp = null;
	this.type = null;
}

PhSim.PhDynEvent = function() {
	PhSim.PhEvent.call(this);
	this.layer = null;
	this.simulation = null;
	this.object = null;
}

PhSim.PhDynEvent.prototype = Object.create(PhSim.PhEvent.prototype);

PhSim.PhKeyEvent = function() {
	PhSim.PhDynEvent.call(this);
	this.key = null;
	this.domEvent = null;
}

PhSim.PhKeyEvent.prototype = Object.create(PhSim.PhDynEvent.prototype);

PhSim.PhMouseEvent = function() {
	PhSim.PhDynEvent.call(this);
	this.x = null;
	this.y = null;
	this.domEvent = null;
	this.dynArr = null;
}

PhSim.PhMouseEvent.prototype = Object.create(PhSim.PhDynEvent.prototype);

PhSim.phSimCollision = function() {
	this.bodyA = null;
	this.bodyB = null;
	this.matter = null;
}

PhSim.CollisionReport = function() {
	this.before = null;
	this.current = null;
	this.difference = null;
	this.objectA = null;
	this.objectB = null;
}