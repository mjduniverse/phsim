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

const PhSim = require("../phSim");

PhSim.prototype.on = function(eventStr,call,options = {}) {
	
	

	if(options && options.slEvent === true) {
		if(this.slEventStack[eventStr]) {
			this.slEventStack[eventStr].push(call);
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
	
				var f = function(e) {
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


PhSim.prototype.off = function(eventStr,call) {
	
	if(this.eventStack[eventStr] && this.eventStack[eventStr].includes(call)) {
		var callIndex = this.eventStack[eventStr].indexOf(call);
		this.eventStack[eventStr].splice(callIndex,1);
	}

	if(this.slEventStack[eventStr] && this.slEventStack[eventStr].includes(call)) {
		var callIndex = this.slEventStack[eventStr].indexOf(call);
		this.slEventStack[eventStr].splice(callIndex,1);
	}

}

/**
 * @function
 * @param {PhSim.PhEvent} event - Event Object
 */

PhSim.prototype.callEventClass = function(eventStr,thisArg,eventArg) {

	if(this.eventStack[eventStr]) {
		for(var i = 0; i < this.eventStack[eventStr].length; i++) {
			var func = this.eventStack[eventStr][i]
			eventArg.func = func;
			func.call(thisArg,eventArg);

		}
	}

	if(this.slEventStack[eventStr]) {
		for(var i = 0; i < this.slEventStack[eventStr].length; i++) {

			var func = this.slEventStack[eventStr][i]
			eventArg.func = func;
			func.call(thisArg,eventArg);

		}
	}
}