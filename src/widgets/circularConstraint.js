/**
 * Create circular constraint
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Number} x 
 * @param {Number} y 
 */

PhSim.prototype.createCircularConstraint = function(dynObject,x,y) {
	
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
		PhSim.Motion.setAngle(dynObject,newAngle);
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