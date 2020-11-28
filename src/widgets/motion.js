const Motion = require("../motion");

Motion
/** 
 * 
 * Generate a function to put some dynamic object in motion, given some mode and vector or scalar.
 * 
 * @function
 * @param {"setAngle"|"force"|"velocity"|"translate"|"position"|"rotation"|"circular_constraint_rotation"} mode - The possible modes are "force","velocity","translate"
 * @param {dyn_object} dyn_object - The dynamic object to put in motion.
 * @param {Vector|Number} motion - The vector or scalar that defines the motion.
 * @returns {Function} - The method to 
 * 
 * 
*/

PhSim.prototype.createMotionFunction = function(mode,dyn_object,motion) {

	var self = this;
	
	if(mode === "force") {
		return function() {
			return Motion.applyForce(dyn_object,dyn_object.matter.position,motion);
		}
	}

	if(mode === "velocity") {
		return function() {
			return Motion.setVelocity(dyn_object,motion);
		}
	}

	if(mode === "translate") {
		return function() {
			return Motion.translate(dyn_object,motion);
		}
	}

	if(mode === "position") {
		return function() {
			return Motion.setPosition(dyn_object,motion)
		}
	}

	if(mode === "rotation") {
		return function() {
			return Motion.rotate(dyn_object,motion,dyn_object.matter.position);
		}
	}

	if(mode === "circular_constraint_rotation") {
		return function() {
			return Motion.rotate(dyn_object,motion,dyn_object.circularConstraintVector);
		}
	}

	if(mode === "setAngle") {
		return function() {
			return Motion.setAngle(dyn_object,motion);
		}
	}

	if(mode === "circular_constraint_setAngle") {
		return function() {
			var a = Math.atan2(dyn_object.y - dyn_object.circularConstraintVector.y,dyn_object.x - dyn_object.circularConstraintVector.x)
			Motion.rotate(dyn_object,-a,dyn_object.circularConstraintVector);
			Motion.rotate(dyn_object,motion,dyn_object.circularConstraintVector);
		}
	}

	return console.error("Parameter 'mode' must either be equal to the one of the following strings: 'force','velocity' or 'position'.");

}

/**
 * 
 * Velocity widget
 * 
 * @param {PhSim.DynObject} dynObject 
 * @param {Widget} widget
 * @this {PhSim} 
 */

PhSim.Widgets.velocity = function(dynObject,widget) {
    var f = this.createMotionFunction("velocity",dynObject,widget.vector);
    this.createWFunction(dynObject,f,widget);
}

/**
 * 
 * Translatation widget
 * 
 * @param {PhSim.DynObject} dynObject 
 * @param {Widget} widget
 * @this {PhSim} 
 */

PhSim.Widgets.translate = function(dynObject,widget) {
    var f = this.createMotionFunction("translate",dynObject,widget.vector);
    this.createWFunction(dynObject,f,widget);
}

/**
 * 
 * Position widget
 * 
 * @param {PhSim.DynObject} dynObject 
 * @param {Widget} widget
 * @this {PhSim} 
 */

PhSim.Widgets.position = function(dynObject,widget) {
    var f = this.createMotionFunction("position",dynObject,widget.vector);
    this.createWFunction(dynObject,f,widget);
}

/**
 * 
 * Rotation widget
 * 
 * @param {PhSim.DynObject} dynObject 
 * @param {Widget} widget
 * @this {PhSim} 
 */

PhSim.Widgets.rotation = function(dynObject,widget) {

    if(widget.circularConstraintRotation) {
        var f = this.createMotionFunction("circular_constraint_rotation",dynObject,widget.cycle);
    }

    else {
        var f = this.createMotionFunction("rotation",dynObject,widget.cycle);
    }
    
    this.createWFunction(dynObject,f,widget);
}

PhSim.Widgets.setAngle = function(dynObject,widget) {

    if(widget.circularConstraintRotation) {
        var f = this.createMotionFunction("circular_constraint_setAngle",dynObject,widget.cycle);
    }

    else {
        var f = this.createMotionFunction("setAngle",dynObject,widget.cycle);
    }
    
    this.createWFunction(dynObject,f,widget);

}

PhSim.Widgets.force = function(dyn_object,widget) {

    var f = this.createMotionFunction("force",dyn_object,widget.vector);

    this.createWFunction(dynObject,f,widget);
    
}