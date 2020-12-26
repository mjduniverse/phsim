const PhSim = require("../phSim");

/**
 * @file File for dealing with wFunctions.
 * @module widgets/wFunction.js
 * @author Mjduniverse
 * 
 */

/**
 * A widget function is a function that used for the `WidgetFunction` widget.
 * The "this" keyword in the body of function usually refers to the current instance of
 * PhSim simulation or references an instance of {@link PhSim.DynObject}.
 * 
 * To learn more, see the {@tutorial Widget Functions}
 * 
 * @module wFunction
 * @typedef {Function} WFunction
 * @property {Function} _options - Options used to create WFunction
 * @property {Function|Number} _ref
 * @property {String} [_name] - WFunction name
 * @property {Function} _bodyFunction - Body Function
 * @property {String} _eventclass - Event class
 * 
 */

/**
 * Array of widget functions
 * @memberof PhSim
 * @type {WFunctions[]}
 */

PhSim.prototype.wFunctions = [];

/**
 * Create a widget function and push it to the wFunctions array.
 * @function
 * @memberof PhSim
 * @param {String|Function} arg - content of function if string, function if function
 * @param {Object} thisRef - 
 * @returns {WFunction}
 */

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

/**
 *  @typedef {"afterslchange"} afterslchangeTriggerString
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
 * The simple event trigger string is a string defining {@link WFunctionOptions.trigger}
 */

/** 
 * Properties for a simple event.
 * The simple event options is an Object that is used for the {@link PhSim#createWFunction} function.
 * They are also used to configure various types of widgets. Especially widgets that utilize
 * wFunctions.
 * 
 * @typedef {Object} WFunctionOptions
 * @property {KeyBoard} [key] - The event.key value for triggering a simple event.
 * @property {Number} [time] - The time interval between a repeated event or a delay time for timeouts.
 * @property {Number} [maxN] - The maximum number of times a repeated SimpleEvent can be executed.
 * @property {PhSim.DynObject} [wFunctionObj] - An object being affected by the wFunction.
 * @property {String} [name] - The name of the wFunction
 * 
 */

 /**
  * @callback WFunctionBody
  * @this {PhSim.DynObject}
  * @param {Event} e - event object
  */

/**
 * Function used to generate {@link WFunction|WFunctions.}
 * To learn more, see the {@tutorial Widget Functions} tutorial.
 * 
 * @function
 * @memberof PhSim
 * 
 * @param {wFunctionTrigger} trigger - The type of SimpleEvent.
 * 
 * @param {WFunctionBody|Number} wFunctionBody - The JavaScript function to be wrapped. 
 * If `wFunctionBody` is an integer `i`, the function body is deterimined by the 
 * `{@link PhSim#options.wFunctions}[i]`
 * 
 * @param {WFunctionOptions} options -  [The Simple Event Options Object]{@link WFunctionOptions}.
 * @returns {WFunction} - The wFunction.
 * @this {PhSim}
 * 
 */
 
PhSim.prototype.createWFunction = function(thisRef,wFunctionBody,options) {

	var self = this;

	if(typeof wFunctionBody === "number") {
		wFunctionBody = this.wFunctions[wFunctionBody];
	}

	if(typeof wFunctionBody === "string") {
		wFunctionBody = new Function("e",options.function)
	}

	/**
	 * 
	 * New WFunction
	 * 
	 * @inner
	 * @type {WFunction}
	 */

    var call = function(e) {
        return wFunctionBody.apply(thisRef,e);
	}

	call._options = options;
	call._bodyFunction = wFunctionBody;
	call._thisRef = thisRef;
	
	if(options._name) {
		self.wFunctionNames[options._name] = call;
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

		call._ref = f;
		call._eventclass = "keydown";
		
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

		call._ref = f;
		call._eventclass = "collisionstart";

	}

	else if(options.trigger === "update") {
		
		var f = function() {
			call();
		}

		call._ref = f;
		call._eventclass = "beforeupdate";

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

		call._eventclass = "objclick";
		call._ref = f;

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

		call._eventclass = "objmousedown";
		call._ref = f;

	}

	else if(options.trigger === "firstslupdate") {
		
		var f = function(e) {
			call(e)
		}

		call._ref = f;
		call._eventclass = "firstslupdate";


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

		call._eventclass = "objmouseup";
		call._ref = f;

	}

	else if(options.trigger === "objlink") {

		thisRef.objLinkFunctions = thisRef.objLinkFunctions || [];
		thisRef.objLinkFunctions.push(call);

		call._ref = f;

		return call;

	}

	else if(options.trigger === "afterslchange") {

		var f = function(e) {
			call(e);
		}

		call._eventclass = "afterslchange";
		call._ref = f;

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


		call._ref = refFunc.__interN;

		return call;
	}

	else {
		call._ref = call;	
		call._eventclass = options.trigger;
	}

	if(typeof call._eventclass === "string") {
		
		self.on(call._eventclass,call._ref,{
			"slEvent": true
		});
	}

	// Return wFunction

	return call

}



/** 
 * 
 * Disable wFunction
 * 
 * @memberof PhSim
 * @function
 * @param {WFunction} o - Reference created by {@link PhSim#createWFunction}.
 * 
*/

PhSim.prototype.disableWFunction = function(o) {

	if(typeof o._eventclass === "string") {
		this.off(o._eventclass,o._ref);
	}

	else if(o._options.trigger === "time") {
		clearInterval(o._ref)
	}

	else if(o._options.trigger === "time") {
		clearInterval(o._ref)
	}

	else if(o._options.trigger === "objlink") {
		var i = o._thisRef.objLinkFunctions.indexOf(o)
		o._thisRef.objLinkFunctions.splice(i,1);
	}

	if(o._name) {
		delete this.wFunctionNames[o._name];
	}

}

/**
 * 
 * The `wFunction` widget is used to create wFunctions.
 * 
 * @memberof PhSim
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget 
 */

PhSim.Widgets.wFunction = function(dyn_object,widget) {
	this.createWFunction(dyn_object,widget.function,widget);
}

PhSim.prototype.wFunctionNames = {}