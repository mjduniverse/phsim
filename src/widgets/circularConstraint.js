/**
 * Create circular constraint
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Number} x 
 * @param {Number} y 
 */

PhSim.prototype.createCircularConstraint = function(dynObject,x,y) {
	
	var c = PhSim.Matter.Constraint.create({
		
		"bodyA": dynObject.matter,
		
		"pointB": {
			"x": x,
			"y": y
		}

	});

	PhSim.Matter.World.add(this.matterJSWorld,c)

	var relAngle = Math.atan2(y - dynObject.matter.position.y,x - dynObject.matter.position.x);

	this.addEventListener("afterupdate",function(){
		var newAngle = Math.atan2(y - dynObject.matter.position.y,x - dynObject.matter.position.x) - relAngle;
		this.setAngle(dynObject,newAngle);
	});


	dynObject.circularConstraintVector = {
		"x": x,
		"y": y
	}

}

PhSim.Widgets.circularConstraint = function(widget,dyn_object) {
	this.createCircularConstraint(dyn_object,widget.x,widget.y);
}