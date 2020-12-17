// Set Angle to mouse.

const DynObject = require("../dynObject");
const PhSim = require("../phSim");

// Object Connection

PhSim.prototype.connectDynObjects = function(parent,child) {

	PhSim.Matter.Body.setStatic(child,true);

	var self = this;
	
	var f = function() {

		var v = {
			"x": parent.matter.position.x - parent.matter.positionPrev.x,
			"y": parent.matter.position.y - parent.matter.positionPrev.y,
		}

		PhSim.Motion.translate(child,v);

		PhSim.Motion.rotate(child,parent.matter.angle - parent.matter.anglePrev,parent.matter.position);

	}

	this.on("afterupdate",f)

	return f;

}

/**
 * 
 * Run function on all objects.
 * 
 * @function
 * @param {Function} call 
 */

PhSim.prototype.forAllObjects = function(call) {
	
	var a = this.objUniverse;

	for(var i = 0; i < a.length; i++) {
		var z = call(a[i]);
		if(z === false) {
			break;
		}
	}
}

/**
 * Add object to over layer.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.prototype.addToOverlayer = function(o) {
	
	if(o instanceof DynObject) {
		PhSim.Matter.World.add(this.matterJSWorld, o.matter);
	}

	this.objUniverse.push(o);

}

/**
 * Check if the object is a dynamic object.
 * 
 * @function
 * @param {PhSimObject} o 
 */

PhSim.prototype.isNonDyn = function(o) {
	return o.noDyn;
}

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

		PhSim.Matter.World.add(this.matterJSWorld,o.matter);

		if(o.static.widgets) {
			this.extractWidgets(o);
		}

	}

	return o;
}

/**
 * Remove dynamic object
 * 
 * @function
 * @param {PhSim.DynObject}  dynObject - Dynamic Object
 * @returns {PhSim.DynObject} - The removed Dynamic Object
 */

PhSim.prototype.removeDynObj = function(dynObject) {

	PhSim.Matter.Composite.remove(this.matterJSWorld,dynObject.matter);

	this.objUniverse.splice(this.objUniverse.indexOf(dynObject),1);

	if(dynObject.layerBranch) {
		var i = dynObject.layerBranch.indexOf(dynObject);
		dynObject.layerBranch.splice(i,1);
		dynObject.layerBranch = undefined;
	}

	return dynObject;

}

/**
 * Set Object Lifespan
 * 
 * @function
 * @param {*} dynObject - Dynamic Object
 * @param {Number} lifespan - Milliseconds 
 * 
 */

PhSim.prototype.setDynObjectLifespan = function(dynObject,lifespan) {

	var self = this;

	setTimeout(lifespan,function(){
		self.removeDynObj(dynObject);
	});

}

PhSim.prototype.renderAllCounters = function() {
	for(var i = 0; i < this.counterArray.length; i++) {
		this.renderCounterByIndex(i);
	}
}