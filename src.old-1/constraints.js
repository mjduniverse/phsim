var Constraints = {
    Static: {}
}

Constraints.Static.SingleObjectConstraint = function() {
	this.damping = 0,
	this.relativeEndPoint = new Vector();
	this.point = new Vector();
	this.object =  null;
	this.SingleObjectConstraint = true;
}

Constraints.Static.DoubleObjectConstraint = function(rel1,rel2) {
	this.doubleObjectConstraint = true
}

Constraints.Static.Constraint = function() {
	this.objectA = null;
	this.objectB = null;
	this.pointA = null;
	this.pointB = null;
	this.constraint = true;
}

export default Constraints;