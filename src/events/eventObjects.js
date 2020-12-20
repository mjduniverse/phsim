/**
 * Namespace for event objects
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
 */


Events.PhSimEventKey = function() {
	Events.PhSimDynEvent.call(this);
	this.key = null;
	this.domEvent = null;
}

Events.PhSimEventKey.prototype = Object.create(Events.PhSimDynEvent.prototype);

/**
 * @constructor
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
 * @event objmousedown
 * @property {Event} domEvent - Standard JavaScript `mousedown` event.
 * @property {Number} x - Position of mouse
 * @property {Number} y - Position of mouse
 * @property {String} type - Event type
 * @property {PhSim.DynEvent[]}
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