// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = require("matter-js");
}

// Set Angle to mouse.

const DynObject = require("../dynObject");
const PhSim = require("..");

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
 * Check if the object is a dynamic object.
 * 
 * @function
 * @param {PhSimObject} o 
 */

PhSim.prototype.isNonDyn = function(o) {
	return o.noDyn;
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