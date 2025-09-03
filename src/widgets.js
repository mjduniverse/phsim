const PhSim = require(".");
const DynObject = require("./dynObject")
const Widget = require("./widget");
const Vector = require("./tools/vector");
const Motion = require("..motion");
const Game = require("./game");
const { statusCodes } = require("..");

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = require("matter-js");
}

/*

Constraint types

*/

PhSim.Constraints = {
    Static: {}
}

PhSim.Constraints.Static.Constraint = function() {
	this.objectA = null;
	this.objectB = null;
	this.pointA = null;
	this.pointB = null;
	this.type = "constraint";
}

PhSim.prototype.widgets = {};


/**
 * @typedef {WFunctionOptions|Object} WidgetOptions
 * @property {String} type - Name of widget. 
 */

/**
 * Widget Namespace.
 * @namespace
 * @memberof PhSim
 * @mixes PhSim.Game.Widgets
 */

PhSim.Widgets = {};
/**
 * Create circular constraint
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Number} [x] - x position of vector.
 * @param {Number} [y] - y position of vector.
 */

PhSim.prototype.createCircularConstraint = function(dynObject,x,y) {

	x = x || dynObject.matter.position.x;
	y = y || dynObject.matter.position.y;
	
	var c = Matter.Constraint.create({
		
		"bodyA": dynObject.matter,
		
		"pointB": {
			"x": x,
			"y": y
		}

	});

	Matter.World.add(this.matterJSWorld,c)

	var relAngle = Math.atan2(y - dynObject.matter.position.y,x - dynObject.matter.position.x);

	this.on("afterupdate",function(){
		var newAngle = Math.atan2(y - dynObject.matter.position.y,x - dynObject.matter.position.x) - relAngle;
		Motion.setAngle(dynObject,newAngle);
	});


	dynObject.circularConstraintVector = {
		"x": x,
		"y": y
	}

}

/**
 * 
 * The `circularConstraint` widget creates circular constraints.
 * 
 * A circular constraint is a special kind of constraint that is made up of an 
 * object `dyn_object` and a point `(x,y)` in space.
 * 
 * The object rotates around the centroid of `dyn_object` as it rotates around the
 * point `(x,y)`.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {Object} widget - Circular Constraint options
 * @param {Number} widget.x - x-coordinate of the other end of the constraint
 * @param {Number} widget.y - y-coordinate of the other end of the constraint 
 */

PhSim.Widgets.circularConstraint = function(dyn_object,widget) {
	this.createCircularConstraint(dyn_object,widget.x,widget.y);
}


/**
 * 
 * Clone object
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Object} options - The options used for creating a spawned object
 * @param {Vector} options.velocity -  The velocity to add to an object when it got spawned.
 * @param 
 */

PhSim.prototype.cloneObject = function(dynObject,options = {}) {

    var newObjStatic = Object.assign({},dynObject.static);

    Motion.setPosition(newObjStatic,dynObject.matter.position);
    
    var obj = new PhSim.DynObject(newObjStatic);
    
    /**
     * Property telling if object is cloned.
     * 
     * @type {Boolean|undefined}
     * @memberof PhSim.DynObject
     */

    obj.cloned = true;
    
    /**
     * 
     */


    obj.cloneParent = dynObject;
    
    PhSim.Motion.setVelocity(obj,options.velocity);

	this.addToOverlayer(obj);
	
	var eventObj = new PhSim.Events.PhSimEvent("clone");
	eventObj.target = dynObject;
	eventObj.clonedObj = obj;

	this.callEventClass("clone",this,eventObj);
}

/**
 * 
 * The `clone` widget is a widget that makes copies of an object and inserts them into
 * the simulation.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget - Options.
 * @this PhSim
 */

PhSim.Widgets.clone = function(dyn_object,widget) {
 
    var self = this;

    var w = new Widget(dyn_object,widget);

    var f = function() {
        self.cloneObject(dyn_object,{
            velocity: widget.vector
        });
    }

    w.wFunction = this.createWFunction(dyn_object,f,widget);

    return w;

}

/**
 * The `draggable` widget makes {@link PhSim.DynObject} objects draggable.
 * 
 * @param {PhSim.DynObject} dyn_object 
 * @this PhSim
 * @param {*} widget 
 */

PhSim.Widgets.draggable = function(dyn_object) {

    var self = this;
    
    var func = function() {

        // Displacement vector between mouse and centroid of object when the mouse is pushed downwards.

        var delta = {}

        // Mouse Position

        var mV = {
            x: null,
            y: null
        }

        var __onmousemove = function(e) {
            mV.x = e.x - delta.x;
            mV.y = e.y - delta.y;
        }

        var __onmouseup = function() {
            self.off("mousemove",__onmousemove);
            self.off("mouseup",__onmouseup);
            self.off("beforeupdate",__onbeforeupdate);
        }

        var __onbeforeupdate = function() {
            Matter.Body.setVelocity(dyn_object.matter,{x:0,y:0});
            Motion.setPosition(dyn_object,mV);
        }

        var __onmousedown = function(e) {
            if(self.pointInObject(dyn_object,e.x,e.y)) {

                delta.x = e.x - dyn_object.matter.position.x;
                delta.y = e.y - dyn_object.matter.position.y;

                self.on("mousemove",__onmousemove);
                self.on("mouseup",__onmouseup);
                self.on("beforeupdate",__onbeforeupdate);

                __onmousemove(e);
            }
        }
        
        self.on("mouseout",__onmouseup);

        return __onmousedown;

    }

    this.on("mousedown",func());
}


Object.assign(PhSim.Widgets,Game.Widgets);

/**
 * Set lock of the Dynamic Object
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Boolean} value - If  `true`, lock. Otherwise, unlock.
 */


PhSim.prototype.setLock = function(dynObject,value) {
    dynObject.locked = value;
	Matter.Body.setStatic(dynObject.matter,value);
}

/**
 * Toggle Lock Status of Dynamic Object.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.prototype.toggleLock = function(dynObject) {
    this.setLock(dynObject,!dynObject.locked);
}

/**
 * Toggle Semi-Lock Status of Dynamic Object.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.prototype.toggleSemiLock = function(dynObject) {
	dynObject.locked = !dynObject.locked;
	Matter.Body.setStatic(dynObject.matter,dynObject.locked);
}

/**
 * The `toggleLock` widget toggles the lock status of the Dynamic Object.
 * If locked, the object is unlocked.
 * If unlocked, the object is locked.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget - Configuration
 */

PhSim.Widgets.toggleLock = function(dyn_object,widget) {

    var self = this;

    var w = new Widget(dyn_object,widget);

    var f = function() {
        self.toggleLock(dyn_object);
    }

    w.wFunction = this.createWFunction(dyn_object,f,widget);

    return w;
}

/**
 * The `toggleSemiLock` widget toggles the semi-lock status of the Dynamic Object.
 * If semi-locked, the object is semi-unlocked.
 * If semi-unlocked, the object is semi-locked.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget - Configuration
 */

PhSim.Widgets.toggleSemiLock = function(dyn_object,widget) {

    var self = this;

    var w = new Widget(dyn_object,widget);

    var f = function() {
        self.toggleSemiLock(dyn_object);
    }

    w.wFunction = this.createWFunction(dyn_object,f,widget);

    return w;
    
}

/** 
 * 
 * Generate a function to put some dynamic object in motion, given some mode and vector or scalar.
 * 
 * @function
 * @param {"setAngle"|"force"|"velocity"|"translate"|"position"|"rotation"|"circular_constraint_rotation"} mode - The possible modes are "force","velocity","translate"
 * @param {PhSim.DynObject} dyn_object - The dynamic object to put in motion.
 * @param {Vector|Number} motion - The vector or scalar that defines the motion.
 * @returns {Function} - A function that makes an object undergo some motion.
 * 
 * 
*/

PhSim.prototype.createMotionFunction = function(mode,dyn_object,motion) {

	var f;

	if(mode === "force") {
		f = function() {
			if(f.motionFunctionEnabled === true) {
				return Motion.applyForce(dyn_object,dyn_object.matter.position,motion);
			}
		}
	}

	if(mode === "velocity") {
		f = function() {
			if(f.motionFunctionEnabled === true) {
				return Motion.setVelocity(dyn_object,motion);
			}
		}
	}

	if(mode === "translate") {
		f = function() {
			if(f.motionFunctionEnabled === true) {
				return Motion.translate(dyn_object,motion);
			}
		}
	}

	if(mode === "position") {
		f = function() {
			if(f.motionFunctionEnabled === true) {
				return Motion.setPosition(dyn_object,motion)
			}
		}
	}

	if(mode === "rotation") {
		f = function() {
			if(f.motionFunctionEnabled === true) {
				return Motion.rotate(dyn_object,motion,dyn_object.matter.position);
			}
		}
	}

	if(mode === "circular_constraint_rotation") {
		f = function() {
			if(f.motionFunctionEnabled === true) {
				return Motion.rotate(dyn_object,motion,dyn_object.circularConstraintVector);
			}
		}
	}

	if(mode === "setAngle") {
		f = function() {
			if(f.motionFunctionEnabled === true) {
				return Motion.setAngle(dyn_object,motion);
			}
		}
	}

	if(mode === "circular_constraint_setAngle") {
		f = function() {
			if(f.motionFunctionEnabled === true) {
				var a = Math.atan2(dyn_object.y - dyn_object.circularConstraintVector.y,dyn_object.x - dyn_object.circularConstraintVector.x)
				Motion.rotate(dyn_object,-a,dyn_object.circularConstraintVector);
				Motion.rotate(dyn_object,motion,dyn_object.circularConstraintVector);
			}
		}
	}


	f.motionFunctionEnabled = true;

	return f;

}

/**
 * 
 * The `velocity` widget makes dynamic objects go at a certain velocity.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {WFunctionOptions} widget
 * @param {Vector} widget.vector - Velocity vector
 * @this {PhSim} 
 */

PhSim.Widgets.velocity = function(dynObject,widget) {

	var w = new Widget(dynObject,widget);

    var f = this.createMotionFunction("velocity",dynObject,widget.vector);

	w.wFunction = f;

    this.createWFunction(dynObject,f,widget);

}

/**
 * 
 * The `translate` widget moves objects.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object to be translated.
 * @param {WFunctionOptions} widget - Widget options.
 * @param {Vector} widget.vector - Translation vector
 * @this {PhSim} 
 */

PhSim.Widgets.translate = function(dynObject,widget) {

	var w = new Widget(dynObject,widget);

    var f = this.createMotionFunction("translate",dynObject,widget.vector);
	
	w.wFunction = f;

    this.createWFunction(dynObject,f,widget);
}

/**
 * 
 * The `position` widget sets the position of an object.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic object that will have its position changed.
 * @param {WFunctionOptions} widget - Widget options.
 * @this {PhSim} 
 */

PhSim.Widgets.position = function(dynObject,widget) {

	var w = new Widget(dynObject,widget);

    var f = this.createMotionFunction("position",dynObject,widget.vector);
	w.wFunction = f;

    this.createWFunction(dynObject,f,widget);
}

/**
 * 
 * The `rotation` widget rotates an object. 
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {WFunctionOptions} widget
 * @this {PhSim} 
 */

PhSim.Widgets.rotation = function(dynObject,widget) {

	var f;

    if(widget.circularConstraintRotation) {
        f = this.createMotionFunction("circular_constraint_rotation",dynObject,widget.cycle);
    }

    else {
		f = this.createMotionFunction("rotation",dynObject,widget.cycle);
    }
    
    this.createWFunction(dynObject,f,widget);
}

/**
 * The `setAngle` widget makes a widget change angle.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object
 * @param {WFunctionOptions} widget 
 */

PhSim.Widgets.setAngle = function(dynObject,widget) {

	var f;

    if(widget.circularConstraintRotation) {
        f = this.createMotionFunction("circular_constraint_setAngle",dynObject,widget.cycle);
    }

    else {
		f = this.createMotionFunction("setAngle",dynObject,widget.cycle);
    }
    
    this.createWFunction(dynObject,f,widget);

}

/**
 * The `force` widget exerts a force on an object
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget 
 */

PhSim.Widgets.force = function(dyn_object,widget) {

    var f = this.createMotionFunction("force",dyn_object,widget.vector);

    this.createWFunction(dyn_object,f,widget);
    
}


/**
 * 
 * Call ObjLink functions
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */


PhSim.prototype.callObjLinkFunctions = function(dynObject) {
	for(var i = 0; i < dynObject.objLinkFunctions.length; i++) {
		dynObject.objLinkFunctions[i]();
	}
}

/**
 * 
 * The `objLink` widget executes all functions in the {@link PhSim.DynObject#objLinkFunctions}
 * array of `widget.target`. 
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - Reciever Object
 * @param {WFunctionOptions} widget - Widget options
 * @param {LOAddress|PhSim.DynObject} widget.target -  Target object
 */

PhSim.Widgets.objLink = function(dyn_object,widget) {

    var w = new Widget(dyn_object,widget);

    var self = this;
    var targetObj;
    var widgetO = widget;

    this.on("load",function(){

        if(typeof widget.target.L === "number" && typeof widget.target.O === "number") {
            targetObj = self.LO(widgetO.target.L,widgetO.target.O);
        }

        else if(widget.target instanceof DynObject) {
            targetObj = widget.target;     
        }
    
        var eventFunc = function(){
            self.callObjLinkFunctions(targetObj);
        } 
    
        w.wFunction = self.createWFunction(dyn_object,eventFunc,widget);

    },{
        slEvent: true
    });
    
    return w;
    
}

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

    var wFunction = function(event) {

		if(wFunction.wFunction_enabled) {

			try {
				return wFunctionBody.apply(thisRef,event);
			}

			catch(e) {
				self.callEventClass("wfunctionerror",self,e);
				console.error(e);
			}

		}

	}

	wFunction._options = options;
	wFunction._bodyFunction = wFunctionBody;
	wFunction._thisRef = thisRef;
	wFunction.wFunction_enabled = options.enabled || true;

	if(options._name) {
		self.wFunctionNames[options._name] = wFunction;
	}
	
	if(options.trigger === "key") {

		if(options.key) {
		
			wFunction._ref = function(e) {
				if( e.key.match( new RegExp("^" + options.key + "$","i") ) ) {
					wFunction(e);
				}
			};

		}

		else {

			wFunction._ref = function(e) {
				wFunction(e);
			}

		}

		wFunction._eventclass = "keydown";
		
	}

	else if(options.trigger === "sensor" || options.trigger === "sensor_global") {

		if(options.trigger === "sensor") {
			
			wFunction._ref = function(e) {

				var m = self.inSensorCollision(thisRef)
	
				if(m) {
					wFunction(e);
				}
	
			}
		}

		else {
			wFunction._ref = function(e) {
				wFunction(e);
			}
		}

		wFunction._eventclass = "collisionstart";

	}

	else if(options.trigger === "update") {
		
		wFunction._ref = function() {
			wFunction();
		}

		wFunction._eventclass = "beforeupdate";

	}

	else if(options.trigger === "objclick" || options.trigger === "objclick_global") {

		var f;

		if(options.trigger === "objclick") {
			wFunction._ref = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === thisRef) {
					wFunction(e);
				}
			};
		}

		else {
			wFunction._ref = function(e) {
				wFunction(e);
			}
		}

		wFunction._eventclass = "objclick";

	}

	else if(options.trigger === "objmousedown" || options.trigger === "objmousedown_global") {

		if(options.trigger === "objmousedown") {
			wFunction._ref = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === thisRef) {
					wFunction(e);
				}
			}
		}


		else {
			wFunction._ref = function(e) {
				wFunction(e);
			}
		}

		wFunction._eventclass = "objmousedown";

	}

	else if(options.trigger === "firstslupdate") {
		
		wFunction._ref = function(e) {
			wFunction(e)
		}

		wFunction._eventclass = "firstslupdate";


	}
	
	else if(options.trigger === "objmouseup" || options.trigger === "objmouseup_global") {

		if(options.trigger === "objmouseup") {
			wFunction._ref = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === thisRef) {
					wFunction(e);
				}
			};
		}

		else {
			wFunction._ref = function(e) {
				wFunction(e);
			}
		}

		wFunction._eventclass = "objmouseup";

	}

	else if(options.trigger === "objlink") {

		thisRef.objLinkFunctions = thisRef.objLinkFunctions || [];
		thisRef.objLinkFunctions.push(wFunction);

		wFunction._ref = f;

		return wFunction;

	}

	else if(options.trigger === "afterslchange") {

		wFunction._ref = function(e) {
			wFunction(e);
		}

		wFunction._eventclass = "afterslchange";

	}

	else if(options.trigger === "time") {

		var getFunction = function() {

			var fn;

			if(Number.isInteger(options.maxN)) {

				fn = function() {

					if(fn.__n === options.maxN) {
						clearInterval(fn.__interN);
					}

					else {
						if(!self.paused) {
							wFunction();
							fn.__n++;
						}
					}

				}

				fn.__n = 0;

			}

			else {

				fn = function() {
					if(!self.paused) {
						wFunction();
					}
				}

			}


			fn.__phtime = options.time;
			fn.__interN = null;

			return fn;

		}

		var refFunc = getFunction();

		// Making sure that the interval starts after the simulation has has it's first
		// Update and not run at the moment the wFunction is created.

		if(this.status === statusCodes.LOADED_SIMULATION) {
			refFunc.__interN = setInterval(refFunc,refFunc.__phtime);
		}

		else if(this.status < statusCodes.LOADED_SIMULATION) {
			self.on("firstslupdate",function(){
				refFunc.__interN = setInterval(refFunc,refFunc.__phtime);
			});
		}

		wFunction._ref = refFunc.__interN;

		return wFunction;
	}

	else {
		wFunction._ref = wFunction;	
		wFunction._eventclass = options.trigger;
	}

	if(typeof wFunction._ref === "function") {
		wFunction._ref._wFunction = wFunction;
	}

	if(typeof wFunction._eventclass === "string") {

		wFunction._listener = wFunction._ref;
		
		self.on(wFunction._eventclass,wFunction._ref,{
			"slEvent": true
		});
	}

	// Return wFunction

	return wFunction

}

/** 
 * 
 * Disable wFunction
 * 
 * @memberof PhSim
 * @function
 * @param {WFunction} wFunction - Reference created by {@link PhSim#createWFunction}.
 * 
*/

PhSim.prototype.disableWFunction = function(wFunction) {
	wFunction.wFunction_enabled = false;
}

/**
 * Make wFunction no longer be able to work.
 * 
 * @memberof PhSim
 * @function
 * @param {WFunction} wFunction - wFunction to destroy.
 */

PhSim.prototype.destroyWFunction = function(wFunction) {

	this.disableWFunction(wFunction);

	if(typeof wFunction._eventclass === "string") {
		this.off(wFunction._eventclass,wFunction._ref);
	}

	else if(wFunction._options.trigger === "time") {
		clearInterval(wFunction._ref)
	}

	else if(wFunction._options.trigger === "objlink") {
		var i = wFunction._thisRef.objLinkFunctions.indexOf(wFunction);
		wFunction._thisRef.objLinkFunctions.splice(i,1);
	}

	if(wFunction._name) {
		delete this.wFunctionNames[wFunction._name];
	}

}

/**
 * 
 * The `wFunction` widget is used to create wFunctions.
 * 
 * @memberof PhSim
 * @function
 * @param {PhSim.DynObject|PhSim} o - Target object or simulation
 * @param {WFunctionOptions} widget - wFunction options
 */

PhSim.Widgets.wFunction = function(o,widget) {
	this.createWFunction(o,widget.function,widget);
}

PhSim.prototype.wFunctionNames = {}

/**
 * 
 * The `elevator` widget makes objects go back and forth within some range.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {Object} widget - Options
 * @param {Vector} widget.pointA - First point of the elevator
 * @param {Vector} widget.pointB - Second point of the elevator
 * @param {"x"|"y"} widget.bounding - Rules for deteriming the range of the elevator. 
 * 
 * If `widget.bounding` is equal to `"x"`, then the elevator switches direction if the
 * `x` value of the position of `dyn_object` is equal to `widget.pointA.x` or `widget.pointB.x`.
 * 
 * If `widget.bounding` is equal to `"y"`, then the elevator switches direction if the
 * `y` value of the position of `dyn_object` is equal to `widget.pointA.y` or `widget.pointB.y`.
 * 
 */

PhSim.Widgets.elevator = function(dyn_object,widget) {
            
    var func = function() {
    
        var bounding = widget.bounding;

        var obj = dyn_object;
        var relVec = Vector.subtract(widget.pointB,widget.pointA);
        
        var u = Vector.unitVector(relVec);
        
        var ax;
        var ay;
        var bx;
        var by;
        
        // Corrections
        
        var reversable = true;
        
        // Condition function for checking if object is in bounds
        
        var cond_f = function() {}
        
        if(bounding === "x") {

            if(widget.pointA.x < widget.pointB.x) {
                ax = widget.pointA.x;
                bx = widget.pointB.x;
            }
            
            if(widget.pointB.x < widget.pointA.x) {
               ax = widget.pointB.x;
               bx = widget.pointA.x;
            }
        
            cond_f = function() {
                return (ax <= obj.matter.position.x) && (obj.matter.position.x <= bx);
            }
        
        }
        
        if(bounding === "y") {

            if(widget.pointA.y < widget.pointB.y) {
                ay = widget.pointA.y;
                by = widget.pointB.y;
            }
            
            if(widget.pointB.y < widget.pointA.y) {
               ay = widget.pointB.y;
               by = widget.pointA.y;
            }
        
            cond_f = function() {
                return (ay <= obj.matter.position.y) && (obj.matter.position.y <= by);
            }
        
        }
        
        // Set body static
        
        Matter.Body.setStatic(dyn_object.matter,true);
        
        // Event function

        var inRange = function() {

        if( cond_f() ) {
        Motion.translate(obj,Vector.scale(u,1));
                reversable = true;
        }
          
            else {
            
                if(reversable) {

                    u = {
                        "x": -u.x,
                        "y": -u.y
                    }

                    reversable = false;
                }

                else {
                    Motion.translate(obj,Vector.scale(u,1));
                }
            
            }
            

        }

        return inRange


    }

    this.on("afterupdate",func());

}




/**
 * 
 * The `keyboardControls` widget is a widget that makes an object go at a certain velocity
 * if the arrow keys are pressed.
 * 
 * @function
 * @param {PhSim.DynObject} dynObj 
 * @param {Object} keyboardControls - Keyboard Controls options
 * 
 * @param {Number} keyboardControls.right - Velocity in the right direction if the right key is pressed.
 * @param {NUmber} keyboardControls.up - Velocity in the up direction if the up key is pressed.
 * @param {Number} keyboardControls.left - Velocity in the left direction if the left key is pressed.
 * @param {Number} keyboardControls.down - Velocity in the down direction if the down key is pressed.
 */

PhSim.prototype.addKeyboardControls = function(dynObj,keyboardControls) {

	var f = function(event) {
		if(event.code == "ArrowRight") {
			Motion.setVelocity(dynObj, {x: keyboardControls.right, y: 0});
		}
		
		if(event.code == "ArrowUp") {
			Motion.setVelocity(dynObj, {x: 0, y: -keyboardControls.up});
		}
		
		if(event.code == "ArrowLeft") {
			Motion.setVelocity(dynObj, {x: -keyboardControls.left, y: 0});
		}
		
		if(event.code == "ArrowDown") {
			Motion.setVelocity(dynObj, {x: 0, y: keyboardControls.down});
		}
		
	}

	this.on("keydown",f,{
		"slEvent": true
	}); 
4
}

PhSim.Widgets.keyboardControls = function(dyn_object,widget) {
    this.addKeyboardControls(dyn_object,widget);
}

/**
 * 
 * The `transformCameraByObj` widget transforms the camera by an object.
 * 
 * @function
 * @this PhSim
 * @param {PhSim.DynObject} dyn_object - Object that will transform object.
 */


PhSim.Widgets.transformCameraByObj = function(dyn_object) {

    var w = new Widget(dyn_object);

    var self = this;

    var dx;
    var dy;

    // beforeUpdate

    var beforeUpdate = function(){
        if(w.status === "enabled") {
            dx = dyn_object.matter.position.x;
            dy = dyn_object.matter.position.y;
        }
    }

    this.on("beforeupdate",beforeUpdate,{
        "slEvent": true
    });

    // afterupdate

    var afterUpdate = function(){
        if(w.status === "enabled") {
            dx = dyn_object.matter.position.x - dx;
            dy = dyn_object.matter.position.y - dy;
            self.camera.translate(-dx,-dy);
        }
    }

    this.on("afterupdate",afterUpdate,{
        "slEvent": true
    });

    // Widget Destruction

    w.on("destoy",function(){
        self.off("afterupdate",afterUpdate);
        self.off("beforeupdate",beforeUpdate);
    });

    return w;

}

/**
 * 
 * The `setColor` widget changes the color of an object.
 * It utlizies the {@link PhSim.DynObject.setColor} function.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - Dynamic Object that will have it's color changed.
 * @param {WFunctionOptions} widget - Widget Options
 * @param {String} widget.color - The new color of the object.
 * @returns {PhSim.Widget}
 */

PhSim.Widgets.setColor = function(dyn_object,widget) {

    var self = this;

    var w = new Widget(dyn_object,widget);

    var f = function() {
        PhSim.DynObject.setColor(dyn_object,widget.color);
    }

    w.wFunction = self.createWFunction(dyn_object,f,widget);

    dyn_object.test1 = w;

    return w;

}

/**
 * 
 * The `setBorderColor` widget sets the border color of an object.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget - Widget properties.
 * @param {String} widget.color - The new color of the object border
 * @returns {PhSim.Widget}
 * 
 */
    
PhSim.Widgets.setBorderColor = function(dyn_object,widget) {

    var w = new Widget(dyn_object,widget);

    var closure = function() {

        var color = widget.color
        var obj = dyn_object;

        var f = function() {
            PhSim.DynObject.setBorderColor(obj,color);
        }

        return f;

    }

    w.wFunction = this.createWFunction(dyn_object,closure(),widget);

    return w;
}

/**
 * 
 * The `setLineWidth` widget sets the line width of an object.
 * 
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - The object to be affected.
 * @param {WFunctionOptions} widget - Widget options
 * @param {Number} widget.width - New line width
 * @returns {PhSim.Widget}
 * 
 */
        
PhSim.Widgets.setLineWidth = function(dyn_object,widget) {

    var w = new Widget(dyn_object,widget);

    var f = function(){
        PhSim.DynObject.setLineWidth(dyn_object,widget.width);
    }

    w.wFunction = this.createWFunction(dyn_object,f,widget);

    return w;
}

/**
 * 
 * The deleteSelf widget makes an object delete itself from the simulation.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - The Dynamic Object to be configured.
 * @param {WFunctionOptions} widget - Configuration options
 */

PhSim.Widgets.deleteSelf = function(dyn_object,widget) {

    var w = new Widget(dyn_object,widget);

    var self = this;
    
    var f = function(){
        self.removeDynObj(dyn_object);
        self.disableWFunction(w.wFunction);
    }

    w.wFunction = this.createWFunction(dyn_object,f,widget);

    return w;

}


/**
 * 
 * @param {DynSimObject} o 
 * 
 * @param {Object} w -  Widget Options
 * 
 * @param {Number} w.rows -  Widget Rows
 * @param {Number} w.rowDist - Distance between two adjacent objects in a row 
 * 
 * @param {Number} w.columns - Columns
 * @param {Number} w.colDist - Distance between two adjecent objects in the column
 * 
 * @this {PhSim}
 *  
 */

PhSim.Widgets.stack = function(o,w) {

    var a = [];

    for(let i = 1; i <= w.rows; i++) {

        let new_o = this.cloneObject(o);

        PhSim.Motion.transform(new_o,{
            x: w.rowDist * i,
            y: 0
        });

        a.push(new_o);

    }


    for(let i = 1; i <= w.columns; i++) {

        let new_o = this.cloneObject(o);

        PhSim.Motion.transform(new_o,{
            x: 0,
            y: w.colDist * i
        });

        a.push(new_o);

    }
}

/**
 * Connect two Dynamic Objects
 * @param {PhSim.DynObject} parent 
 * @param {PhSim.DynObject} child 
 */

PhSim.prototype.connectDynObjects = function(parent,child) {

	parent.connectedDynObjects.push(child);

	Matter.Body.setStatic(child.matter,true);

	var vect = Vector.subtract(child,parent);

	var f = function() {
		Motion.setPosition(child,Vector.add(parent.matter.position,vect));
	}

	this.on("afterupdate",f);

	parent.connectedDynObjects.push(child);

	return f;

}

 /**
 * 
 * 
 * Constraint Widget
 * 
 * @function
 * @memberof PhSim.Widgets
 * @param {PhSim} phsim 
 * @param {Object} widget - Widget Options
 * @param {LOAddress|PhSim.DynObject} [widget.objectA] - Object A - First point.
 * @param {LOAddress|PhSim.DynObject} [widget.objectB] - Object B - Second Point
 * @param {Vector} [widget.pointA] - First point (see `widget.position` for more information)
 * @param {Vector} [widget.pointB] - Second point (see `widget.position` for more information)
 * @param {"relative"|"absolute"} [widget.position = "absolute"] - Positions of points. 
 * 
 * If set to `"relative"`, then the rules for positioning a point is the following:
 * 
 * * If `widget.objectA` is set, then `widget.pointA` defines the offset from the 
 * centroid of `widget.objectA`. Otherwise, the point is set to a point in the phsim space.
 * 
 * * If `widget.objectB` is set, then `widget.pointB` defines the offset from the centroid
 * of `widget.objectB`. Otherwise, the point is set to a point in the phsim space.
 * 
 * Note: If one is familar with Matter.js, then the rules are simular to rules of making a 
 * constraint are simular to those in Matter.js.
 * 
 * If set to `"absolute"`, then the rules for positioning a point is that the points 
 * are set to points in space. This is the default value.
 */

PhSim.Widgets.constraint = function(phsim,widget) {

    var position = "absolute";

    if(widget.position === "relative") {
        position = "relative"
    } 
    
    else if(widget.position === "absolute") {
        position = "absolute";
    }
    
    var b = {}

    if(position === "absolute") {

        if(widget.objectA) {

            if(widget.objectA instanceof DynObject) {
                b.bodyA = widget.objectA.matter;
            }
    
            else {
    
                if(typeof widget.objectA.L === "number" && typeof widget.objectA.O === "number") {
                    b.bodyA = phsim.LO(widget.objectA.L,widget.objectA.O).matter;
                }
    
                else {
                    b.bodyA = phsim.optionMap.get(widget.objectA).matter;
                }
    
            }
    
        }
    
        if(widget.objectB) {
            b.bodyB = phsim.LO(widget.objectB.L,widget.objectB.O).matter;
    
            if(widget.objectB instanceof DynObject) {
                b.bodyB = widget.objectB.matter;
            }
    
            else {
    
                if(typeof widget.objectB.L === "number" && typeof widget.objectB.O === "number") {
                    b.bodyB = phsim.LO(widget.objectB.L,widget.objectB.O).matter;
                }
    
                else {
                    b.bodyB = phsim.optionMap.get(widget.objectB).matter;
                }
    
            }
    
        }
    
        if(widget.pointA) {
    
            if(widget.objectA) {
                b.pointA = Vector.subtract(widget.pointA,b.bodyA.position);
            }
    
            else {
                b.pointA = widget.pointA;
            }
    
        }
    
        if(widget.pointB) {
            
            if(widget.objectB) {
                b.pointB = Vector.subtract(widget.pointB,b.bodyB.position);
            }
    
            else {
                b.pointB = widget.pointB;
            }
        }

    }

    if(position === "relative") {
        b.pointA = widget.pointA;
        b.pointB = widget.pointB;
        b.bodyA = widget.objectA.plugin.dynObject;
        b.bodyB = widget.objectB.plugin.dynObject;
    }

    var c = Matter.Constraint.create(b);

    Matter.World.add(phsim.matterJSWorld,c);

}

PhSim.Widgets.setImgSrc = function(dynObject,widget) {

    var f = function(){
        dynObject.sprite.src = widget.src;
    }

    this.createWFunction(dynObject,f,widget);
}

PhSim.Widgets.transformAgainstCamera = function (o) {

    var self = this;

    var w = new Widget(o);

    this.camera.transformingObjects.push(o);

    var destroy = function() {
        var i = self.camera.transformingObjects.indexOf(o); 
        self.camera.transformingObjects.splice(i,1);
    }

    w.on("destroy",destroy);
    w.on("disable",destroy);

    return w;

}

/**
 * PlayAudio Widget
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {Object} widget
 * @this PhSim
 */

PhSim.Widgets.playAudio = function(dyn_object,widget) {

    var self = this;

    var i = this.audioPlayers;
    
    this.staticAudio.push(widget);

    var f = function() {
        self.playAudioByIndex(i);
    }

    this.createWFunction(dyn_object,f,widget);

    this.audioPlayers++;
}

/**
 * Make object not rotate
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {*} widget 
 */
    
PhSim.Widgets.noRotation = function(dyn_object) {
    Matter.Body.setInertia(dyn_object.matter, Infinity)
}

/**
 * Get Widget object by name
 * @param {string} name 
 */

PhSim.prototype.getWidgetByName = function(name) {
	for(var i = 0; i < this.objUniverse.length; i++) {
		for(var j = 0; i < this.objUniverse[i].widgets.length; i++) {
			if(this.objUniverse[i].widgets[j].name === name) {
				return this.objUniverse[i].widgets[j];
			}
		}
	}
}