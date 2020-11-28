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

	if(staticObject.path === true) {
		this.skinmesh = JSON.parse(JSON.stringify(staticObject.verts));
	}

	this.firstCycle = staticObject.cycle;

	if(staticObject.composite === true) {
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

	this.id = PhSim.nextId;

	PhSim.nextId = (Number.parseInt(PhSim.nextId,36) + 1).toString(36);
	
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
 * 
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

			if(composite.parts[i].composite) {
				DynObject.flattenComposite(composite.parts[i].composite);
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


	if(staticObject.path === true) {
		return PhSim.Matter.Bodies.fromVertices(PhSim.Matter.Vertices.centre(staticObject.verts).x, PhSim.Matter.Vertices.centre(staticObject.verts).y, staticObject.verts, opts);
	}

	
	else if(staticObject.circle === true) {
		return PhSim.Matter.Bodies.circle(staticObject.x, staticObject.y, staticObject.radius,opts);
	}


	else if(staticObject.rectangle === true) {
		var set = PhSim.getRectangleVertArray(staticObject);
		return PhSim.Matter.Bodies.fromVertices(PhSim.Matter.Vertices.centre(set).x, PhSim.Matter.Vertices.centre(set).y, set, opts); 
	}

	else if(staticObject.regPolygon === true) {
		var set = PhSim.getRegPolygonVerts(staticObject);
		return PhSim.Matter.Bodies.fromVertices(PhSim.Matter.Vertices.centre(set).x, PhSim.Matter.Vertices.centre(set).y, set, opts); 
	}


}

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