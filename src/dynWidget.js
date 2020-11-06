/** 
 * 
 * Generate a function to put some dynamic object in motion, given some mode and vector or scalar.
 * 
 * @function
 * @param {string} mode - The possible modes are "force","velocity","translate"
 * @param {dyn_object} dyn_object - The dynamic object to put in motion.
 * @param {*} motion - The vector or scalar that defines the motion.
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

/**
 * 
 * @param {*} dynObject 
 */

PhSim.prototype.callObjLinkFunctions = function(dynObject) {
	for(var i = 0; i < dynObject.objLinkFunctions.length; i++) {
		dynObject.objLinkFunctions[i]();
	}
}

/**
 * 
 * @param {PhSim.DynObject} dynObject 
 * @param {Object} options - The options used for creating a spawned object
 * @param {Vector} options.vector -  The velocity to add to an object when it got spawned.
 * @param 
 */

PhSim.prototype.spawnObject = function(dynObject,options = {}) {
	var obj = new PhSim.DynObject(dynObject.static);
	obj.cloned = true;
	obj.loneParent = dynObject;

	this.addToOverlayer(obj);
	
	var eventObj = new PhSim.PhEvent;
	eventObj.target = dynObject;
	eventObj.clonedObj = obj;

	this.callEventClass("clone",this,eventObj);
}

/*** 

Keyboard Controls

***/

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



PhSim.prototype.forAllObjects = function(call) {
	
	var a = this.objUniverse;

	for(var i = 0; i < a.length; i++) {
		var z = call(a[i]);
		if(z === false) {
			break;
		}
	}
}


PhSim.prototype.addToOverlayer = function(dynObject) {
	
	if(!dynObject.permStatic) {
		PhSim.Matter.World.add(this.matterJSWorld, dynObject.matter);
	}

	this.objUniverse.push(dynObject);

}

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

		// If the collision class object exists

		/** 

		if(dynObject.static.collisionClass && dynObject.static.collisionClass.trim() !== "__main") {

			var a = PhSim.getCollisionClasses(dynObject);

			for(var i = 0; i < a.length; i++) {
				
				if(this.collisionClasses[a[i]]) {
					this.collisionClasses[a[i]].addDynObject(dynObject)
				}

				else {
					var ncc = new PhSim.CollisionClass(a[i]);
					ncc.addDynObject(dynObject);
					this.collisionClasses[a[i]] = ncc;
				}
			}

		}

		**/

		/**else {**/
			PhSim.Matter.World.add(this.matterJSWorld,dynObject.matter);
		/**}**/
		
		if(dynObject.static.widgets) {
			this.extractWidgets(dynObject);
		}

	}

	return dynObject;
}

/**
 * Remove dynamic object
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

/**
 * Toggle Lock Status of Dynamic Object.
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.prototype.toggleLock = function(dynObject) {
	dynObject.locked = !dynObject.locked;
	PhSim.Matter.Body.setStatic(dynObject.matter,dynObject.locked);
}

/**
 * Toggle Semi-Lock Status of Dynamic Object.
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.prototype.toggleSemiLock = function(dynObject) {
	dynObject.locked = !dynObject.locked;
	PhSim.Matter.Body.setStatic(dynObject.matter,dynObject.locked);
}

/**
 * A widget function is a function that used for the WidgetFunction widget.
 * The "this" keyword in the body of function refers to the current instance of
 * PhSim simulation.
 * 
 * @typedef {Function} WFunction
 */

/**
 * Array of widget functions
 * @type {WFunctions[]}
 */

PhSim.prototype.wFunctions = [];

/**
 * Create a widget function and push it to the wFunctions array.
 * @function
 * @param {String|Function} arg - content of function if string, function if function
 * @param {Object} thisRef - 
 * @returns {WFunction}
 */

PhSim.prototype.createWFunction = function(arg,thisRef) {

	if(typeof arg === "string") {
		var o = new Function(arg).bind(thisRef);
	}

	else if(typeof arg === "function") {
		var o = arg.bind(thisRef);
	}

	else {
		throw "Expecting \"function\" or \"string\" type";
	}

    return o;
}