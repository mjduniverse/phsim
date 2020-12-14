/**
 * A widget function is a function that used for the `WidgetFunction` widget.
 * The "this" keyword in the body of function usually refers to the current instance of
 * PhSim simulation or references an instance of {@link PhSim.DynObject}.
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

/**
 * 
 * @param {wFunctionTrigger} trigger 
 * @param {*} ref - Reference
 * @param {Function} call - The function wrapper that is executed 
 */

PhSim.WFunctionRef = function(options,ref,call) {

	/**
	 * Options used to create simple event
	 * @type {wFunctionOptions}
	 */

	this.options = options;

	/**
	 * Reference to wrapped function
	 * @type {Function|Number}
	 */

	this.ref = ref;
	
	/**
	 * Reference to wFunction body function
	 * @type {WFunctionBody}
	 */

    this.call = call;
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
 * @property {PhSim.DynObject} [wFunctionObj] - An object being affected by the wFunction.
 * @property {String} [name] - The name of the wFunction
 * 
 * The simple event options is an Object that is used for the {@link PhSim#createWFunction} function.
 */

 /**
  * @callback WFunctionBody
  * @this {PhSim.DynObject}
  * @param {Event} e - event object
  */

/**
 *
 * The WFunction is a fundemental part of many PhSim widgets. 
 * It is a function wrapped by another function that
 * 
 * @function
 * 
 * @param {wFunctionTrigger} trigger - The type of SimpleEvent.
 * 
 * @param {WFunctionBody|Number} wFunctionBody - The JavaScript function to be wrapped. 
 * If `wFunctionBody` is an integer `i`, the function body is deterimined by the 
 * `{@link PhSim#options.wFunctions}[i]`
 * 
 * @param {wFunctionOptions} options -  [The Simple Event Options Object]{@link wFunctionOptions}.
 * @returns {PhSim.WFunctionRef} - A reference to the simple event.
 * @this {PhSim}
 * 
 */
 
PhSim.prototype.createWFunction = function(thisRef,wFunctionBody,options) {

	var self = this;

	if(typeof wFunctionBody === "number") {
		wFunctionBody = this.options.wFunctions[wFunctionBody];
	}

	if(typeof wFunctionBody === "string") {
		wFunctionBody = new Function("e",options.function)
	}

    var call = function(e) {
        return wFunctionBody.apply(thisRef,e);
	}
	
	if(options.name) {
		self.wFunctions[options.name] = call;
	}
	
	if(options.trigger === "key") {

		if(options.key) {
		
			var f = function(e) {
				if( e.key.match( new RegExp("^" + options.key + "$","i") ) ) {
					call(e);
				}
			};

		}

		else {

			var f = function(e) {
				call(e);
			}

		}

		self.on("keydown",f,{
			"slEvent": true
		});
		

		return new PhSim.WFunctionRef(options,f,call);
		
	}

	else if(options.trigger === "sensor" || options.trigger === "sensor_global") {

		var self = this;
		var f;

		if(options.trigger === "sensor") {
			
			f = function(e) {

				var m = self.inSensorCollision(thisRef)
	
				if(m) {
					call(e);
				}
	
			}
		}

		else {
			f = function(e) {
				call(e);
			}
		}

		self.on("collisionstart",f,{
			"slEvent": true
		});

		return new PhSim.WFunctionRef(options,f,call);

	}

	else if(options.trigger === "update") {
		
		var f = function() {
			call();
		}

		self.on("beforeupdate",f,{
			slEvent: true
		});

		return new PhSim.WFunctionRef(options,f,call);
		
	}

	else if(options.trigger === "objclick" || options.trigger === "objclick_global") {

		var f;

		if(options.trigger === "objclick") {
			f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === thisRef) {
					call(e);
				}
			};
		}

		else {
			f = function(e) {
				call(e);
			}
		}

		self.on("objclick",f,{
			slEvent: true
		});

		return new PhSim.WFunctionRef(options,f,call);
	}

	else if(options.trigger === "objmousedown" || options.trigger === "objmousedown_global") {

		if(options.trigger === "objmousedown") {
			var f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === thisRef) {
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

		return new PhSim.WFunctionRef(options,f,call);
	}

	else if(options.trigger === "firstslupdate") {
		
		var f = function(e) {
			call(e)
		}

		this.on("firstslupdate",f);

	}
	
	else if(options.trigger === "objmouseup" || options.trigger === "objmouseup_global") {

		if(options.trigger === "objmouseup") {
			var f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === thisRef) {
					call(e);
				}
			};
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.on("objmouseup",f,{
			slEvent: true
		});

		return new PhSim.WFunctionRef(options,f,call);
	}

	else if(options.trigger === "objlink") {
		thisRef.objLinkFunctions = thisRef.objLinkFunctions || [];
		thisRef.objLinkFunctions.push(call);
	}

	else if(options.trigger === "afterslchange") {

		var f = function(e) {
			call(e);
		}
		
		self.on("afterslchange",f,{
			slEvent: true
		});

		return new PhSim.WFunctionRef(options,f,call);

	}

	else if(options.trigger === "time") {

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

		return new PhSim.WFunctionRef(options,refFunc.__interN,call);
	}

	else {
		return new PhSim.WFunctionRef(options,call,call);
	}

}



/** 
 * 
 * Disable wFunction
 * 
 * @function
 * @param {PhSim.WFunctionRef} o - Reference created by {@link PhSim#createWFunction}.
 * 
*/

PhSim.prototype.disableWFunction = function(o) {
	
	if(o.options.trigger === "key") {
		this.off("keydown",o.ref);
	}

	else if(o.options.trigger === "sensor") {
		this.off("collisionstart",o.ref);
	}

	else if(o.options.trigger === "update") {
		this.off("beforeupdate",o.ref);
	}

	else if(o.options.trigger === "time") {
		clearInterval()
	}

	if(o.name) {
		delete this.wFunctions[o.name];
	}

}

PhSim.Widgets.wFunction = function(dyn_object,widget) {

	var self = this;
	var wf;

    if(typeof widget.function === "string") {
		var wf = new Function(widget.function);
    }
    
    else {
        var wf = widget.function;
    }

    var f = this.createWFunction(dyn_object,wf,widget);

}

PhSim.prototype.wFunctions = {}