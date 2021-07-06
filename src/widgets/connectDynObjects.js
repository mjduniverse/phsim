const PhSim = require("..");
const Motion = require("../motion");
const Vector = require("../tools/vector");

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