const Static = require("./objects");
const PhSim = require(".");
const Vertices = require("./tools/vertex");
const PhSimEventTarget = require("./events/eventListener");
const EventStack = require("./events/eventStack");

// Try to import matter.js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = require("matter-js");
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

	Object.assign(this,PhSim.Query.deepClone(staticObject));

	/**
	 * DynObject name
	 * @type {String}
	 */

	this.name = staticObject.name;

	/**
	 * Array of connected Dynamic Objects
	 * @type {PhSim.DynObject[]}
	 *
	 */

	this.connectedDynObjects = [];

	/**
	 * DynObject type
	 * @type {"circle" | "polygon" | "rectangle" | "regPolygon"}
	 * 
	 */

	this.shape = staticObject.shape;

	// Apply Shape Specific Constructor

	if(this.shape === "circle") {
		Static.Circle.call(this,staticObject.x,staticObject.y,staticObject.radius);
	}

	if(this.shape === "regPolygon") {
		Static.RegPolygon.call(this,staticObject.x,staticObject.y,staticObject.radius,staticObject.sides)
	}

	if(this.shape === "rectangle") {
		Static.Rectangle.call(this,staticObject.x,staticObject.y,staticObject.w,staticObject.h);
	}

	if(this.shape === "polygon") {
		Static.Polygon.call(this,staticObject.verts);
	}

	this.widgets = staticObject.widgets;

	/**
	 * Matter Body
	 * @type {Object}
	 */

	this.matter = matterBody || PhSim.DynObject.createMatterObject(staticObject);

	if(this.shape === "polygon") {
		this.skinmesh = JSON.parse(JSON.stringify(staticObject.verts));
	}

	/**
	 * Inital angle of object
	 * @type {Number}
	 */

	this.firstCycle = staticObject.cycle || 0;

	if(this.shape === "composite") {
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
	 * Custom properties that can be added by the user to extend the DynObject.
	 * This property is not deep cloned, but assigned to `staticObject.data`.
	 * 
	 * @type {Object}
	 */

	this.data = staticObject.data || {}
	
	/**
	 * Reference to parent simulation
	 * @type {null|PhSim}
	 */

	this.phSim;

	/**
	 * Boolean that makes a dynamic object not collide with anything.
	 * @type {boolean}
	 * @default false
	 */

	this.noCollision = this.noCollision || false;

	/**
 	 * Object containing array functions to be called.
 	 * @type {PhSim.EventStack}
 	 */

	this.eventStack = new EventStack();

	/** 
	 * Reference of DynObject in matter object 
	 * @type {PhSim.DynObject}
	 * */

	this.matter.plugin.dynObject = this;


	if(DynObject.keepInstances) {
		DynObject.instances.push(this);
	}

}

/**
 * If set to `true`, all DynObject instances are put into the 
 * {@link PhSim.DynObject.instances} array. By default, this is `false`.
 * Do not use unless you want to risk memory leaks. This is primarily for debugging 
 * purposes.
 * 
 * @memberof PhSim.DynObject
 * @type {Boolean}
 * @default false
 */

DynObject.keepInstances = false;

/**
 * If set to true, the `staticObject` is cloned before Object.assign is applied to 
 * the DynObject to clone it.
 */

DynObject.deepCloneStaticObject = false;

/**
 * Array of instances if {@link PhSim.DynObject.keepInstances} is set to true
 * @type {PhSim.DynObject[]}
 */

DynObject.instances = [];

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

	var shape = staticObject.shape;

	var opts = staticObject.matter || {}

	opts.label = staticObject.name || "Untitled Object";

	opts.isStatic = staticObject.locked || staticObject.semiLocked;

	var set;

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


	if(shape === "polygon") {
		return Matter.Bodies.fromVertices(Matter.Vertices.centre(staticObject.verts).x, Matter.Vertices.centre(staticObject.verts).y, staticObject.verts, opts);
	}

	
	else if(shape === "circle") {
		return Matter.Bodies.circle(staticObject.x, staticObject.y, staticObject.radius,opts);
	}


	else if(shape === "rectangle") {
		set = Vertices.rectangle(staticObject);
		return Matter.Bodies.fromVertices(Matter.Vertices.centre(set).x, Matter.Vertices.centre(set).y, set, opts); 
	}

	else if(shape === "regPolygon") {
		set = Vertices.regPolygon(staticObject);
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