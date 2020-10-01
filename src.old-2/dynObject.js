/**
 * 
 * Create Dynamic Object from static object
 * 
 * @param {StaticObject} staticObject - Static Object
 * @param {string} staticObject.name - Object Name;
 * @param {boolean} staticObject.locked - Lock
 * @param {Number} staticObject.density - Density
 * @param {Number} staticObject.mass  - Object mass, overrides density if set
 * @param {boolean} staticObject.path - Tells if object is irregular polygon
 * @param {Array} staticObject.verts - Array for vertices, used if object.path === true.
 * @param {boolean} staticObject.circle - Tells if object is a circle.
 * @param {Number} staticObject.x - Center of regular polygon, center of circle or upper left corner of rectangle.
 * @param {Number} staticObject.radius - Radius of circle or circle that circumscribes regular polygon.
 * @param {boolean} staticObject.rectangle - Tells if object is a rectangle
 * @param {Number} staticObject.w - Rectangle Width
 * @param {Number} staticObject.h - Rectangle Height
 * 
 */

PhSim.DynObject = function(staticObject) {

	var opts = {}

	if(staticObject.name) {
		opts.label = staticObject.name;
	}

	if(staticObject.locked) {
		opts.isStatic = staticObject.locked;
	}

	if(typeof staticObject.density === "number") {
		opts.density = staticObject.density;

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

		//PhSim.Objects.Path.call(this);

	}

	if(staticObject.circle === true) {
		this.matter = Matter.Bodies.circle(staticObject.x, staticObject.y, staticObject.radius,opts);
		this.firstCycle = staticObject.cycle;
		//PhSim.Objects.Circle.call(this);
	}

	if(staticObject.rectangle === true) {
		var set = PhSim.Tools.getRectangleVertArray(staticObject);
		this.firstCycle = staticObject.cycle;
		this.matter = Matter.Bodies.fromVertices(Matter.Vertices.centre(set).x, Matter.Vertices.centre(set).y, set, opts); 
		//PhSim.Objects.Rectangle.call(this);
	}

	if(staticObject.regPolygon === true) {
		var set = PhSim.Tools.getRegPolygonVerts(staticObject);
		this.firstCycle = staticObject.cycle;
		this.matter = Matter.Bodies.fromVertices(Matter.Vertices.centre(set).x, Matter.Vertices.centre(set).y, set, opts); 
		//PhSim.Objects.RegPolygon.call(this);
	}

	/** Deep cloned copy of the static object used to create the DynObject*/

	this.object = JSON.parse(JSON.stringify(staticObject));

	/** Reference to static object used to create the DynObject*/

	this.static = staticObject;

	/** Object ID */

	this.id = PhSim.DynSim.nextId;

	PhSim.DynSim.nextId = (Number.parseInt(PhSim.DynSim.nextId,36) + 1).toString(36);
	
	/** Refernce of DynObj in matter object */

	this.matter.plugin.ph = this;

}