const DynObject = require("./dynObject");
const Vector = require("./tools/vector");

/**
 * @namespace
 * @memberof PhSim
 */

PhSim.Query = {}

/**
 * 
 * Get the special points of a rectangle
 * 
 * @function
 * @param {Object} rectangle 
 */

PhSim.Query.getSpecialRectanglePoints = function(rectangle) {
	
	var o = {

		"center": {
			"rel": {
				"x": 0.5 * rectangle.w,
				"y": 0.5 * rectangle.h
			},
	
			"abs": {
				"x": rectangle.x + o.center.rel.x,
				"y": rectangle.h + o.center.rel.y
			},
		},

		"sidepoint": {

			"rel": {
				"x": rectangle.w,
				"y": 0.5 * rectangle.h
			},

			"abs": {
				"x": o.sidepoint.rel.x + rectangle.x,
				"y": o.sidepoint.rel.y + rectangle.y 
			}

		},

	}

	return o;

}

/**
 * Get the status string of the the dynamic simulation
 * @function
 */

PhSim.prototype.getStatusStr = function() {
	return PhSim.statusStruct[this.status];
}

/**
 * 
 * Get collision classes
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object
 * @returns {String[]}
 * 
 */

PhSim.Query.getCollisionClasses = function(dynObject) {

	if(dynObject.collisionClass) {
		var a = dynObject.collisionClass;
		var b = a.split(" ");
		return b;
	}

	else {
		return [];
	}
}

/**
 * @function
 */

PhSim.prototype.getUniversalObjArray = function() {
	
	var array = []
	
	for(var i = 0; i < this.matterJSWorld.composites.length; i++) {
		
		var a = this.matterJSWorld.composites[i].bodies;

		for(var j = 0; j < a.length; j++) {
			array.push(a[j]);
		}

	}

	for(var i = 0; i < this.matterJSWorld.bodies.length; i++) {
		array.push(this.matterJSWorld.bodies[i]);
	}

	return array;

}

/**
 * Check widget type and return the widget type
 * @param {Widget} widget 
 */

PhSim.Query.chkWidgetType = function(widget) {
	
	for(var i = 0; i < PhSim.boolKey_lc.length; i++) {
		if(widget[PhSim.boolKey_lc[i]]) {
			return PhSim.boolKey_lc[i];
		}
	}

	return "unknown_widget";

}

/**
 * Get static object of a dynamic object
 * @param {PhSim.DynObject} dynObject - The dynamic object
 */

PhSim.prototype.getStatic = function(dynObject) {
	
	if(dynObject.static || dynObject.static) {
		return null;
	}

	else {
		return dynObject.static;
	}
}

/**
 * Get object by name
 * 
 * @function
 * @param {String} str - String for the name
 * @returns {PhSimObject|null} -  Returns the object if found, but returns "null" object if not.
 */

PhSim.prototype.getObjectByName = function(str) {

	for(var i = 0; i < this.objUniverse.length; i++) {
		if(this.objUniverse[i].name === str) {
			return this.objUniverse[i];
		}
	}

	return null;

}

/**
 * Check if two objects are colliding
 * @function
 * @param {PhSim.DynObject} dynObjectA 
 * @param {PhSim.DynObject} dynObjectB
 * @returns {Boolean} 
 */

PhSim.prototype.collided = function(dynObjectA,dynObjectB) {
	return PhSim.Matter.SAT.collides(dynObjectA.matter,dynObjectB.matter).collided;
}

/**
 * Check if an object is in a collision
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @returns {Boolean}
 */

PhSim.prototype.isInCollision = function(dynObject) {

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

/**
 * See if point is contained in shape defined by vertices set.
 * @function
 * @param {Vector[]} a - Set of vertices
 * @param {Vector} v - The vertex to be checked.
 * @return {Boolean} - Returns true if `v` is contained in the shape defined by `a` and false if otherwise.
 */

PhSim.Query.pointInVerts = function(a,v) {

	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");

	ctx.beginPath();
	ctx.moveTo(a[0].x,a[0].y);

	for(var i = 0; i < a.length; i++) {
		ctx.lineTo(a[i].x,a[i].y);
	}

	ctx.closePath();
	var p = ctx.isPointInPath(v.x,v.y);
	ctx.stroke();


	return p;


}

/**
 * 
 * See if point is in vertices border
 * 
 * @function
 * @param {Vector[]} a - Vertices to check
 * @param {Vector} v - Point to check.
 * @param {Number} width - Width of vertices border
 * @returns {Boolean} - Returns `true` if `v` is in the border of the 
 * polygon defined by `a` and false otherwise.
 */

PhSim.Query.pointInVertsBorder = function(a,v,width) {

	if(width) {
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		ctx.lineWidth = width;
		ctx.beginPath();
		ctx.lineTo(a[0].x,a[0].y);

		for(var i = 0; i < a.length; i++) {
			ctx.moveTo(a[i].x,a[i].y);
		}

		ctx.closePath();
		var p = ctx.isPointInPath(v.x,v.y);
		ctx.stroke();


		return p;		
	}

	else {
		return false;
	}

}

/**
 * Deep clone a JavaScript object.
 * @param {Object} o 
 */

PhSim.Query.deepClone = function(o) {
	return JSON.parse(JSON.stringify(o));
}

/**
 * @function
 * @param {*} o 
 * @param {*} x 
 * @param {*} y 
 */

PhSim.Query.pointInRectangle = function(o,x,y) {
	var a = PhSim.getRectangleVertArray(o);
	return PhSim.Query.pointInVerts(a,new Vector(x,y));
}

/**
 * 
 * Check if a point (x,y) is in a dynamic object
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @returns {Boolean}
 */

PhSim.Query.pointInObject = function(o,x,y) {

	if(o.shape === "rectangle") {
		return PhSim.Query.pointInRectangle(o,x,y);
	}

	else if(o.shape === "circle") {

		var d = Vector.distance(o,new Vector(x,y));
		
		if(d < o.radius) {
			return true;
		}

		else {
			return false;
		}

	}  
	
	else if(o.shape === "regPolygon") {
		var a = PhSim.getRegPolygonVerts(o);
		return PhSim.Query.pointInVerts(a,new Vector(x,y));
	}

	else if(o.shape === "polygon") {
		return PhSim.Query.pointInVerts(o.verts,new Vector(x,y));
	}
}

PhSim.prototype.pointInObject = function(o,x,y) {
	return PhSim.Query.pointInObject(o,x,y)
}

/**
 * Get object by ID
 * 
 * @function
 * @param {String} idNum
 * @returns {PhSim.DynObject} 
 * 
 */

PhSim.prototype.getDynObjectByID = function(idNum) {

	var a = this.getUniversalObjArray();

	for(var i = 0; i < a.length; i++) {
		if(a[i].id === idNum) {
			return a[i];
		}
	}

}

/**
 * 
 * Get array of objects that contain a certain point 
 * 
 * @function
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @returns {PhSim.DynObject[]}
 * 
 */

PhSim.prototype.pointObjArray = function(x,y) {

	var b = [];

	var a = this.objUniverse || [];

	for(var i = 0; i < a.length; i++) {
		if(this.pointInObject(a[i],x,y)) {
			b.push(a[i]);
		}
	}

	return b;

}

/** 
 * Get the collison pairs that contain a certain object 
 * 
 * @function
 * @param {PhSim.DynObject} dynObject
 * @returns {PhSim.phSimCollision[]}
 * 
 */

PhSim.prototype.getCollisionList = function(dynObject) {

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

/**
 * 
 * Get array of Dynamic Object colliding some specified colliding object
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object
 * @returns {PhSim.DynObject[]}
 * 
 */

PhSim.prototype.getCollidingObjects = function(dynObject) {
	
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

/**
 * Get senor classes
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @returns {String[]}
 */

PhSim.Query.getSensorClasses = function(dynObject) {

	if(dynObject.sensorClass) {
		var a = dynObject.sensorClass;
		var b = a.split(" ");
		return b;
	}

	else {
		return [];
	}
}

/**
 * 
 * Check if two objects share at least one sensor class
 * 
 * @function
 * @param {PhSim.DynObject} dynObjectA 
 * @param {PhSim.DynObject} dynObjectB 
 * @returns {Boolean}
 */

PhSim.Query.sameSensorClasses = function(dynObjectA,dynObjectB) {
	return PhSim.Query.intersectionExists(PhSim.Query.getSensorClasses(dynObjectA),PhSim.Query.getSensorClasses(dynObjectB));
}

PhSim.Query.intersectionExists = function(array1,array2) {

	for(var i = 0; i < array1.length; i++) {
		var a = array2.indexOf(array1[i]);
		if(a !== -1) {
			return true;
		}
	}

	return false;
}

/**
 * 
 * Get objects colliding some object that share the same 
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Object to check for colliding sensor objects
 * @returns {PhSim.DynObject[]} 
 */

PhSim.prototype.getCollidingSensorObjects = function(dynObject) {
	
	var a = this.getCollisionList(dynObject);
	var b = []

	for(var i = 0; i < a.length; i++) {

		var dynCol = a[i]
		var matterCol = dynCol.matter;

		if(matterCol.bodyA.plugin.ph.id === dynObject.id && PhSim.Query.sameSensorClasses(dynObject,dynCol.bodyB)) {
			b.push(dynCol.bodyB);
		}

		if(matterCol.bodyB.plugin.ph.id === dynObject.id && PhSim.Query.sameSensorClasses(dynObject,dynCol.bodyA)) {
			b.push(dynCol.bodyA);		
		}

	}

	return b;

}

/**
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @returns {Boolean}
 */

PhSim.prototype.inSensorCollision = function(dynObject) {
	
	var a = this.getCollidingSensorObjects(dynObject); 
	
	if(a.length > 0) {
		return true;	
	}

	else {
		return false;
	}
}

/**
 * @function
 * @param {Number} cx - x-coordinate of upper left corner.
 * @param {Number} cy - y-coordinate of upper left corner.
 * @param {Number} cw - width of rectangle
 * @param {Number} ch - height of rectangle
 * @param {Number} px - x-coordinate of point to be checked.
 * @param {Number} py - y-coordinate of point to be checked.
 * @returns {Boolean}
 */

PhSim.Query.isPointInRawRectangle = function(cx,cy,cw,ch,px,py) {
	
	var cond = (cx < px) && (px < cx + cw) && (cy < py) && (py < cy + ch) 

	if(cond) {
		return true;
	}

	else {
		return false;
	}
}

/**
 * 
 * Get object that checks the collision relations between two objects
 * 
 * @function
 * @param {PhSim.DynObject} dynObjectA - The first object
 * @param {PhSim.DynObject} dynObjectB - The second object
 * @returns {PhSim.CollisionReport} - A collision report that updates itself after each update
 */

PhSim.prototype.getCollisionChecker = function(dynObjectA,dynObjectB) {

	var self = this;
	var report = new PhSim.CollisionReport();
	report.before = null;
	report.current = null;
	report.difference = null;
	report.objectA = dynObjectA;
	report.objectB = dynObjectB;

	this.on("beforeupdate",function() {
		report.before = self.collided(dynObjectA,dynObjectB);
	});

	this.on("afterupdate",function() {
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
