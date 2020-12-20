/**
 * Namespace for event objects
 * @namespace
 */

const Events = {}

/**
 * @constructor
 * 
 */

Events.PhEvent = function(type) {
	this.target = null;
	this.timestamp = null;
	this.type = type;
}

/**
 * @constructor
 */

Events.PhDynEvent = function() {
	Events.PhEvent.call(this);
	this.layer = null;
	this.simulation = null;
	this.object = null;
}

Events.PhDynEvent.prototype = Object.create(Events.PhEvent.prototype);

/**
 * @constructor
 */


Events.PhKeyEvent = function() {
	Events.PhDynEvent.call(this);
	this.key = null;
	this.domEvent = null;
}

Events.PhKeyEvent.prototype = Object.create(Events.PhDynEvent.prototype);

/**
 * @constructor
 */


Events.PhMouseEvent = function() {
	Events.PhDynEvent.call(this);
	this.x = null;
	this.y = null;
	this.domEvent = null;
	this.dynArr = null;
}

Events.PhMouseEvent.prototype = Object.create(Events.PhDynEvent.prototype);

/**
 * @constructor
 */


Events.PhSimCollision = function() {
	this.bodyA = null;
	this.bodyB = null;
	this.matter = null;
}

module.exports = Events;