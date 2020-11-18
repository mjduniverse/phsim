// Set Angle to mouse.

// Object Connection

PhSim.prototype.connectDynObjects = function(parent,child) {

	PhSim.Matter.Body.setStatic(child,true);

	var self = this;
	
	var f = function() {

		var v = {
			"x": parent.matter.position.x - parent.matter.positionPrev.x,
			"y": parent.matter.position.y - parent.matter.positionPrev.y,
		}

		self.translate(child,v);

		self.rotate(child,parent.matter.angle - parent.matter.anglePrev,parent.matter.position);

	}

	this.addEventListener("afterupdate",f)

	return f;

}

/**
 * @function
 * @param {PhSim.DynObject} dynObj 
 * @param {Object} keyboardControls - Keyboard Controls options 
 */

PhSim.prototype.addKeyboardControls = function(dynObj,keyboardControls) {

	var f = function(event) {
		if(event.code == "ArrowRight") {
			PhSim.Matter.Body.setVelocity(dynObj.matter, {x: keyboardControls.right, y: 0});
		}
		
		if(event.code == "ArrowUp") {
			PhSim.Matter.Body.setVelocity(dynObj.matter, {x: 0, y: -keyboardControls.up});
		}
		
		if(event.code == "ArrowLeft") {
			PhSim.Matter.Body.setVelocity(dynObj.matter, {x: -keyboardControls.left, y: 0});
		}
		
		if(event.code == "ArrowDown") {
			PhSim.Matter.Body.setVelocity(dynObj.matter, {x: 0, y: keyboardControls.down});
		}
		
	}

	this.addEventListener("keydown",f,{
		"slEvent": true
	}); 

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

PhSim.prototype.addToOverlayer = function(dynObject) {
	
	if(!dynObject.permStatic) {
		PhSim.Matter.World.add(this.matterJSWorld, dynObject.matter);
	}

	this.objUniverse.push(dynObject);

}

/**
 * Check if the object is a dynamic object.
 * 
 * @function
 * @param {PhSimObject} o 
 */

PhSim.prototype.isNonDyn = function(o) {
	return o.noDyn || o.permStatic;
}

/**
 * 
 * Add Object to PhSim simulation
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Object} options
 * @param {Number} options.layer 
 * @returns {PhSim.DynObject} - The added dynObject. 
 */

PhSim.prototype.addObject = function(dynObject,options = {}) {

	if(typeof options.layer === "number") {
		this.dynTree[options.layer].push(dynObject);

		if(!this.isNonDyn(dynObject)) {
			dynObject.layerBranch = this.dynTree[options.layer];
		}

	}

	this.objUniverse.push(dynObject);

	if(!this.isNonDyn(dynObject)) {

		dynObject.phSim = this;

		PhSim.Matter.World.add(this.matterJSWorld,dynObject.matter);

		if(dynObject.static.widgets) {
			this.extractWidgets(dynObject);
		}

	}

	return dynObject;
}

/**
 * Remove dynamic object
 * 
 * @function
 * @param {PhSim.DynObject}  dynObject - Dynamic Object
 * @returns {PhSim.DynObject} - The removed Dynamic Object
 */

PhSim.prototype.removeDynObj = function(dynObject) {

	for(var i = 0; i < dynObject.collisionClasses.length; i++) {
		dynObject.collisionClasses[i].removeDynObject(dynObject);
	}

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