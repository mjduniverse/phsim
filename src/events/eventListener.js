const PhSim = require("../index");

/**
 * @mixin
 * @memberof PhSim
 */

const PhSimEventTarget = {}

/**
 * 
 * Used to add events to a PhSim simulation
 * 
 * @function
 * @param {string} eventStr - String representing the event.
 * @param {PhSimEventCall} call - Function to run when event is executed.
 * @param {object} [options = {}] - Event Listener Options.
 * @param {boolean} [options.once] - If true, the function is executed only once.
 * @param {boolean} [options.slEvent] - If true, the event will be removed when the simulation changes
 * 
 */

PhSimEventTarget.on = function(eventStr,call,options = {}) {
	
	if(options && options.slEvent === true) {
		if(this.simulationEventStack[eventStr]) {
			this.simulationEventStack[eventStr].push(call);
		}
	}

	else {
		if(this.eventStack[eventStr]) {
			this.eventStack[eventStr].push(call);
		}
	}


	if(options) {
		if(options === true) {
			if(options.once) {
	
				var f = function() {
					this.off(eventStr,call)
					this.off(eventStr,f)
				}
	
				this.on(eventStr,f);

			}
		}

	}


	else {
		throw new Error("Event Target Not Available")
	}

}

/**
 * @function 
 * @param {String} eventStr 
 * @param {PhSimEventCall} call 
 */


PhSimEventTarget.off = function(eventStr,call) {

	var callIndex;
	
	if(this.eventStack[eventStr] && this.eventStack[eventStr].includes(call)) {
		callIndex = this.eventStack[eventStr].indexOf(call);
		this.eventStack[eventStr].splice(callIndex,1);
	}

	if(this.simulationEventStack[eventStr] && this.simulationEventStack[eventStr].includes(call)) {
		callIndex = this.simulationEventStack[eventStr].indexOf(call);
		this.simulationEventStack[eventStr].splice(callIndex,1);
	}

}

/**
 * @function
 * @param {PhSim.Events.PhSimEvent} event - Event Object
 */

PhSimEventTarget.callEventClass = function(eventStr,thisArg,eventArg) {

	var func;

	if(this.eventStack[eventStr]) {
		for(var i = 0; i < this.eventStack[eventStr].length; i++) {
			func = this.eventStack[eventStr][i]
			eventArg.func = func;
			func.call(thisArg,eventArg);

		}
	}

	if(this instanceof PhSim) {

		if(this.simulationEventStack[eventStr]) {
			for(var j = 0; j < this.simulationEventStack[eventStr].length; j++) {
	
				func = this.simulationEventStack[eventStr][i]
				eventArg.func = func;
				func.call(thisArg,eventArg);
	
			}
		}

	}
	
}

module.exports = PhSimEventTarget;