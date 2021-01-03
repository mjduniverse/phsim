const Static = require("./objects");
const PhSim = require(".");
const Vertices = require("./tools/vertex");
const PhSimEventTarget = require("./events/eventListener");
const EventStack = require("./events/eventStack");

// Try to import matter.js as a commonJS module

try {
	const Matter = require("matter-js");
}

catch {
	
}

/**
 * 
 * Create Dynamic Object from static object
 * @constructor
 * @memberof PhSim
 * @param {PhSimObject} staticObject - Static Object
 * @param {Matter.Body} [matterBody] - Matter Body
 * 
 * @mixes PhSim.PhSimEventTarget
 * @mixes StaticObject
 * 
 * @property {Number} x - x position
 * @property {Number} y - y position
 * 
 */

var DynObject = function(staticObject,matterBody) {

	Object.assign(this,PhSimEventTarget);

	var self = this;

	Object.assign(this,JSON.parse(JSON.stringify(staticObject)));

	this.matter = matterBody || PhSim.DynObject.createMatterObject(staticObject);

	if(staticObject.shape === "polygon") {
		this.skinmesh = JSON.parse(JSON.stringify(staticObject.verts));
	}

	this.firstCycle = staticObject.cycle || 0;

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
 	 * Object containing array functions to be called.
 	 * @type {PhSim.EventStack}
 	 */

	this.eventStack = new EventStack();

	/** 
	 * Refernce of DynObj in matter object 
	 * @type {PhSim.DynObject}
	 * */

	this.matter.plugin.dynObject = this;

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
 * Set color for dynObject.
 * This can be done alternatively by setting `dynObject.fillStyle` directly.
 * 
 * @param {String} colorStr - Color String
 */

DynObject.prototype.setColor = function(colorStr) {
	return DynObject.setColor(this,colorStr)
}

/**
 * Set border color.
 * @param {PhSim.DynObject} dyn_object 
 * @param {String} colorStr 
 */

DynObject.setBorderColor = function(dyn_object,colorStr) {
	dyn_object.strokeStyle = colorStr;
}

/**
 * Set border color.
 * @param {String} colorStr 
 */

DynObject.prototype.setBorderColor = function(colorStr) {
	return DynObject.setBorderColor(this,colorStr);
}

/**
 * 
 * @param {PhSim.DynObject} dyn_object 
 * @param {Number} lineWidth 
 */

DynObject.setLineWidth = function(dyn_object,lineWidth) {
	dyn_object.lineWidth = lineWidth;
}

DynObject.setRegPolygonSideNumber = function(dyn_object,sides) {

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
	var o = new Static.Polygon(vectorSet);
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
	var o = new Static.Circle(x,y,r);
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
	var o = new Static.Rectangle(x,y,w,h);
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
	var o = new Static.RegPolygon(x,y,r,n);
	Object.assign(o,options);
	return new DynObject(o);
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

	var opts = staticObject.matter || {}

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
		return Matter.Bodies.fromVertices(Matter.Vertices.centre(staticObject.verts).x, Matter.Vertices.centre(staticObject.verts).y, staticObject.verts, opts);
	}

	
	else if(staticObject.shape === "circle") {
		return Matter.Bodies.circle(staticObject.x, staticObject.y, staticObject.radius,opts);
	}


	else if(staticObject.shape === "rectangle") {
		var set = Vertices.rectangle(staticObject);
		return Matter.Bodies.fromVertices(Matter.Vertices.centre(set).x, Matter.Vertices.centre(set).y, set, opts); 
	}

	else if(staticObject.shape === "regPolygon") {
		var set = Vertices.regPolygon(staticObject);
		return Matter.Bodies.fromVertices(Matter.Vertices.centre(set).x, Matter.Vertices.centre(set).y, set, opts); 
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