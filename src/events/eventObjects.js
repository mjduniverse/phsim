/**
 * Namespace for event objects
 * @memberof PhSim
 * @namespace
 */

const Events = {}

/**
 * @constructor
 * @
 * 
 */

Events.PhSimEvent = function(type) {
	this.target = null; 
	this.timestamp = null;
	this.type = type;
}

/**
 * @constructor
 */

Events.PhSimDynEvent = function() {
	Events.PhSimEvent.call(this);
	this.layer = null;
	this.simulation = null;
	this.object = null;
}

Events.PhSimDynEvent.prototype = Object.create(Events.PhSimEvent.prototype);

/**
 * @constructor
 * @extends PhSim.Events.PhSimEvent
 */


Events.PhSimEventKey = function() {
	Events.PhSimDynEvent.call(this);
	this.key = null;
	this.domEvent = null;
}

Events.PhSimEventKey.prototype = Object.create(Events.PhSimDynEvent.prototype);

/**
 * Event object for mouse events.
 * 
 * @constructor
 * @extends PhSim.Events.PhSimDynEvent
 */


Events.PhSimMouseEvent = function() {
	Events.PhSimDynEvent.call(this);
	this.x = null;
	this.y = null;
	this.domEvent = null;
	this.dynArr = null;
}

Events.PhSimMouseEvent.prototype = Object.create(Events.PhSimDynEvent.prototype);

/**
 * 
 * Event fired whenever the mouse is pressed down on an object.
 * 
 * @event PhSim.Events#objmousedown
 * @type {PhSim.Events.PhSimMouseEvent}
 */

/**
 * Event fired whenever the mouse is let go of while over an object
 * 
 * @event PhSim.Events#objmouseup
 * @type {PhSim.Events.PhSimMouseEvent}
 */

/**
 * @constructor
 */


Events.PhSimCollision = function() {
	this.bodyA = null;
	this.bodyB = null;
	this.matter = null;
}

module.exports = Events;