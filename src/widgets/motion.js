
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
			return self.applyForce(dyn_object,dyn_object.matter.position,motion);
		}
	}

	if(mode === "velocity") {
		return function() {
			return self.setVelocity(dyn_object,motion);
		}
	}

	if(mode === "translate") {
		return function() {
			return self.translate(dyn_object,motion);
		}
	}

	if(mode === "position") {
		return function() {
			return self.setPosition(dyn_object,motion)
		}
	}

	if(mode === "rotation") {
		return function() {
			return self.rotate(dyn_object,motion,dyn_object.matter.position);
		}
	}

	if(mode === "circular_constraint_rotation") {
		return function() {
			return self.rotate(dyn_object,motion,dyn_object.circularConstraintVector);
		}
	}

	if(mode === "setAngle") {
		return function() {
			return self.setAngle(dyn_object,motion);
		}
	}

	if(mode === "circular_constraint_setAngle") {
		return function() {
			var a = Math.atan2(dyn_object.y - dyn_object.circularConstraintVector.y,dyn_object.x - dyn_object.circularConstraintVector.x)
			self.rotate(dyn_object,-a,dyn_object.circularConstraintVector);
			self.rotate(dyn_object,motion,dyn_object.circularConstraintVector);
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

PhSim.Widgets.velocity = function(widget,dynObject) {
    var f = this.createMotionFunction("velocity",dynObject,widget.vector);
    this.addSimpleEvent(widget.trigger,f,{
        ...widget,
        simpleEventObj: dynObject
    });
}

/**
 * 
 * Translatation widget
 * 
 * @param {PhSim.DynObject} dynObject 
 * @param {Widget} widget
 * @this {PhSim} 
 */

PhSim.Widgets.translate = function(widget,dynObject) {
    var f = this.createMotionFunction("translate",dynObject,widget.vector);
    this.addSimpleEvent(widget.trigger,f,{
        ...widget,
        simpleEventObj: dynObject
    });
}

/**
 * 
 * Position widget
 * 
 * @param {PhSim.DynObject} dynObject 
 * @param {Widget} widget
 * @this {PhSim} 
 */

PhSim.Widgets.position = function(widget,dynObject) {
    var f = this.createMotionFunction("position",dynObject,widget.vector);
    this.addSimpleEvent(widget.trigger,f,{
        ...widget,
        simpleEventObj: dynObject
    });
}

/**
 * 
 * Rotation widget
 * 
 * @param {PhSim.DynObject} dynObject 
 * @param {Widget} widget
 * @this {PhSim} 
 */

PhSim.Widgets.rotation = function(widget,dynObject) {

    if(widget.circularConstraintRotation) {
        var f = this.createMotionFunction("circular_constraint_rotation",dynObject,widget.cycle);
    }

    else {
        var f = this.createMotionFunction("rotation",dynObject,widget.cycle);
    }
    
    this.addSimpleEvent(widget.trigger,f,{
        ...widget,
        simpleEventObj: dynObject
    });
}

PhSim.Widgets.setAngle = function(widget,dynObject) {

    if(widget.circularConstraintRotation) {
        var f = this.createMotionFunction("circular_constraint_setAngle",dynObject,widget.cycle);
    }

    else {
        var f = this.createMotionFunction("setAngle",dynObject,widget.cycle);
    }
    
    this.addSimpleEvent(widget.trigger,f,{
        ...widget,
        simpleEventObj: dynObject
    });

}

PhSim.Widgets.force = function(widget,dyn_object) {

    var f = this.createMotionFunction("force",dyn_object,widget.vector);

    this.addSimpleEvent(widget.trigger,f,{
        ...widget,
        simpleEventObj: dyn_object
    });
    
}