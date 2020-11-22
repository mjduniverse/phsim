// Simple Event Reference

PhSim.SimpeEventRef = function(trigger,ref) {
	this.trigger = trigger;
	this.ref = ref;
}

// Simple Event Reference Array

PhSim.prototype.simpleEventRefs = [];

/** 
 * 
 * @typedef {"key"} keyTriggerString
 * 
 * The "key" trigger means that the simple event will execute if a key is pressed.
 */

/** 
* 
* @typedef {"sensor"|"sensor_global"} sensorTriggerString
* 
* The "sensor" trigger means that the simple event will execute if the trigger object 
* collides with an object that shares at least one of the sensor classes. However, 
* the "sensor_global" trigger means that the function will execute if any two 
* objects that share at least one sensor class collides.
*/

/** 
 * 
 * @typedef {"objclick"|"objclick_global"} objclickTriggerString
 * 
 * The "objclick" trigger means that the simple event will execute if the mouse clicks on the trigger object. 
 * However, the "objclick_global" trigger means that the simple event will execute if the mouse clicks on any
 * object in general.
 */

/**  
 * @typedef {"objMouseDown"|"objmousedown_global"} objMouseDownTriggerString
 * 
 * The "objmousedown" trigger means that the simple event call is executed if the mouse
 * is being pushed down on the object. The "objmousedown_global" trigger means that
 * the simple event will execute if the mouse clicks on any object in general.
 */

/** 
 * @typedef {"firstslupdate"} firstslupdateTriggerString
 * 
 * The "firstslupdate" trigger means that the simple event will execute during the first
 * update of the simulation.
 */

/** 
 * @typedef {"objmouseup"|"objmouseup_global"} objmouseupTriggerString
 * 
 * The "objmouseup" trigger means that the simple event will execute when the
 * mouse is let go of while the mouse is over an object. The "objmouseup_global" trigger
 * means that the simple event will execute if the mouse is let go of while it is 
 * over an object.
 */ 

 /** 
 * @typedef {"objlink"} objlinkTriggerString
 * 
 * The "objlink" trigger means that the simple event will execute if the trigger object
 * is linked to another object by the objlink widget.
 */

/** @typedef {"afterslchange"} afterslchangeTriggerString
 * 
 * The "afterslchange" trigger means that the simple event will execute after the 
 * superlayer changes.
 * 
 */

/** 
 * @typedef {"time"} timeTriggerString
 * 
 * The "time" trigger means that the simple event will execute by some interval of time.
 */ 

/** 
 * @typedef {keyTriggerString|sensorTriggerString|objclickTriggerString|
 * objMouseDownTriggerString|firstslupdateTriggerString|objmouseupTriggerString|
 * objlinkTriggerString|afterslchangeTriggerString|timeTriggerString} simpleEventTriggerString
 *
 * 
 * The simple event trigger string is a string defining {@link simpleEventOptions.trigger}
 */

/** 
 * Properties for a simple event.
 * 
 *
 * @typedef {Object} simpleEventOptions
 * @property {@external https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key|KeyboardEvent.key} [key] - The event.key value for triggering a simple event.
 * @property {Number} [time] - The time interval between a repeated event or a delay time for timeouts.
 * @property {Number} [maxN] - The maximum number of times a repeated SimpleEvent can be executed.
 * @property {PhSim.DynObject} [simpleEventObj] - An object being affected 
 * 
 * The simple event options is an Object that is used for the {@link PhSim#addSimpleEvent} function.
 */

 /**
  * @callback SimpleEventCall
  * @param {Event} e - event object
  */

/**
 *
 * Create a SimpleEvent
 * @function
 * 
 * @param {simpleEventTriggerString} trigger - The type of SimpleEvent.
 * @param {SimpleEventCall} call - The JavaScript function to be executed.
 * @param {simpleEventOptions} options -  [The Simple Event Options Object]{@link simpleEventOptions}.
 * @returns {Number} - A reference to the simple event.
 * @this {PhSim}
 * 
 */


PhSim.prototype.addSimpleEvent = function(trigger,call,options) {

	if(trigger.match(/_global$/)) {
		options.simpleEventObj = null;
	}

	var self = this;
	
	if(trigger === "key") {

		if(options.simpleEventObj) {
		
			var f = function(e) {
				if(options.key === e.key) {
					call(e);
				}
			}

		}

		else {

			var f = function(e) {
				call(e);
			}

		}

		self.on("keydown",f,{
			"slEvent": true
		});

		return this.simpleEventRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;
		
	}

	if(trigger === "sensor" || trigger === "sensor_global") {

		var self = this;

		if(options.simpleEventObj) {
			
			var f = function(e) {

				var m = self.inSensorCollision(options.simpleEventObj)
	
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

		self.on("collisionstart",f,{
			"slEvent": true
		});

		return this.simpleEventRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;

	}

	if(trigger === "update") {
		
		var f = function() {
			call();
		}

		self.on("beforeupdate",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;
		
	}

	if(trigger === "objclick" || trigger === "objclick_global") {

		if(options.simpleEventObj) {
			var f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === options.simpleEventObj) {
					call(e);
				}
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.on("objclick",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;
	}

	if(trigger === "objmousedown" || trigger === "objmousedown_global") {

		if(options.simpleEventObj) {
			var f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === options.simpleEventObj) {
					call(e);
				}
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.on("objmousedown",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;
	}

	if(trigger === "firstslupdate") {
		
		var f = function(e) {
			call(e)
		}

		this.on("firstslupdate",f);

	}
	
	if(trigger === "objmouseup" || trigger === "objmouseup_global") {

		if(options.simpleEventObj) {
			var f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === options.simpleEventObj) {
					call(e);
				}
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.on("objmouseup",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;
	}

	if(trigger === "objlink") {
		options.simpleEventObj.objLinkFunctions = options.simpleEventObj.objLinkFunctions || [];
		options.simpleEventObj.objLinkFunctions.push(call);
	}

	if(trigger === "afterslchange") {

		
		if(options.simpleEventObj) {
			var f = function(e) {
				call(e);
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.on("afterslchange",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;

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

PhSim.prototype.removeSimpleEvent = function(refNumber) {
	
	var o = this.simpleEventRefs[refNumber];

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