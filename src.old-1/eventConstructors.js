var EventConstructors = {}

EventConstructors.PhEvent = function () {
	this.target = null;
	this.timestamp = null;
	this.type = null;
}

EventConstructors.PhDynEvent = function() {
	EventConstructors.PhEvent.call(this);
	this.layer = null;
	this.simulation = null;
	this.object = null;
}

EventConstructors.PhDynEvent.prototype = Object.create(EventConstructors.PhEvent.prototype);

EventConstructors.PhKeyEvent = function() {
	EventConstructors.PhDynEvent.call(this);
	this.key = null;
	this.domEvent = null;
}

EventConstructors.PhKeyEvent.prototype = Object.create(EventConstructors.PhDynEvent.prototype);

EventConstructors.PhMouseEvent = function() {
	EventConstructors.PhDynEvent.call(this);
	this.x = null;
	this.y = null;
	this.domEvent = null;
	this.dynArr = null;
}

EventConstructors.PhMouseEvent.prototype = Object.create(EventConstructors.PhDynEvent.prototype);

export default EventConstructors;