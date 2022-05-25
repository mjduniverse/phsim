const Motion = require("../motion");
const PhSim = require("../index");
const Widget = require("../widget");

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