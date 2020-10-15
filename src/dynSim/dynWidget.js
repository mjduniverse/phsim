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

PhSim.DynSim.prototype.createMotionFunction = function(mode,dyn_object,motion) {

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

PhSim.DynSim.prototype.connectDynObjects = function(parent,child) {

	Matter.Body.setStatic(child,true);

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

PhSim.DynSim.prototype.createCircularConstraint = function(dynObject,x,y) {
	
	var c = Matter.Constraint.create({
		
		"bodyA": dynObject.matter,
		
		"pointB": {
			"x": x,
			"y": y
		}

	});

	Matter.World.add(this.matterJSWorld,c)

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

PhSim.DynSim.prototype.callObjLinkFunctions = function(dynObject) {
	for(var i = 0; i < dynObject.objLinkFunctions.length; i++) {
		dynObject.objLinkFunctions[i]();
	}
}

// Spawn Function

PhSim.DynSim.prototype.spawnObject = function(dynObject) {
	var obj = new PhSim.Objects.DynObject(dynObject.static);
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

PhSim.DynSim.prototype.addKeyboardControls = function(dynObj,keyboardControls) {

	var f = function(event) {
		if(event.code == "ArrowRight") {
			Matter.Body.setVelocity(dynObj.matter, {x: keyboardControls.right, y: 0});
		}
		
		if(event.code == "ArrowUp") {
			Matter.Body.setVelocity(dynObj.matter, {x: 0, y: -keyboardControls.up});
		}
		
		if(event.code == "ArrowLeft") {
			Matter.Body.setVelocity(dynObj.matter, {x: -keyboardControls.left, y: 0});
		}
		
		if(event.code == "ArrowDown") {
			Matter.Body.setVelocity(dynObj.matter, {x: 0, y: keyboardControls.down});
		}
		
	}

	this.addEventListener("keydown",f,{
		"slEvent": true
	}); 

}

/**
 * Remove dynamic object
 * @param {PhSim.Objects.DynObject}  dynObject - Dynamic Object
 */

PhSim.DynSim.prototype.removeDynObj = function(dynObject) {
	Matter.Composite.remove(this.matterJSWorld,dynObject.matter,true);
	this.objUniverse.splice(this.objUniverse.indexOf(dynObject),1);
}

/**
 * Set Object Lifespan
 * 
 * @function
 * @param {*} dynObject - Dynamic Object
 * @param {Number} lifespan - Milliseconds 
 * 
 */

PhSim.DynSim.prototype.setDynObjectLifespan = function(dynObject,lifespan) {

	var self = this;

	setTimeout(lifespan,function(){
		self.removeDynObj(dynObject);
	});

}

PhSim.DynSim.prototype.renderAllCounters = function() {
	for(var i = 0; i < this.counterArray.length; i++) {
		this.renderCounterByIndex(i);
	}
}
