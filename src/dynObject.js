const Options = require("./objects");
const PhSim = require("./phSim");

/**
 * 
 * Create Dynamic Object from static object
 * @constructor
 * @memberof PhSim
 * @param {PhSimObject} staticObject - Static Object
 * @augments StaticObject
 * 
 */

var DynObject = function(staticObject) {

	Object.assign(this,JSON.parse(JSON.stringify(staticObject)));

	this.matter = PhSim.DynObject.createMatterObject(staticObject);

	if(staticObject.shape === "polygon") {
		this.skinmesh = JSON.parse(JSON.stringify(staticObject.verts));
	}

	this.firstCycle = staticObject.cycle;

	if(staticObject.shape === "composite") {
		this.flattenedParts = DynObject.flattenComposite();
	}

	
	/** 
	 * Reference to static object used to create the DynObject
	 * @type {StaticObject}
	 */

	this.static = staticObject;

	/** 
	 * Object ID 
	 * @type {String}
	 * */

	this.id = DynObject.nextId;
	DynObject.nextId++;
	
	/**
	 * Reference to parent simulation
	 * @type {null|PhSim}
	 */

	this.phSim;

	/** 
	 * Refernce of DynObj in matter object 
	 * @type {Object}
	 * */

	this.matter.plugin.ph = this;

}

DynObject.prototype.eventStack = {
	update: [],
	click: [],
	mousemove: [],
	mouseup:[],
	mousedown: []
}

DynObject.prototype.on = function(eventStr,call,options = {}) {
	if(this.eventStack[eventStr]) {
		this.eventStack[eventStr].push(call);
	}
}


/**
 * Set color for dynObject.
 * This can be done alternatively by setting `dynObject.fillStyle` directly.
 * 
 * @param {PhSim.DynObject} dyn_object - Dynamic Object
 * @param {String} colorStr - Color String
 */

DynObject.setColor = function(dyn_object,colorStr) {
	dyn_object.fillStyle = colorStr;
}

/**
 * Set border color.
 * @param {PhSim.DynObject} dyn_object 
 * @param {*} colorStr 
 */

DynObject.setBorderColor = function(dyn_object,colorStr) {
	dyn_object.strokeStyle = colorStr;
}

/**
 * 
 * @param {PhSim.DynObject} dyn_object 
 * @param {*} lineWidth 
 */

DynObject.setLineWidth = function(dyn_object,lineWidth) {
	dyn_object.lineWidth = lineWidth;
}

DynObject.setProperty = function(o,key,value) {
	
	if(key === "x") {
		PhSim.Motion.setPosition(value,0);
	}

	else if(key === "y") {
		PhSim.Motion.setPosition(0,value)
	}

	else if(key === "locked") {
		
	}
}

/**
 * 
 * @function
 * @param {PhSimObject} composite - The composite to be flattened.
 * @returns {PhSimObject[]} - The array of objects found in the composites. 
 */

DynObject.flattenComposite = function(composite) {

	var a = [];

	/**
	 * 
	 * @param {*} composite
	 * @inner
	 */
	
	var __f = function(composite) {

		for(var i = 0; i < composite.parts.length; i++) {

			if(composite.parts[i].shape === "composite") {
				DynObject.flattenComposite(composite.parts[i].shape === "composite");
			}

			else {
				a.push(composite.parts[i]);
			}

		}

	}

	__f(composite);

	return a;

}

/**
 * 
 * Create path
 * 
 * @function
 * @param {Vector[]} vectorSet 
 * @param {Path} options 
 */

DynObject.createPath = function(vectorSet,options) {
	var o = new Options.Polygon(vectorSet);
	Object.assign(o,options);
	return new DynObject(o);
}

/**
 * Create circle
 * 
 * @function
 * @param {Number} x - x-coordinate of center
 * @param {Number} y - y-coordinate of center
 * @param {Number} r - radius
 * @param {Circle} options - options
 * @returns {PhSim.DynObject}
 */

DynObject.createCircle = function(x,y,r,options = {}) {
	var o = new Options.Circle(x,y,r);
	Object.assign(o,options);
	return new DynObject(o);
}

/**
 * 
 * Create rectangle
 * 
 * @function
 * @param {Number} x - x-coordinate of upper left corner 
 * @param {Number} y - y-coordinate of upper left corner 
 * @param {Number} w - Width
 * @param {Number} h - Height
 * @param {Rectangle} options 
 * @returns {PhSim.DynObject} - The rectangle
 */

DynObject.createRectangle = function(x,y,w,h,options = {}) {
	var o = new Options.Rectangle(x,y,w,h);
	Object.assign(o,options);
}

/**
 * Create regular polgyon.
 * 
 * @function
 * @param {Number} x - x-coordinate of center
 * @param {Number} y - y-coordinate of center
 * @param {Number} r - radius
 * @param {Number} n - number of sides
 * @param {RegPolygon} options - options
 * @returns {PhSim.DynObject}
 */

DynObject.createRegPolygon = function(x,y,r,n,options = {}) {
	var o = new Options.RegPolygon(x,y,r,n);
	Object.assign(o,options);
	return new DynObject(o);
}

DynObject.setRadius = function(dynObject,radius) {

}

/**
 * 
 * Create a matter.js object from a DynSim static object
 * 
 * @function
 * @param {StaticObject} staticObject
 * @returns {MatterBody} 
 */

DynObject.createMatterObject = function(staticObject) {

	var opts = staticObject;

	opts.label = staticObject.name || "Untitled Object";

	opts.isStatic = staticObject.semiLocked;

	opts.isStatic = staticObject.locked;

	if(typeof staticObject.density === "number") {
		opts.density = staticObject.density;

	}

	else {
		opts.density = 0.001;
	}

	if(typeof staticObject.mass === "number") {
		opts.mass = staticObject.mass;
		opts.inverseMass = 1/staticObject.mass;
	}

	if(typeof staticObject.airFriction === "number") {
		opts.airFriction = staticObject.airFriction;
	}

	if(Number.isInteger(staticObject.collisionNum)) {
		opts.collisionFilter = staticObject.collisionNum;
	}


	if(staticObject.shape === "polygon") {
		return PhSim.Matter.Bodies.fromVertices(PhSim.Matter.Vertices.centre(staticObject.verts).x, PhSim.Matter.Vertices.centre(staticObject.verts).y, staticObject.verts, opts);
	}

	
	else if(staticObject.shape === "circle") {
		return PhSim.Matter.Bodies.circle(staticObject.x, staticObject.y, staticObject.radius,opts);
	}


	else if(staticObject.shape === "rectangle") {
		var set = PhSim.getRectangleVertArray(staticObject);
		return PhSim.Matter.Bodies.fromVertices(PhSim.Matter.Vertices.centre(set).x, PhSim.Matter.Vertices.centre(set).y, set, opts); 
	}

	else if(staticObject.shape === "regPolygon") {
		var set = PhSim.getRegPolygonVerts(staticObject);
		return PhSim.Matter.Bodies.fromVertices(PhSim.Matter.Vertices.centre(set).x, PhSim.Matter.Vertices.centre(set).y, set, opts); 
	}


}

DynObject.nextId = 0;

/**
 * A PhSimObject is either a static object or a dynamic object.
 * 
 * @typedef {PhSim.DynObject|StaticObject} PhSimObject
 * 
 */

 /**
  * A PhSimObject array is an array of PhSimObject objects
  * @typedef {PhSimObject[]} PhSimObjectArr
  */

module.exports = DynObject;