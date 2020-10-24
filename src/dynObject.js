/**
 * 
 * Create Dynamic Object from static object
 * @constructor
 * @param {PhSimObject} staticObject - Static Object
 * @augments StaticObject
 * 
 */

PhSim.DynObject = function(staticObject) {

	Object.assign(this,staticObject);

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

	if(Number.isInteger(staticObject.collisionNum)) {
		opts.collisionFilter = staticObject.collisionNum;
	}

	if(staticObject.path === true) {

		this.matter = Matter.Bodies.fromVertices(Matter.Vertices.centre(staticObject.verts).x, Matter.Vertices.centre(staticObject.verts).y, staticObject.verts, opts);

		/** Irregular polygon skinmesh */

		this.skinmesh = JSON.parse(JSON.stringify(staticObject.verts));

		//PhSim.Static.Path.call(this);

	}

	if(staticObject.circle === true) {
		this.matter = Matter.Bodies.circle(staticObject.x, staticObject.y, staticObject.radius,opts);
		this.firstCycle = staticObject.cycle;
		//PhSim.Static.Circle.call(this);
	}

	if(staticObject.rectangle === true) {
		var set = PhSim.Tools.getRectangleVertArray(staticObject);
		this.firstCycle = staticObject.cycle;
		this.matter = Matter.Bodies.fromVertices(Matter.Vertices.centre(set).x, Matter.Vertices.centre(set).y, set, opts); 
		//PhSim.Static.Rectangle.call(this);
	}

	if(staticObject.regPolygon === true) {
		var set = PhSim.Tools.getRegPolygonVerts(staticObject);
		this.firstCycle = staticObject.cycle;
		this.matter = Matter.Bodies.fromVertices(Matter.Vertices.centre(set).x, Matter.Vertices.centre(set).y, set, opts); 
		//PhSim.Static.RegPolygon.call(this);
	}

	if(typeof matterParts === "undefined") {
		var matterParts = [];
	}

	if(staticObject.composite === true) {

		// Flattened tree of Matter.js objects

		// New parts array for object

		var dynParts = [];

		for(var i = 0; i < o.parts.length; i++)  {
			var dynObject = new PhSim.DynObject(o.parts[i]);

			for(var j = 1; j < dynObject.parts.length; j++) {
				matterParts.push(dynObject.parts[j]);
			}

			dynParts.push(dynObject);
		}
		
		this.parts = dynParts;

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
	 * Refernce of DynObj in matter object 
	 * @type {Object}
	 * */

	this.matter.plugin.ph = this;

}

/**
 * A PhSimObject is either a static object or a dynamic object.
 * 
 * @typedef {PhSim.DynObject|StaticObject} PhSimObject
 * 
 *
 */