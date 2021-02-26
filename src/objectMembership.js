const PhSim = require(".");
const DynObject = require("./dynObject");

/**
 * 
 * Add Object to PhSim simulation
 * 
 * @function
 * @param {PhSimObject} o 
 * @param {Object} options
 * @param {Number} options.layer 
 * @returns {PhSim.DynObject} - The added dynObject. 
 */

PhSim.prototype.addObject = function(o,options = {}) {

	if(typeof options.layer === "number") {
		this.dynTree[options.layer].push(o);

		if(o instanceof DynObject) {
			o.layerBranch = this.dynTree[options.layer];
		}

	}

	this.objUniverse.push(o);

	if(o instanceof DynObject) {

		o.phSim = this;

		Matter.World.add(this.matterJSWorld,o.matter);

		if(o.static.widgets) {
			this.extractWidgets(o);
		}

	}

	return o;
}


/**
 * Add object to over layer.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.prototype.addToOverlayer = function(o) {
	
	if(o instanceof DynObject) {
		Matter.World.add(this.matterJSWorld, o.matter);
	}

	this.objUniverse.push(o);

}

/**
 * Remove dynamic object
 * 
 * @function
 * @param {PhSim.DynObject}  dynObject - Dynamic Object
 * @returns {PhSim.DynObject} - The removed Dynamic Object
 */

PhSim.prototype.removeDynObj = function(dynObject) {

	Matter.Composite.remove(this.matterJSWorld,dynObject.matter);

	this.objUniverse.splice(this.objUniverse.indexOf(dynObject),1);

	if(dynObject.layerBranch) {
		var i = dynObject.layerBranch.indexOf(dynObject);
		dynObject.layerBranch.splice(i,1);
		dynObject.layerBranch = undefined;
	}

	return dynObject;

}