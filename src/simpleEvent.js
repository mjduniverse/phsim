// Simple Event Reference

PhSim.DynSim.SimpeEventRef = function(trigger,ref) {
	this.trigger = trigger;
	this.ref = ref;
}

// Simple Event Reference Array

PhSim.DynSim.prototype.simpleEventRefs = [];

/**
 * Create a SimpleEvent
 * @function
 * @param {string} trigger - The type of SimpleEvent.
 * @param {Function} call - The JavaScript function to be executed.
 * @param {Object} options - A JavaScript option for the various triggers.
 * @param {string} options.key -  The event.key value for triggering the simpleEvent.
 * @param {Number} options.time - The time interval between a repeated event or a delay time for timeouts.
 * Relevant when the trigger is set to "time".
 * @param {Number} options.maxN - The maximum number of times a repeated SimpleEvent can be executed.
 * @param {PhSim.DynObject} options.triggerObj - Trigger object
 * @returns {Number} - A reference to the simple event.
 * */


PhSim.DynSim.prototype.addSimpleEvent = function(trigger,call,options) {

	if(trigger.match(/_global$/)) {
		options.triggerObj = null;
	}

	var self = this;
	
	if(trigger === "key") {

		if(options.triggerObj) {
		
			var f = function(e) {
				if(options.key === e.key) {
					call();
				}
			}

		}

		else {

			var f = function(e) {
				call();
			}

		}

		self.addEventListener("keydown",f,{
			"slEvent": true
		});

		return this.simpleEventRefs.push(new PhSim.DynSim.SimpeEventRef(trigger,f)) - 1;
		
	}

	if(trigger === "sensor" || trigger === "sensor_global") {

		var self = this;

		if(options.triggerObj) {
			
			var f = function(e) {

				var m = self.inSensorCollision(options.triggerObj)
	
				if(m) {
					call(e);
				}
	
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.addEventListener("collisionstart",f,{
			"slEvent": true
		});

		return this.simpleEventRefs.push(new PhSim.DynSim.SimpeEventRef(trigger,f)) - 1;

	}

	if(trigger === "update") {
		
		var f = function() {
			call();
		}

		self.addEventListener("beforeupdate",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.DynSim.SimpeEventRef(trigger,f)) - 1;
		
	}

	if(trigger === "objclick" || trigger === "objclick_global") {

		if(options.triggerObj) {
			var f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === options.triggerObj) {
					call(e);
				}
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.addEventListener("objclick",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.DynSim.SimpeEventRef(trigger,f)) - 1;
	}

	if(trigger === "objmousedown" || trigger === "objmousedown_global") {

		if(options.triggerObj) {
			var f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === options.triggerObj) {
					call(e);
				}
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.addEventListener("objmousedown",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.DynSim.SimpeEventRef(trigger,f)) - 1;
	}

	this.callEventClass("firstslupdate",this,afterUpdateEvent);

	
	if(trigger === "objmouseup" || trigger === "objmouseup_global") {

		if(options.triggerObj) {
			var f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === options.triggerObj) {
					call(e);
				}
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.addEventListener("objmouseup",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.DynSim.SimpeEventRef(trigger,f)) - 1;
	}

	if(trigger === "objlink") {
		options.triggerObj.objLinkFunctions = options.triggerObj.objLinkFunctions || [];
		options.triggerObj.objLinkFunctions.push(call);
	}

	if(trigger === "afterslchange") {

		
		if(options.triggerObj) {
			var f = function(e) {
				call(e);
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.addEventListener("afterslchange",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.DynSim.SimpeEventRef(trigger,f)) - 1;

	}

	if(trigger === "time") {

		var getFunction = function() {

			if(Number.isInteger(options.maxN)) {

				func = function(e) {

					if(func.__n === options.maxN) {
						clearInterval(func.__interN);
					}

					else {
						if(!self.paused) {
							call();
							func.__n++;
						}
					}

				}

				func.__n = 0;

			}

			else {

				func = function(e) {
					if(!self.paused) {
						call();
					}
				}

			}


			func.__phtime = options.time;
			func.__interN = null;

			return func;

		}

		var refFunc = getFunction();

		refFunc.__interN = setInterval(refFunc,refFunc.__phtime);
	}

}

/** 
 * 
 * @param {Number} refNumber - Reference Number
 * 
*/

PhSim.DynSim.prototype.removeSimpleEvent = function(refNumber) {
	
	o = this.simpleEventRefs[refNumber];

	if(o.trigger === "key") {
		this.removeEventListener("keydown",o.ref);
	}

	if(o.trigger === "sensor") {
		this.removeEventListener("collisionstart",o.ref);
	}

	if(o.trigger === "update") {
		this.removeEventListener("beforeupdate",o.ref);
	}

}