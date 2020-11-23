/**
 * A widget function is a function that used for the WidgetFunction widget.
 * The "this" keyword in the body of function refers to the current instance of
 * PhSim simulation.
 * 
 * @typedef {Function} WFunction
 */

/**
 * Array of widget functions
 * @type {WFunctions[]}
 */

PhSim.prototype.wFunctions = [];

/**
 * Create a widget function and push it to the wFunctions array.
 * @function
 * @param {String|Function} arg - content of function if string, function if function
 * @param {Object} thisRef - 
 * @returns {WFunction}
 */

 /**

PhSim.prototype.createWFunction = function(arg,thisRef) {

	if(typeof arg === "string") {
		var o = new Function(arg).bind(thisRef);
	}

	else if(typeof arg === "function") {
		var o = arg.bind(thisRef);
	}

	else {
		throw "Expecting \"function\" or \"string\" type";
	}

    return o;
}

**/

// Simple Event Reference

PhSim.SimpeEventRef = function(trigger,ref) {
	this.trigger = trigger;
	this.ref = ref;
}

// Simple Event Reference Array

PhSim.prototype.wFunctionRefs = [];

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
 * objlinkTriggerString|afterslchangeTriggerString|timeTriggerString} wFunctionTrigger
 *
 * 
 * The simple event trigger string is a string defining {@link wFunctionOptions.trigger}
 */

/** 
 * Properties for a simple event.
 * 
 *
 * @typedef {Object} wFunctionOptions
 * @property {@external https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key|KeyboardEvent.key} [key] - The event.key value for triggering a simple event.
 * @property {Number} [time] - The time interval between a repeated event or a delay time for timeouts.
 * @property {Number} [maxN] - The maximum number of times a repeated SimpleEvent can be executed.
 * @property {PhSim.DynObject} [wFunctionObj] - An object being affected 
 * 
 * The simple event options is an Object that is used for the {@link PhSim#createWFunction} function.
 */

 /**
  * @callback SimpleEventCall
  * @this {PhSim.DynObject}
  * @param {Event} e - event object
  */

/**
 *
 * Create a SimpleEvent
 * @function
 * 
 * @param {wFunctionTrigger} trigger - The type of SimpleEvent.
 * @param {SimpleEventCall} call - The JavaScript function to be wrapped.
 * @param {wFunctionOptions} options -  [The Simple Event Options Object]{@link wFunctionOptions}.
 * @returns {Number} - A reference to the simple event.
 * @this {PhSim}
 * 
 */


PhSim.prototype.createWFunction = function(trigger,call,options) {

	if(trigger.match(/_global$/)) {
		options.wFunctionObj = null;
	}

	var self = this;
	
	if(trigger === "key") {

		if(options.wFunctionObj) {
		
			var f = (function(e) {
				if(options.key === e.key) {
					call(e);
				}
			}).bind(options.wFunctionObj);

		}

		else {

			var f = function(e) {
				call(e);
			}

		}

		self.on("keydown",f,{
			"slEvent": true
		});

		return this.wFunctionRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;
		
	}

	if(trigger === "sensor" || trigger === "sensor_global") {

		var self = this;

		if(options.wFunctionObj) {
			
			var f = (function(e) {

				var m = self.inSensorCollision(options.wFunctionObj)
	
				if(m) {
					call(e);
				}
	
			}).bind(options.wFunctionObj)
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.on("collisionstart",f,{
			"slEvent": true
		});

		return this.wFunctionRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;

	}

	if(trigger === "update") {
		
		var f = function() {
			call();
		}

		self.on("beforeupdate",f,{
			slEvent: true
		});

		return this.wFunctionRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;
		
	}

	if(trigger === "objclick" || trigger === "objclick_global") {

		if(options.wFunctionObj) {
			var f = (function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === options.wFunctionObj) {
					call(e);
				}
			}).bind(options.wFunctionObj);
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.on("objclick",f,{
			slEvent: true
		});

		return this.wFunctionRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;
	}

	if(trigger === "objmousedown" || trigger === "objmousedown_global") {

		if(options.wFunctionObj) {
			var f = (function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === options.wFunctionObj) {
					call(e);
				}
			}).bind(options.wFunctionObj);
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.on("objmousedown",f,{
			slEvent: true
		});

		return this.wFunctionRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;
	}

	if(trigger === "firstslupdate") {
		
		var f = function(e) {
			call(e)
		}

		this.on("firstslupdate",f);

	}
	
	if(trigger === "objmouseup" || trigger === "objmouseup_global") {

		if(options.wFunctionObj) {
			var f = (function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === options.wFunctionObj) {
					call(e);
				}
			}).bind(options.wFunctionObj);
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.on("objmouseup",f,{
			slEvent: true
		});

		return this.wFunctionRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;
	}

	if(trigger === "objlink") {
		options.wFunctionObj.objLinkFunctions = options.wFunctionObj.objLinkFunctions || [];
		options.wFunctionObj.objLinkFunctions.push(call);
	}

	if(trigger === "afterslchange") {

		
		if(options.wFunctionObj) {
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

		return this.wFunctionRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;

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

PhSim.prototype.disableWFunction = function(refNumber) {
	
	var o = this.wFunctionRefs[refNumber];

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

PhSim.Widgets.wFunction = function(dyn_object,widget) {

    var self = this;

    if(typeof arg === "string") {
		var wf = new Function(arg).bind(thisRef);
	}

	else if(typeof arg === "function") {
		var wf = arg.bind(thisRef);
	}

    var closure = function() {

        var f = function(){
            wf();
        };

        return f;

    }

    var f = this.createWFunction(widget.trigger,closure(),{
        ...widget,
        wFunctionObj: dyn_object
    });

}