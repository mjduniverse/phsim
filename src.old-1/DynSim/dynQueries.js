var DynQueries = {};

DynQueries.getStatic = function(dynObject) {
	
	if(dynObject.permStatic || dynObject.permStatic) {
		return null;
	}

	else {
		return dynObject.static;
	}
}

DynQueries.getObjectByName = function(str) {

	var returnObj;
	var self = this;
	
	this.forAllObjects(function(dynObject) {
		if(self.getStatic(dynObject).name === str) {
			returnObj = dynObject;
			return false;
		}
	});

	return returnObj;

}

DynQueries.collided = function(dynObjectA,dynObjectB) {
	return Matter.SAT.collides(dynObjectA.matter,dynObjectB.matter).collided;
}

DynQueries.isInCollision = function(dynObject) {

	var self = this;

	var returnValue = false;

	this.forAllObjects(function(object) {
		var a = self.collided(dynObject,object);
		if(a === true) {
			returnValue = a;
			return false;
		}	
	});

	return returnValue;
}

DynQueries.getCollisionChecker = function(dynObjectA,dynObjectB) {

	var self = this;
	var report = new PhSim.CollisionReport();
	report.before = null;
	report.current = null;
	report.difference = null;
	report.objectA = dynObjectA;
	report.objectB = dynObjectB;

	this.addEventListener("beforeupdate",function() {
		report.before = self.collided(dynObjectA,dynObjectB);
	});

	this.addEventListener("afterupdate",function() {
		report.current = self.collided(dynObjectA,dynObjectB);
		report.difference = report.current - report.before;
		if(report.difference) {
			var eventObj = new PhSim.PhDynEvent();
			eventObj.report = report;
			eventObj.difference = report.difference;
			self.callEventClass("collisionchange",self,eventObj);
		}

	})

	return report;
}

DynQueries.pointInObject = function(dynObject,x,y) {
	var c = document.createElement("canvas");
	
	var l = c.getContext("2d");
	var m = new PhSim.PhRender(l);
	m.dynamicSkeleton(dynObject);
	var t = l.isPointInPath(x,y);
	return t;
}

// Get Object By ID

DynQueries.getDynObjectByID = function(idNum) {

	var a = this.getUniversalObjArray();

	for(var i = 0; i < a.length; i++) {
		if(a[i].id === idNum) {
			return a[i];
		}
	}

}

// Get array of objects that contain a certain point

DynQueries.pointObjArray = function(x,y) {

	var b = [];

	var a = this.objUniverse || [];

	for(var i = 0; i < a.length; i++) {
		if(this.pointInObject(a[i],x,y)) {
			b.push(a[i]);
		}
	}

	return b;

}

// Get the collison pairs that contain a certain object

DynQueries.getCollisionList = function(dynObject) {

	var z = [];

	for(var i = 0; i < this.matterJSEngine.pairs.list.length; i++) {

		var a = this.matterJSEngine.pairs.list[i];

		if(a.bodyA.plugin.ph.id === dynObject.id || a.bodyB.plugin.ph.id === dynObject.id) {
			
			var o = new PhSim.phSimCollision();
			o.bodyA = a.bodyA.plugin.ph;
			o.bodyB = a.bodyB.plugin.ph;
			o.matter = a;
			z.push(o);

			console.dir(o);

		}

	}

	return z;
}

DynQueries.getCollidingObjects = function(dynObject) {
	
	var a = this.getCollisionList(dynObject);
	var b = []

	for(var i = 0; i < a.length; i++) {

		if(a[i].matter.bodyA.plugin.id === dynObject.id) {
			b.push(a[i].bodyB);
		}

		if(a[i].matter.bodyB.plugin.id === dynObject.id) {
			b.push(a[i].bodyA);		
		}

	}

	return b;

}

DynQueries.getSensorClasses = function(dynObject) {

	if(dynObject.object.sensorClass) {
		var a = dynObject.object.sensorClass;
		var b = a.split(" ");
		return b;
	}

	else {
		return [];
	}
}

DynQueries.sameSensorClasses = function(dynObjectA,dynObjectB) {
	return intersectionExists(this.getSensorClasses(dynObjectA),this.getSensorClasses(dynObjectB));
}

function intersectionExists(array1,array2) {

	for(var i = 0; i < array1.length; i++) {
		var a = array2.indexOf(array1[i]);
		if(a !== -1) {
			return true;
		}
	}

	return false;
}

DynQueries.getCollidingSensorObjects = function(dynObject) {
	
	var a = this.getCollisionList(dynObject);
	var b = []

	for(var i = 0; i < a.length; i++) {

		var dynCol = a[i]
		var matterCol = dynCol.matter;

		if(matterCol.bodyA.plugin.ph.id === dynObject.id && this.sameSensorClasses(dynObject,dynCol.bodyB)) {
			b.push(dynCol.bodyB);
		}

		if(matterCol.bodyB.plugin.ph.id === dynObject.id && this.sameSensorClasses(dynObject,dynCol.bodyA)) {
			b.push(dynCol.bodyA);		
		}

	}

	return b;

}

DynQueries.inSensorCollision = function(dynObject) {
	
	var a = this.getCollidingSensorObjects(dynObject); 
	
	if(a.length > 0) {
		return true;	
	}

	else {
		return false;
	}
}

/**
 * 
 * Get collision classes
 * 
 * @method getCollisionClasses
 * @param {PhSim.DynObject} dynObject - Dynamic Object
 * 
 */

DynQueries.getCollisionClasses = function(dynObject) {

	if(dynObject.object.collisionClass) {
		var a = dynObject.object.collisionClass;
		var b = a.split(" ");
		return b;
	}

	else {
		return [];
	}
}


// Execute a function for all objects
// Return "false" in the call to break the loop

DynQueries.forAllObjects = function(call) {
	
	var a = this.getUniversalObjArray();

	for(var i = 0; i < a.length; i++) {
		var z = call(a[i]);
		if(z === false) {
			break;
		}
	}
}


DynQueries.addToOverlayer = function(dynObject) {
	Matter.World.add(this.matterJSWorld, dynObject.matter);
	this.objUniverse.push(dynObject);
}

/**
 * Remove dynamic object
 * @param {PhSim.DynObject}  dynObject - Dynamic Object
 */

DynQueries.removeDynObj = function(dynObject) {
	Matter.Composite.remove(this.matterJSWorld,dynObject.matter,true);
	this.objUniverse.splice(this.objUniverse.indexOf(dynObject),1);
}

export default DynQueries;